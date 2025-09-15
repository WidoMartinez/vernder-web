import { motion } from "framer-motion";
import {
	Palette,
	Code,
	ShoppingCart,
	Star,
	Layers, // Ícono para Webflow
	CheckCircle,
	ArrowRight,
} from "lucide-react";

const Services = () => {
	const services = [
		{
			id: "one-page",
			title: "Página Web One-Page",
			description:
				"La solución ideal para presentar tu negocio, captar clientes y tener presencia online de forma rápida y económica.",
			features: [
				"Diseño moderno y profesional",
				"Optimizado para celulares",
				"Formulario de contacto funcional",
				"Entrega en tiempo récord",
				"Enfocada en la obtención de prospectos (leads)",
			],
			icon: <Palette className="w-16 h-16" />,
			price: "$30.000 CLP",
			duration: "Entrega en 3-5 días hábiles",
		},
		{
			id: "wordpress",
			title: "Sitio Web WordPress Administrable",
			description:
				"Ten el control total de tu contenido con un sitio web robusto, escalable y fácil de actualizar por ti mismo.",
			features: [
				"Panel de control intuitivo (WordPress)",
				"Capacidad para agregar blog o noticias",
				"Diseño 100% personalizado a tu marca",
				"Optimización SEO básica",
				"Capacitación para que gestiones tu sitio",
			],
			icon: <Code className="w-16 h-16" />,
			price: "$50.000 CLP",
			duration: "Entrega en 7-10 días hábiles",
		},
		{
			id: "ecommerce",
			title: "Tienda Online E-commerce",
			description:
				"Empieza a vender tus productos en línea 24/7 con una tienda virtual profesional y segura.",
			features: [
				"Plataformas como Shopify, Jumpseller o Tienda Nube",
				"Integración con pasarelas de pago (Webpay, Mercado Pago)",
				"Carga inicial de hasta 20 productos",
				"Diseño atractivo y enfocado en la venta",
				"Capacitación completa para gestionar tu tienda",
			],
			icon: <ShoppingCart className="w-16 h-16" />,
			price: "$100.000 CLP",
			duration: "Entrega en 10-15 días hábiles",
		},
		{
			id: "webflow",
			title: "Sitio Web Webflow Pro",
			description:
				"La potencia de un CMS visual y diseños sin límites. Ideal para sitios de contenido dinámico que necesitan un diseño excepcional.",
			features: [
				"Diseño avanzado y a medida en Webflow",
				"CMS integrado para gestionar contenido (Blog, Proyectos)",
				"Animaciones e interacciones de alto impacto",
				"Diseño 100% responsive y optimizado",
				"Capacitación para el uso del CMS de Webflow",
			],
			icon: <Layers className="w-16 h-16" />, // Nuevo ícono
			price: "$120.000 CLP",
			duration: "Entrega en 15-20 días hábiles",
		},
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
						Nuestros Servicios
					</motion.h1>
					<motion.p
						className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						Soluciones web a la medida de tu negocio, enfocadas en resultados
						reales.
					</motion.p>
				</div>
			</section>

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
							Obtén una cotización gratuita y descubre cómo podemos ayudarte a
							alcanzar tus objetivos.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<motion.button
								className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Cotización Gratuita
							</motion.button>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default Services;
