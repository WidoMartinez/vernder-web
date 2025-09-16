import { motion } from "framer-motion";
import { Send, CheckCircle, XCircle, Loader } from "lucide-react";
import { useState } from "react";
import ReactDOMServer from "react-dom/server";
import EmailTemplate from "./EmailTemplate";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		service: "",
		message: "",
	});

	const [submissionStatus, setSubmissionStatus] = useState("idle");

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmissionStatus("loading");

		try {
			const notificationResponse = await fetch("/api/send_email.php", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const notificationResult = await notificationResponse.json();

			if (!notificationResponse.ok || notificationResult.status !== "success") {
				throw new Error(
					notificationResult.message ||
						"Error en el servidor de notificaciones."
				);
			}

			// Se genera el HTML sin pasarle URLs de imágenes
			const emailHtml = ReactDOMServer.renderToString(
				<EmailTemplate data={formData} />
			);

			const clientEmailResponse = await fetch("/api/send_client_email.php", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					to: formData.email,
					subject: `Confirmación de tu cotización en Nubestilo`,
					html: emailHtml,
				}),
			});

			const clientEmailResult = await clientEmailResponse.json();

			if (!clientEmailResponse.ok || clientEmailResult.status !== "success") {
				console.warn(
					"No se pudo enviar el correo de confirmación al cliente:",
					clientEmailResult.message
				);
			}

			setSubmissionStatus("success");

			// --- SEGUIMIENTO DE CONVERSIÓN DE GOOGLE ADS ---
			// Este código se ejecuta solo después de un envío exitoso.
			if (typeof gtag === "function") {
				gtag("event", "conversion", {
					send_to: "AW-17566977229/Aw2wCMmX0psbEM2Zy7hB",
				});
			}
			// ---------------------------------------------------

			setFormData({ name: "", email: "", phone: "", service: "", message: "" });
		} catch (error) {
			console.error("Error al enviar el formulario:", error);
			setSubmissionStatus("error");
		}
	};

	const services = [
		"Página Web One-Page ($30.000)",
		"Sitio Web WordPress ($50.000)",
		"Tienda Online E-commerce ($100.000)",
		"Sitio Web Webflow Pro ($120.000)",
		"Sitio Web Premium en Framer (Mensual)",
		"No estoy seguro, necesito asesoría",
	];

	const renderFormContent = () => {
		if (submissionStatus === "success") {
			return (
				<motion.div
					className="text-center py-12"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
				>
					<CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
					<h3 className="text-2xl font-bold mb-2">
						¡Mensaje enviado con éxito!
					</h3>
					<p className="text-text-secondary">
						Gracias por contactarnos. Te responderemos en las próximas 24 horas
						hábiles y hemos enviado una confirmación a tu correo.
					</p>
				</motion.div>
			);
		}

		if (submissionStatus === "error") {
			return (
				<motion.div
					className="text-center py-12"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
				>
					<XCircle className="w-16 h-16 text-error mx-auto mb-4" />
					<h3 className="text-2xl font-bold mb-2">
						Hubo un error al enviar el mensaje.
					</h3>
					<p className="text-text-secondary">
						Por favor, inténtalo de nuevo más tarde o contáctanos directamente.
					</p>
					<button
						onClick={() => setSubmissionStatus("idle")}
						className="mt-4 bg-primary text-white font-semibold py-2 px-4 rounded-lg transition-colors hover:bg-primary-hover"
					>
						Intentar de nuevo
					</button>
				</motion.div>
			);
		}

		return (
			<form onSubmit={handleSubmit} className="space-y-6">
				<h2 className="text-3xl font-bold mb-8 text-center">
					Cuéntanos tu idea
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-text-secondary mb-2"
						>
							Nombre *
						</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							value={formData.name}
							onChange={handleChange}
							className="w-full px-4 py-3 bg-secondary border border-text-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-text placeholder-text-muted"
							placeholder="Tu nombre completo"
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-text-secondary mb-2"
						>
							Email *
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							value={formData.email}
							onChange={handleChange}
							className="w-full px-4 py-3 bg-secondary border border-text-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-text placeholder-text-muted"
							placeholder="tu.correo@ejemplo.com"
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label
							htmlFor="phone"
							className="block text-sm font-medium text-text-secondary mb-2"
						>
							Teléfono (Opcional)
						</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							className="w-full px-4 py-3 bg-secondary border border-text-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-text placeholder-text-muted"
							placeholder="+56 9 1234 5678"
						/>
					</div>
					<div>
						<label
							htmlFor="service"
							className="block text-sm font-medium text-text-secondary mb-2"
						>
							¿Qué servicio te interesa? *
						</label>
						<select
							id="service"
							name="service"
							required
							value={formData.service}
							onChange={handleChange}
							className="w-full px-4 py-3 bg-secondary border border-text-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-text"
						>
							<option value="">Selecciona un servicio</option>
							{services.map((service) => (
								<option key={service} value={service}>
									{service}
								</option>
							))}
						</select>
					</div>
				</div>
				<div>
					<label
						htmlFor="message"
						className="block text-sm font-medium text-text-secondary mb-2"
					>
						Mensaje *
					</label>
					<textarea
						id="message"
						name="message"
						required
						rows="5"
						value={formData.message}
						onChange={handleChange}
						className="w-full px-4 py-3 bg-secondary border border-text-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-text placeholder-text-muted"
						placeholder="Cuéntanos un poco sobre tu proyecto o negocio..."
					></textarea>
				</div>
				<motion.button
					type="submit"
					disabled={submissionStatus === "loading"}
					className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-primary text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					{submissionStatus === "loading" ? (
						<Loader className="w-5 h-5 animate-spin" />
					) : (
						<Send className="w-5 h-5" />
					)}
					{submissionStatus === "loading" ? "Enviando..." : "Enviar Mensaje"}
				</motion.button>
			</form>
		);
	};

	return (
		<div className="min-h-screen bg-background text-text">
			<section className="pt-32 pb-20 px-4">
				<div className="max-w-7xl mx-auto text-center">
					<motion.h1
						className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						Hablemos de tu Proyecto
					</motion.h1>
					<motion.p
						className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						Completa el formulario y te contactaremos a la brevedad para dar
						vida a tu idea.
					</motion.p>
				</div>
			</section>

			<div className="max-w-4xl mx-auto px-4 pb-20">
				<motion.div
					className="bg-card rounded-3xl p-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{renderFormContent()}
				</motion.div>
			</div>
		</div>
	);
};

export default Contact;
