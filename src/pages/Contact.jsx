import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		company: "",
		service: "",
		budget: "",
		message: "",
		timeline: "",
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
		setTimeout(() => setIsSubmitted(false), 3000);
	};

	const contactInfo = [
		{
			icon: <Mail className="w-6 h-6" />,
			title: "Email",
			info: "hola@tuempresa.com",
			description: "Respuesta en menos de 24 horas",
		},
		{
			icon: <Phone className="w-6 h-6" />,
			title: "Teléfono",
			info: "+1 (555) 123-4567",
			description: "Lun - Vie, 9:00 AM - 6:00 PM",
		},
		{
			icon: <MapPin className="w-6 h-6" />,
			title: "Ubicación",
			info: "Ciudad, País",
			description: "Trabajamos con clientes globalmente",
		},
		{
			icon: <Clock className="w-6 h-6" />,
			title: "Horario",
			info: "9:00 AM - 6:00 PM",
			description: "Zona horaria local",
		},
	];

	const services = [
		"Diseño Web Personalizado",
		"Desarrollo Frontend",
		"Optimización para Leads",
		"E-commerce",
		"Rediseño Web",
		"Mantenimiento Web",
		"Consultoría Digital",
		"Otro",
	];

	const budgetRanges = [
		"Menos de $1,000",
		"$1,000 - $5,000",
		"$5,000 - $10,000",
		"$10,000 - $25,000",
		"Más de $25,000",
		"Prefiero discutirlo",
	];

	const timelines = [
		"Lo antes posible",
		"1-2 semanas",
		"1 mes",
		"2-3 meses",
		"Más de 3 meses",
		"Flexible",
	];

	return (
		<div className="min-h-screen bg-background text-text">
			{/* Hero Section */}
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
						Estamos aquí para ayudarte a transformar tu visión en una
						experiencia digital exitosa
					</motion.p>
				</div>
			</section>

			<div className="max-w-7xl mx-auto px-4 pb-20">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* Contact Form */}
					<div className="lg:col-span-2">
						<motion.div
							className="bg-card rounded-3xl p-8"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
						>
							<h2 className="text-3xl font-bold mb-8">
								Cuéntanos sobre tu proyecto
							</h2>

							{isSubmitted ? (
								<motion.div
									className="text-center py-12"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5 }}
								>
									<CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
									<h3 className="text-2xl font-bold mb-2">¡Mensaje enviado!</h3>
									<p className="text-text-secondary">
										Te contactaremos en las próximas 24 horas.
									</p>
								</motion.div>
							) : (
								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label
												htmlFor="name"
												className="block text-sm font-medium text-text-secondary mb-2"
											>
												Nombre completo *
											</label>
											<input
												type="text"
												id="name"
												name="name"
												required
												value={formData.name}
												onChange={handleChange}
												className="w-full px-4 py-3 bg-secondary border border-text-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-text placeholder-text-muted"
												placeholder="Tu nombre"
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
												placeholder="tu@email.com"
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label
												htmlFor="phone"
												className="block text-sm font-medium text-text-secondary mb-2"
											>
												Teléfono
											</label>
											<input
												type="tel"
												id="phone"
												name="phone"
												value={formData.phone}
												onChange={handleChange}
												className="w-full px-4 py-3 bg-secondary border border-text-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-text placeholder-text-muted"
												placeholder="+1 (555) 123-4567"
											/>
										</div>
										<div>
											<label
												htmlFor="company"
												className="block text-sm font-medium text-text-secondary mb-2"
											>
												Empresa
											</label>
											<input
												type="text"
												id="company"
												name="company"
												value={formData.company}
												onChange={handleChange}
												className="w-full px-4 py-3 bg-secondary border border-text-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-text placeholder-text-muted"
												placeholder="Tu empresa"
											/>
										</div>
									</div>

									<div>
										<label
											htmlFor="service"
											className="block text-sm font-medium text-text-secondary mb-2"
										>
											Servicio de interés *
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

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label
												htmlFor="budget"
												className="block text-sm font-medium text-text-secondary mb-2"
											>
												Presupuesto estimado
											</label>
											<select
												id="budget"
												name="budget"
												value={formData.budget}
												onChange={handleChange}
												className="w-full px-4 py-3 bg-secondary border border-text-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-text"
											>
												<option value="">Selecciona un rango</option>
												{budgetRanges.map((range) => (
													<option key={range} value={range}>
														{range}
													</option>
												))}
											</select>
										</div>
										<div>
											<label
												htmlFor="timeline"
												className="block text-sm font-medium text-text-secondary mb-2"
											>
												Tiempo estimado
											</label>
											<select
												id="timeline"
												name="timeline"
												value={formData.timeline}
												onChange={handleChange}
												className="w-full px-4 py-3 bg-secondary border border-text-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-text"
											>
												<option value="">Selecciona un tiempo</option>
												{timelines.map((timeline) => (
													<option key={timeline} value={timeline}>
														{timeline}
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
											Cuéntanos más sobre tu proyecto *
										</label>
										<textarea
											id="message"
											name="message"
											required
											rows="5"
											value={formData.message}
											onChange={handleChange}
											className="w-full px-4 py-3 bg-secondary border border-text-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-text placeholder-text-muted"
											placeholder="Describe tu proyecto, objetivos, audiencia objetivo, funcionalidades específicas que necesitas, etc."
										></textarea>
									</div>

									<motion.button
										type="submit"
										className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-primary text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<Send className="w-5 h-5" />
										Enviar mensaje
									</motion.button>
								</form>
							)}
						</motion.div>
					</div>

					{/* Contact Info */}
					<div className="lg:col-span-1">
						<motion.div
							className="space-y-8"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
						>
							<div className="bg-card rounded-3xl p-8">
								<h3 className="text-2xl font-bold mb-6">
									Información de contacto
								</h3>
								<div className="space-y-6">
									{contactInfo.map((item, index) => (
										<motion.div
											key={item.title}
											className="flex items-start gap-4"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.5, delay: index * 0.1 }}
										>
											<div className="text-primary mt-1">{item.icon}</div>
											<div>
												<h4 className="font-semibold mb-1">{item.title}</h4>
												<p className="text-text font-medium">{item.info}</p>
												<p className="text-text-muted text-sm">
													{item.description}
												</p>
											</div>
										</motion.div>
									))}
								</div>
							</div>

							<div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-8 text-center">
								<h3 className="text-2xl font-bold mb-4">
									¿Necesitas ayuda urgente?
								</h3>
								<p className="mb-6 opacity-90 text-amber-100">
									Programa una llamada de 15 minutos para discutir tu proyecto
									inmediatamente
								</p>
								<motion.button
									className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Programar llamada
								</motion.button>
							</div>

							<div className="bg-card rounded-3xl p-8">
								<h3 className="text-xl font-bold mb-4">Respuesta rápida</h3>
								<div className="space-y-3 text-sm">
									<div className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-success" />
										<span>Respuesta en menos de 24 horas</span>
									</div>
									<div className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-success" />
										<span>Consulta inicial gratuita</span>
									</div>
									<div className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-success" />
										<span>Propuesta personalizada</span>
									</div>
									<div className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-success" />
										<span>Sin compromiso</span>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
