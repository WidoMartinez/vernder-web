import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { MercadoPagoConfig, Preference } from "mercadopago";
import axios from "axios";
import crypto from "crypto";

// Carga las variables de entorno desde el archivo .env o desde la configuración de Render
dotenv.config();

const app = express();

// --- Mejora de Seguridad CORS ---
// Solo permite peticiones desde tu dominio de producción y desarrollo local
const allowedOrigins = [
	"https://nubestilo.cl",
	"http://www.nubestilo.cl",
	"http://localhost:5173",
];
const corsOptions = {
	origin: function (origin, callback) {
		// Permite peticiones sin 'origin' (como las de Postman o apps móviles) o si el origen está en la lista blanca
		if (!origin || allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("No permitido por la política de CORS"));
		}
	},
};
app.use(cors(corsOptions));
// --- Fin de la Mejora ---

app.use(express.json());

// --- CONFIGURACIÓN DE MERCADO PAGO ---
const client = new MercadoPagoConfig({
	accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

// --- FUNCIÓN PARA FIRMAR PARÁMETROS DE FLOW ---
const signParams = (params) => {
	const secretKey = process.env.FLOW_SECRET_KEY;
	// Ordenar los parámetros alfabéticamente por clave
	const sortedKeys = Object.keys(params).sort();
	let toSign = "";
	sortedKeys.forEach((key) => {
		toSign += key + params[key];
	});
	return crypto.createHmac("sha256", secretKey).update(toSign).digest("hex");
};

// --- ENDPOINT PARA CREAR PAGOS ---
app.post("/create-payment", async (req, res) => {
	const { gateway, amount, description, email } = req.body;

	if (gateway === "mercadopago") {
		const preferenceData = {
			items: [
				{
					title: description,
					unit_price: Number(amount),
					quantity: 1,
					currency_id: "CLP",
				},
			],
			payer: {
				email: email,
			},
			back_urls: {
				success: `${process.env.YOUR_FRONTEND_URL}/pago-exitoso`,
				failure: `${process.env.YOUR_FRONTEND_URL}/pago-fallido`,
				pending: `${process.env.YOUR_FRONTEND_URL}/pago-pendiente`,
			},
			auto_return: "approved",
		};

		try {
			const preference = new Preference(client);
			const result = await preference.create({ body: preferenceData });
			res.json({ url: result.init_point });
		} catch (error) {
			console.error("Error al crear preferencia de Mercado Pago:", error);
			res
				.status(500)
				.json({ message: "Error al generar el pago con Mercado Pago." });
		}
	} else if (gateway === "flow") {
		const flowApiUrl =
			process.env.FLOW_API_URL || "https://sandbox.flow.cl/api";

		const params = {
			apiKey: process.env.FLOW_API_KEY,
			commerceOrder: `ORDEN-${Date.now()}`,
			subject: description,
			currency: "CLP",
			amount: amount,
			email: email,
			urlConfirmation: `${process.env.YOUR_BACKEND_URL}/flow-confirmation`,
			urlReturn: `${process.env.YOUR_FRONTEND_URL}/flow-return`,
		};

		// Firmar los parámetros
		params.s = signParams(params);

		try {
			const response = await axios.post(
				`${flowApiUrl}/payment/create`,
				new URLSearchParams(params).toString(),
				{
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
				}
			);
			const payment = response.data;
			const redirectUrl = `${payment.url}?token=${payment.token}`;
			res.json({ url: redirectUrl });
		} catch (error) {
			console.error(
				"Error al crear el pago con Flow:",
				error.response ? error.response.data : error.message
			);
			res.status(500).json({ message: "Error al generar el pago con Flow." });
		}
	} else {
		res.status(400).json({ message: "Pasarela de pago no válida." });
	}
});

// --- ENDPOINT PARA ENVIAR CORREOS DEL FORMULARIO DE CONTACTO ---
app.post("/send-email", async (req, res) => {
	const { name, email, phone, service, message } = req.body;

	if (!name || !email || !service || !message) {
		return res
			.status(400)
			.json({ message: "Faltan campos requeridos en el formulario." });
	}

	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: parseInt(process.env.EMAIL_PORT, 10),
		secure: process.env.EMAIL_PORT == 465, // true para puerto 465, false para otros
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const emailSubject = `Nuevo Contacto Web: Interés en ${service}`;
	const emailHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
            <h2 style="color: #d97706;">Nueva consulta desde Nubestilo.cl</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Teléfono:</strong> ${phone || "No proporcionado"}</p>
            <p><strong>Servicio de interés:</strong> ${service}</p>
            <hr style="border: 0; border-top: 1px solid #eee;">
            <h3>Mensaje:</h3>
            <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
    `;

	const mailOptions = {
		from: `"Notificación Nubestilo" <${process.env.EMAIL_USER}>`,
		to: process.env.EMAIL_TO,
		subject: emailSubject,
		html: emailHtml,
	};

	try {
		await transporter.sendMail(mailOptions);
		res.status(200).json({ message: "Mensaje enviado exitosamente." });
	} catch (error) {
		console.error("Error al enviar el correo:", error);
		res.status(500).json({ message: "Error interno al enviar el correo." });
	}
});

// Render.com asignará el puerto dinámicamente a través de la variable de entorno PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`✅ El servidor backend está corriendo en el puerto ${PORT}`);
});
