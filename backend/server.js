import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MercadoPagoConfig, Preference } from "mercadopago";
import axios from "axios";
import crypto from "crypto";

dotenv.config();

const app = express();

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

const client = new MercadoPagoConfig({
	accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

const signParams = (params) => {
	const secretKey = process.env.FLOW_SECRET_KEY;
	const sortedKeys = Object.keys(params).sort();
	let toSign = "";
	sortedKeys.forEach((key) => {
		toSign += key + params[key];
	});
	return crypto.createHmac("sha256", secretKey).update(toSign).digest("hex");
};

app.post("/create-payment", async (req, res) => {
	const { gateway, amount, description, email } = req.body;

	if (gateway === "mercadopago") {
		// Lógica de Mercado Pago... (sin cambios)
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
			// Esta URL ahora funcionará correctamente con la variable de entorno
			urlConfirmation: `${process.env.YOUR_BACKEND_URL}/flow-confirmation`,
			urlReturn: `${process.env.YOUR_FRONTEND_URL}/flow-return`,
		};
		params.s = signParams(params);
		try {
			const response = await axios.post(
				`${flowApiUrl}/payment/create`,
				new URLSearchParams(params).toString(),
				{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
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

// --- ¡NUEVO ENDPOINT! ---
// Flow enviará un POST a esta URL después de que el pago se complete.
// Por ahora, solo registraremos que llegó la confirmación en los logs de Render.
app.post("/flow-confirmation", (req, res) => {
	console.log("✅ Confirmación de Flow recibida:");
	console.log(req.body);
	// En el futuro, aquí puedes añadir lógica para actualizar tu base de datos,
	// enviar un email de confirmación final, etc.
	res.status(200).send("Confirmación recibida por el servidor.");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`✅ Servidor de pagos corriendo en el puerto ${PORT}`);
});
