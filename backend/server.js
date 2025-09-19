import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import axios from "axios";
import crypto from "crypto";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();

// Configuración CORS
const allowedOrigins = [
	"https://nubestilo.cl",
	"http://www.nubestilo.cl",
	"http://localhost:5173",
];

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("No permitido por la política de CORS"));
		}
	},
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración MercadoPago
const client = new MercadoPagoConfig({
	accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

// Sistema básico de persistencia en memoria y archivo
class PaymentStore {
	constructor() {
		this.payments = new Map();
		this.filePath = path.join(process.cwd(), "payments.json");
		this.loadFromFile();
	}

	loadFromFile() {
		try {
			if (fs.existsSync(this.filePath)) {
				const data = fs.readFileSync(this.filePath, "utf8");
				const payments = JSON.parse(data);
				this.payments = new Map(Object.entries(payments));
				console.log(`✅ Cargados ${this.payments.size} pagos desde archivo`);
			}
		} catch (error) {
			console.error("❌ Error al cargar pagos desde archivo:", error);
		}
	}

	saveToFile() {
		try {
			const paymentsObj = Object.fromEntries(this.payments);
			fs.writeFileSync(this.filePath, JSON.stringify(paymentsObj, null, 2));
		} catch (error) {
			console.error("❌ Error al guardar pagos en archivo:", error);
		}
	}

	createPayment(id, data) {
		const payment = {
			id,
			...data,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		this.payments.set(id, payment);
		this.saveToFile();
		return payment;
	}

	updatePayment(id, updates) {
		const payment = this.payments.get(id);
		if (payment) {
			const updatedPayment = {
				...payment,
				...updates,
				updatedAt: new Date().toISOString(),
			};
			this.payments.set(id, updatedPayment);
			this.saveToFile();
			return updatedPayment;
		}
		return null;
	}

	getPayment(id) {
		return this.payments.get(id);
	}

	getAllPayments() {
		return Array.from(this.payments.values());
	}
}

const paymentStore = new PaymentStore();

// Utilidades para firmas
const signParams = (params) => {
	const secretKey = process.env.FLOW_SECRET_KEY;
	const sortedKeys = Object.keys(params).sort();
	let toSign = "";
	sortedKeys.forEach((key) => {
		toSign += key + params[key];
	});
	return crypto.createHmac("sha256", secretKey).update(toSign).digest("hex");
};

const verifyMercadoPagoSignature = (req) => {
	try {
		const signature = req.headers["x-signature"];
		const requestId = req.headers["x-request-id"];

		if (!signature || !requestId) {
			return false;
		}

		// Extraer timestamp y hash de la firma
		const parts = signature.split(",");
		let ts, hash;

		parts.forEach((part) => {
			const [key, value] = part.split("=");
			if (key && value) {
				if (key.trim() === "ts") ts = value;
				if (key.trim() === "v1") hash = value;
			}
		});

		if (!ts || !hash) {
			return false;
		}

		// Crear el string a firmar
		const dataToSign = `id:${
			req.body.data?.id || ""
		};request-id:${requestId};ts:${ts};`;

		// Calcular el hash esperado
		const secret =
			process.env.MERCADOPAGO_WEBHOOK_SECRET ||
			process.env.MERCADOPAGO_ACCESS_TOKEN;
		const expectedHash = crypto
			.createHmac("sha256", secret)
			.update(dataToSign)
			.digest("hex");

		return hash === expectedHash;
	} catch (error) {
		console.error("❌ Error verificando firma MercadoPago:", error);
		return false;
	}
};

const verifyFlowSignature = (params) => {
	try {
		const receivedSignature = params.s;
		delete params.s; // Remover la firma para calcular

		const expectedSignature = signParams(params);
		return receivedSignature === expectedSignature;
	} catch (error) {
		console.error("❌ Error verificando firma Flow:", error);
		return false;
	}
};

// Generar ID único para transacciones
const generateTransactionId = () => {
	return `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// ENDPOINTS EXISTENTES MEJORADOS

app.post("/create-payment", async (req, res) => {
	const { gateway, amount, description, email } = req.body;
	const frontendUrl = process.env.YOUR_FRONTEND_URL;
	const backendUrl = process.env.YOUR_BACKEND_URL;

	// Generar ID único para la transacción
	const transactionId = generateTransactionId();

	try {
		if (gateway === "mercadopago") {
			const preference = new Preference(client);

			// Crear el pago en nuestro store
			const payment = paymentStore.createPayment(transactionId, {
				gateway: "mercadopago",
				amount: Number(amount),
				description,
				email,
				status: "pending",
				externalId: null,
			});

			const result = await preference.create({
				body: {
					items: [
						{
							title: description,
							quantity: 1,
							unit_price: Number(amount),
							currency_id: "CLP",
						},
					],
					payer: { email },
					external_reference: transactionId, // Usar nuestro ID
					notification_url: `${backendUrl}/webhook/mercadopago`,
					back_urls: {
						success: `${frontendUrl}/post-pago?txn=${transactionId}`,
						failure: `${frontendUrl}/pago-fallido?txn=${transactionId}`,
						pending: `${frontendUrl}/pago-pendiente?txn=${transactionId}`,
					},
					auto_return: "approved",
				},
			});

			// Actualizar con el ID de MercadoPago
			paymentStore.updatePayment(transactionId, {
				externalId: result.id,
				preferenceId: result.id,
			});

			res.json({
				url: result.init_point,
				transactionId: transactionId,
			});
		} else if (gateway === "flow") {
			const flowApiUrl =
				process.env.FLOW_API_URL || "https://sandbox.flow.cl/api";

			// Crear el pago en nuestro store
			const payment = paymentStore.createPayment(transactionId, {
				gateway: "flow",
				amount: Number(amount),
				description,
				email,
				status: "pending",
				externalId: null,
			});

			const params = {
				apiKey: process.env.FLOW_API_KEY,
				commerceOrder: transactionId, // Usar nuestro ID
				subject: description,
				currency: "CLP",
				amount: amount,
				email: email,
				urlConfirmation: `${backendUrl}/webhook/flow`,
				urlReturn: `${frontendUrl}/post-pago?txn=${transactionId}`,
			};
			params.s = signParams(params);

			const response = await axios.post(
				`${flowApiUrl}/payment/create`,
				new URLSearchParams(params).toString(),
				{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
			);

			const paymentData = response.data;

			// Actualizar con el token de Flow
			paymentStore.updatePayment(transactionId, {
				externalId: paymentData.token,
				flowToken: paymentData.token,
			});

			const redirectUrl = `${paymentData.url}?token=${paymentData.token}`;
			res.json({
				url: redirectUrl,
				transactionId: transactionId,
			});
		} else {
			res.status(400).json({ message: "Pasarela de pago no válida." });
		}
	} catch (error) {
		console.error(
			`❌ Error al crear el pago con ${gateway}:`,
			error.response ? error.response.data : error.message
		);
		res
			.status(500)
			.json({ message: `Error al generar el pago con ${gateway}.` });
	}
});

// NUEVOS ENDPOINTS DE WEBHOOKS

app.post("/webhook/mercadopago", async (req, res) => {
	console.log("📨 Webhook MercadoPago recibido:", {
		headers: req.headers,
		body: req.body,
	});

	// Verificar firma
	if (!verifyMercadoPagoSignature(req)) {
		console.error("❌ Firma inválida en webhook MercadoPago");
		return res.status(401).send("Unauthorized");
	}

	try {
		const { type, data } = req.body;

		if (type === "payment") {
			const paymentId = data.id;

			// Consultar el pago a MercadoPago para obtener información completa
			const payment = new Payment(client);
			const paymentInfo = await payment.get({ id: paymentId });

			console.log("💰 Información del pago MercadoPago:", paymentInfo);

			// Buscar nuestro pago por external_reference
			const externalReference = paymentInfo.external_reference;
			const localPayment = paymentStore.getPayment(externalReference);

			if (localPayment) {
				// Actualizar estado del pago
				const status = paymentInfo.status;
				paymentStore.updatePayment(externalReference, {
					status: status,
					externalId: paymentId,
					paymentMethod: paymentInfo.payment_method_id,
					statusDetail: paymentInfo.status_detail,
					transactionAmount: paymentInfo.transaction_amount,
					webhookProcessedAt: new Date().toISOString(),
				});

				console.log(
					`✅ Pago ${externalReference} actualizado a estado: ${status}`
				);
			} else {
				console.warn(
					`⚠️ No se encontró pago local para external_reference: ${externalReference}`
				);
			}
		}

		res.status(200).send("OK");
	} catch (error) {
		console.error("❌ Error procesando webhook MercadoPago:", error);
		res.status(500).send("Error interno");
	}
});

app.post("/webhook/flow", async (req, res) => {
	console.log("📨 Webhook Flow recibido:", req.body);

	// Verificar firma
	if (!verifyFlowSignature({ ...req.body })) {
		console.error("❌ Firma inválida en webhook Flow");
		return res.status(401).send("Unauthorized");
	}

	try {
		const { commerceOrder, status, flowOrder } = req.body;

		// Buscar nuestro pago
		const localPayment = paymentStore.getPayment(commerceOrder);

		if (localPayment) {
			// Actualizar estado del pago
			paymentStore.updatePayment(commerceOrder, {
				status: status,
				flowOrder: flowOrder,
				webhookProcessedAt: new Date().toISOString(),
			});

			console.log(
				`✅ Pago Flow ${commerceOrder} actualizado a estado: ${status}`
			);
		} else {
			console.warn(
				`⚠️ No se encontró pago local para commerceOrder: ${commerceOrder}`
			);
		}

		res.status(200).send("OK");
	} catch (error) {
		console.error("❌ Error procesando webhook Flow:", error);
		res.status(500).send("Error interno");
	}
});

// ENDPOINT DE VERIFICACIÓN DE PAGOS

app.get("/verify-payment/:transactionId", async (req, res) => {
	const { transactionId } = req.params;

	try {
		const localPayment = paymentStore.getPayment(transactionId);

		if (!localPayment) {
			return res.status(404).json({
				error: "Pago no encontrado",
				transactionId,
			});
		}

		// Verificar estado actual con la pasarela
		let verifiedStatus = localPayment.status;
		let additionalInfo = {};

		if (localPayment.gateway === "mercadopago" && localPayment.externalId) {
			try {
				const payment = new Payment(client);
				const paymentInfo = await payment.get({ id: localPayment.externalId });
				verifiedStatus = paymentInfo.status;
				additionalInfo = {
					paymentMethod: paymentInfo.payment_method_id,
					statusDetail: paymentInfo.status_detail,
					transactionAmount: paymentInfo.transaction_amount,
				};
			} catch (error) {
				console.error("❌ Error verificando pago MercadoPago:", error);
			}
		} else if (localPayment.gateway === "flow" && localPayment.flowToken) {
			try {
				const flowApiUrl =
					process.env.FLOW_API_URL || "https://sandbox.flow.cl/api";
				const params = {
					apiKey: process.env.FLOW_API_KEY,
					token: localPayment.flowToken,
				};
				params.s = signParams(params);

				const response = await axios.post(
					`${flowApiUrl}/payment/getStatus`,
					new URLSearchParams(params).toString(),
					{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
				);

				verifiedStatus = response.data.status;
				additionalInfo = response.data;
			} catch (error) {
				console.error("❌ Error verificando pago Flow:", error);
			}
		}

		// Actualizar si el estado cambió
		if (verifiedStatus !== localPayment.status) {
			paymentStore.updatePayment(transactionId, {
				status: verifiedStatus,
				lastVerifiedAt: new Date().toISOString(),
			});
		}

		res.json({
			transactionId,
			status: verifiedStatus,
			gateway: localPayment.gateway,
			amount: localPayment.amount,
			description: localPayment.description,
			email: localPayment.email,
			createdAt: localPayment.createdAt,
			updatedAt: localPayment.updatedAt,
			...additionalInfo,
		});
	} catch (error) {
		console.error("❌ Error verificando pago:", error);
		res.status(500).json({
			error: "Error interno al verificar pago",
			transactionId,
		});
	}
});

// ENDPOINT PARA LISTAR PAGOS (útil para debugging)
app.get("/payments", (req, res) => {
	const payments = paymentStore.getAllPayments();
	res.json({
		total: payments.length,
		payments: payments.slice(0, 50), // Limitar a 50 para evitar respuestas muy grandes
	});
});

// ENDPOINT LEGACY (mantener compatibilidad)
app.post("/flow-confirmation", (req, res) => {
	console.log(
		"⚠️ Endpoint legacy /flow-confirmation usado. Redirigiendo a /webhook/flow"
	);
	// Redirigir internamente al nuevo endpoint
	req.url = "/webhook/flow";
	app.handle(req, res);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
	console.log(`✅ Servidor de pagos mejorado corriendo en el puerto ${PORT}`);
	console.log(`📊 Pagos cargados: ${paymentStore.getAllPayments().length}`);
});
