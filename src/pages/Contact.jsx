import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { useState } from "react";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		service: "",
		message: "",
	});

	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitted(true);
		setTimeout(() => {
			setIsSubmitted(false);
			setFormData({ name: "", email: "", phone: "", service: "", message: "" });
		}, 5000);
	};

	const services = [
		"Página Web One-Page ($30.000)",
		"Sitio Web WordPress ($50.000)",
		"Tienda Online E-commerce ($100.000)",
		"Sitio Web Webflow Pro ($120.000)",
		"Sitio Web Premium en Framer (Mensual)",
		"No estoy seguro, necesito asesoría",
	];

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
					{isSubmitted ? (
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
								Gracias por contactarnos. Te responderemos en las próximas 24
								horas hábiles.
							</p>
						</motion.div>
					) : (
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
								className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-primary text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Send className="w-5 h-5" />
								Enviar Mensaje
							</motion.button>
						</form>
					)}
				</motion.div>
			</div>
		</div>
	);
};

export default Contact;
