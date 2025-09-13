import { motion } from "framer-motion";
import {
	Palette,
	Code,
	Target,
	TrendingUp,
	CheckCircle,
	ArrowRight,
	Zap,
	Users,
	Globe,
	Smartphone,
} from "lucide-react";

const Services = () => {
	const services = [
		{
			id: "diseno-web",
			title: "Diseño Web Personalizado",
			description:
				"Creamos diseños únicos que reflejan la identidad de tu marca y conectan emocionalmente con tu audiencia objetivo.",
			features: [
				"Diseño responsive para todos los dispositivos",
				"UX/UI optimizado para conversión",
				"Branding coherente y profesional",
				"Wireframes y prototipos interactivos",
				"Diseño centrado en el usuario",
			],
			icon: <Palette className="w-16 h-16" />,
			price: "Desde $1,500",
			duration: "2-4 semanas",
		},
		{
			id: "desarrollo-frontend",
			title: "Desarrollo Frontend Avanzado",
			description:
				"Desarrollamos sitios web modernos con las últimas tecnologías para garantizar rendimiento excepcional y funcionalidad perfecta.",
			features: [
				"React, Next.js y tecnologías modernas",
				"WordPress personalizado y optimizado",
				"Optimización SEO técnico",
				"Integración con APIs y servicios",
				"Código limpio y mantenible",
			],
			icon: <Code className="w-16 h-16" />,
			price: "Desde $2,500",
			duration: "3-6 semanas",
		},
		{
			id: "optimizacion-leads",
			title: "Optimización para Leads",
			description:
				"Diseñamos cada elemento pensando en la conversión, maximizando el potencial de generación de leads de tu sitio web.",
			features: [
				"Landing pages de alta conversión",
				"Formularios optimizados y A/B testing",
				"Llamadas a la acción estratégicas",
				"Análisis de comportamiento de usuarios",
				"Optimización de embudo de ventas",
			],
			icon: <Target className="w-16 h-16" />,
			price: "Desde $1,200",
			duration: "1-3 semanas",
		},
		{
			id: "analisis-mejora",
			title: "Análisis y Mejora Continua",
			description:
				"Monitoreamos el rendimiento de tu sitio web y implementamos mejoras continuas basadas en datos reales.",
			features: [
				"Google Analytics y configuración avanzada",
				"Reportes mensuales detallados",
				"Optimización continua de conversión",
				"Monitoreo de velocidad y rendimiento",
				"Recomendaciones estratégicas",
			],
			icon: <TrendingUp className="w-16 h-16" />,
			price: "Desde $800/mes",
			duration: "Servicio continuo",
		},
	];

	const additionalServices = [
		{
			icon: <Globe className="w-8 h-8" />,
			title: "E-commerce",
			description: "Tiendas online completas con sistemas de pago integrados",
		},
		{
			icon: <Smartphone className="w-8 h-8" />,
			title: "Apps Móviles",
			description: "Aplicaciones web progresivas (PWA) para móviles",
		},
		{
			icon: <Zap className="w-8 h-8" />,
			title: "Mantenimiento",
			description: "Soporte técnico y actualizaciones regulares",
		},
		{
			icon: <Users className="w-8 h-8" />,
			title: "Consultoría",
			description: "Estrategia digital y consultoría especializada",
		},
	];

	const process = [
		{
			step: "01",
			title: "Consulta Inicial",
			description:
				"Analizamos tus necesidades, objetivos y audiencia objetivo para crear una estrategia personalizada.",
		},
		{
			step: "02",
			title: "Diseño y Prototipo",
			description:
				"Creamos wireframes y prototipos interactivos para validar la experiencia de usuario antes del desarrollo.",
		},
		{
			step: "03",
			title: "Desarrollo",
			description:
				"Desarrollamos tu sitio web utilizando las mejores tecnologías y prácticas de la industria.",
		},
		{
			step: "04",
			title: "Optimización",
			description:
				"Optimizamos para velocidad, SEO y conversión, asegurándonos de que todo funcione perfectamente.",
		},
		{
			step: "05",
			title: "Lanzamiento",
			description:
				"Lanzamos tu sitio web y te proporcionamos toda la documentación y capacitación necesaria.",
		},
		{
			step: "06",
			title: "Soporte",
			description:
				"Ofrecemos soporte continuo y mejoras basadas en el análisis de datos y feedback de usuarios.",
		},
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
						Nuestros Servicios
					</motion.h1>
					<motion.p
						className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						Soluciones completas de diseño web enfocadas en generar resultados
						medibles para tu negocio
					</motion.p>
				</div>
			</section>

			{/* Main Services */}
			<section className="px-4 pb-20">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{services.map((service, index) => (
							<motion.div
								key={service.id}
								className="bg-card rounded-3xl p-8 hover:bg-secondary transition-all duration-300 group"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
							>
								<div className="flex items-start gap-6">
									<div className="text-primary group-hover:text-accent transition-colors duration-300 flex-shrink-0">
										{service.icon}
									</div>
									<div className="flex-1">
										<h3 className="text-2xl font-bold mb-3">{service.title}</h3>
										<p className="text-text-secondary mb-6 leading-relaxed">
											{service.description}
										</p>

										<ul className="space-y-3 mb-6">
											{service.features.map((feature, idx) => (
												<li
													key={idx}
													className="flex items-start text-text-secondary"
												>
													<CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
													<span className="text-sm">{feature}</span>
												</li>
											))}
										</ul>

										<div className="flex items-center justify-between pt-4 border-t border-text-muted">
											<div>
												<div className="text-2xl font-bold text-primary">
													{service.price}
												</div>
												<div className="text-sm text-text-muted">
													{service.duration}
												</div>
											</div>
											<motion.button
												className="bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-primary text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2"
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
											>
												Solicitar
												<ArrowRight className="w-4 h-4" />
											</motion.button>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Additional Services */}
			<section className="px-4 pb-20">
				<div className="max-w-7xl mx-auto">
					<motion.h2
						className="text-3xl md:text-4xl font-bold text-center mb-12"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						Servicios Adicionales
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{additionalServices.map((service, index) => (
							<motion.div
								key={service.title}
								className="bg-card rounded-2xl p-6 text-center hover:bg-secondary transition-all duration-300 group"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<div className="text-primary group-hover:text-accent transition-colors duration-300 mb-4 flex justify-center">
									{service.icon}
								</div>
								<h3 className="text-lg font-bold mb-2">{service.title}</h3>
								<p className="text-text-secondary text-sm">
									{service.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Process Section */}
			<section className="px-4 pb-20 bg-card/50">
				<div className="max-w-7xl mx-auto">
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">
							Nuestro Proceso
						</h2>
						<p className="text-xl text-text-secondary max-w-3xl mx-auto">
							Un proceso probado que garantiza resultados excepcionales en cada
							proyecto
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{process.map((step, index) => (
							<motion.div
								key={step.step}
								className="relative"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
							>
								<div className="bg-card rounded-2xl p-6 h-full">
									<div className="text-4xl font-bold text-primary mb-4">
										{step.step}
									</div>
									<h3 className="text-xl font-bold mb-3">{step.title}</h3>
									<p className="text-text-secondary leading-relaxed">
										{step.description}
									</p>
								</div>
								{index < process.length - 1 && (
									<div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
										<ArrowRight className="w-6 h-6 text-text-muted" />
									</div>
								)}
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="px-4 pb-20">
				<div className="max-w-4xl mx-auto text-center">
					<motion.div
						className="bg-gradient-to-r from-primary to-accent rounded-3xl p-12"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">
							¿Listo para comenzar tu proyecto?
						</h2>
						<p className="text-xl mb-8 opacity-90 text-amber-100">
							Obtén una consulta gratuita y descubre cómo podemos ayudarte a
							alcanzar tus objetivos
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<motion.button
								className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Consulta Gratuita
							</motion.button>
							<motion.button
								className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-primary transition-all duration-300"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Ver Portafolio
							</motion.button>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default Services;
