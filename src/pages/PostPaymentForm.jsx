import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader, Send, XCircle, FileUp } from "lucide-react";

const PostPaymentForm = () => {
	const [status, setStatus] = useState("success"); // 'success', 'error', 'idle'
	const [formData, setFormData] = useState({
		companyName: "",
		socialMedia: "",
		colors: "",
		references: "",
		content: "",
	});
	const [formStatus, setFormStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'

	// Simula la verificación del estado del pago desde la URL (ej. Flow, MercadoPago)
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		// Aquí podrías añadir una lógica más robusta para verificar el token de pago
		if (urlParams.has("token")) {
			setStatus("success");
		}
		// Si no, podrías establecer un estado de error o pendiente
	}, []);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormStatus("loading");

		try {
			// Usamos el mismo endpoint de email, pero con un cuerpo diferente
			const response = await fetch("/api/send_project_details.php", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					subject: `Nuevos Detalles de Proyecto para: ${formData.companyName}`,
					data: formData,
				}),
			});

			if (!response.ok) {
				throw new Error("Error en el servidor al enviar los detalles.");
			}

			setFormStatus("success");
		} catch (error) {
			console.error("Error al enviar el formulario:", error);
			setFormStatus("error");
		}
	};

	const renderForm = () => {
		if (formStatus === "success") {
			return (
				<div className="text-center py-12">
					<CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
					<h3 className="text-2xl font-bold mb-2">¡Información recibida!</h3>
					<p className="text-text-secondary">
						Gracias por enviarnos los detalles. Nos pondremos a trabajar en tu
						proyecto y te contactaremos a la brevedad.
					</p>
				</div>
			);
		}

		if (formStatus === "error") {
			return (
				<div className="text-center py-12">
					<XCircle className="w-16 h-16 text-error mx-auto mb-4" />
					<h3 className="text-2xl font-bold mb-2">Hubo un error.</h3>
					<p className="text-text-secondary">
						No pudimos recibir tu información. Por favor, contáctanos
						directamente a nuestro email.
					</p>
				</div>
			);
		}

		return (
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<input
						name="companyName"
						onChange={handleChange}
						placeholder="Nombre de tu negocio o marca *"
						required
						className="form-input"
					/>
					<input
						name="socialMedia"
						onChange={handleChange}
						placeholder="Links a tus redes sociales (Instagram, etc.)"
						className="form-input"
					/>
				</div>
				<div>
					<textarea
						name="colors"
						onChange={handleChange}
						placeholder="¿Qué colores representan a tu marca? (Ej: azul marino, dorado, blanco)"
						className="form-input"
						rows="2"
					></textarea>
				</div>
				<div>
					<textarea
						name="references"
						onChange={handleChange}
						placeholder="¿Hay alguna página web que te guste? Déjanos los links aquí."
						className="form-input"
						rows="2"
					></textarea>
				</div>
				<div>
					<textarea
						name="content"
						onChange={handleChange}
						placeholder="Escribe aquí los textos principales para tu web (quiénes somos, servicios, etc.) *"
						required
						className="form-input"
						rows="6"
					></textarea>
				</div>
				<p className="text-xs text-text-muted">
					Si tienes un logo o imágenes, puedes enviárnoslas respondiendo al
					correo de confirmación que recibiste.
				</p>
				<motion.button
					type="submit"
					disabled={formStatus === "loading"}
					className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-primary text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					{formStatus === "loading" ? (
						<Loader className="animate-spin" />
					) : (
						<Send />
					)}
					{formStatus === "loading"
						? "Enviando Información..."
						: "Enviar y Finalizar"}
				</motion.button>
			</form>
		);
	};

	return (
		<div className="min-h-screen bg-background text-text py-20 px-4">
			<style>{`.form-input { width: 100%; padding: 12px; background-color: #402f2f; border: 1px solid #574040; border-radius: 8px; color: #f3f4f6; }`}</style>
			<div className="max-w-4xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{status === "success" && (
						<div className="text-center mb-12">
							<CheckCircle className="w-20 h-20 text-success mx-auto mb-4" />
							<h1 className="text-4xl md:text-5xl font-bold mb-4">
								¡Tu pago ha sido exitoso!
							</h1>
							<p className="text-xl text-text-secondary">
								Ahora, el último paso. Completa el siguiente formulario para que
								podamos comenzar a construir tu sitio web.
							</p>
						</div>
					)}
					{status === "error" && (
						<div className="text-center mb-12">
							<XCircle className="w-20 h-20 text-error mx-auto mb-4" />
							<h1 className="text-4xl md:text-5xl font-bold mb-4">
								Hubo un problema con el pago
							</h1>
							<p className="text-xl text-text-secondary">
								Por favor, verifica con tu banco o contáctanos para ayudarte.
							</p>
						</div>
					)}
				</motion.div>

				{status === "success" && (
					<motion.div
						className="bg-card rounded-2xl p-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
					>
						{renderForm()}
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default PostPaymentForm;
