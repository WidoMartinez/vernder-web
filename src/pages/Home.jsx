import { motion } from "framer-motion";
import {
	ArrowRight,
	CheckCircle,
	Star,
	Users,
	Zap,
	Target,
	Palette,
	Code,
	TrendingUp,
} from "lucide-react";
import {
	AnimatedCounter,
	RevealOnScroll,
} from "@/components/InteractiveElements";

function Hero() {
	const heroBackgroundImage =
		"https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1964&auto=format&fit=crop";

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Imagen de fondo y superposición */}
			<div
				className="absolute inset-0 bg-cover bg-center z-0"
				style={{ backgroundImage: `url(${heroBackgroundImage})` }}
			>
				<div className="absolute inset-0 bg-black/70"></div>
			</div>

			{/* Background gradient original (ahora sutil sobre la imagen) */}
			<div className="absolute inset-0 bg-gradient-to-br from-background/50 via-secondary/50 to-background/50 z-1"></div>

			{/* Animated background elements */}
			<div className="absolute inset-0 z-2">
				<motion.div
					className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.6, 0.3],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.4, 0.7, 0.4],
					}}
					transition={{
						duration: 5,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 1,
					}}
				/>
			</div>

			<div className="relative z-10 container mx-auto px-4 text-center">
				<motion.div
					className="max-w-5xl mx-auto"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<motion.h1
						className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-amber-400 via-primary to-amber-300 bg-clip-text text-transparent"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						Diseños Web que
						<motion.span
							className="block"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
						>
							Generan Resultados
						</motion.span>
					</motion.h1>

					<motion.p
						className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						Transformamos tu presencia digital con sitios web modernos,
						optimizados para conversión y diseñados para hacer crecer tu negocio
					</motion.p>

					<motion.div
						className="flex flex-col sm:flex-row gap-6 justify-center items-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
					>
						<motion.button
							className="bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-primary text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 shadow-2xl group"
							whileHover={{
								scale: 1.05,
								boxShadow: "0 20px 40px rgba(217, 119, 6, 0.3)",
							}}
							whileTap={{ scale: 0.95 }}
						>
							Consulta Gratuita
							<motion.div
								animate={{ x: [0, 5, 0] }}
								transition={{ duration: 1.5, repeat: Infinity }}
							>
								<ArrowRight className="w-5 h-5" />
							</motion.div>
						</motion.button>

						<motion.button
							className="border-2 border-white/30 hover:border-white/60 text-text px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<motion.span className="group-hover:text-accent transition-colors duration-300">
								Ver Portafolio
							</motion.span>
						</motion.button>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

// ... (El resto de los componentes de Home.jsx permanecen igual)

function TrustedBrands() {
	const brands = [
		"WordPress",
		"Framer",
		"Shopify",
		"Webflow",
		"React",
		"Next.js",
	];

	return (
		<section className="py-20 bg-card/50">
			<div className="container mx-auto px-4">
				<RevealOnScroll>
					<div className="text-center mb-12">
						<p className="text-text-secondary text-lg mb-8">
							Trabajamos con las mejores tecnologías
						</p>
						<div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
							{brands.map((brand, index) => (
								<motion.div
									key={brand}
									className="text-text-secondary font-semibold text-lg hover:text-text transition-colors duration-300 cursor-pointer"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									whileHover={{
										scale: 1.1,
										color: "#f59e0b",
									}}
								>
									{brand}
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</div>
		</section>
	);
}

function Services() {
	const services = [
		{
			icon: <Palette className="w-12 h-12" />,
			title: "Diseño Web Personalizado",
			description:
				"Creamos diseños únicos que reflejan la identidad de tu marca y conectan con tu audiencia objetivo.",
			features: ["Diseño responsive", "UX/UI optimizado", "Branding coherente"],
		},
		{
			icon: <Code className="w-12 h-12" />,
			title: "Desarrollo Frontend",
			description:
				"Desarrollamos sitios web modernos con las últimas tecnologías para garantizar rendimiento y funcionalidad.",
			features: ["React & Next.js", "WordPress avanzado", "Optimización SEO"],
		},
		{
			icon: <Target className="w-12 h-12" />,
			title: "Optimización para Leads",
			description:
				"Diseñamos cada elemento pensando en la conversión, desde formularios hasta llamadas a la acción.",
			features: ["Landing pages", "Formularios optimizados", "A/B Testing"],
		},
		{
			icon: <TrendingUp className="w-12 h-12" />,
			title: "Análisis y Mejora",
			description:
				"Monitoreamos el rendimiento de tu sitio y implementamos mejoras continuas basadas en datos.",
			features: [
				"Google Analytics",
				"Reportes mensuales",
				"Optimización continua",
			],
		},
	];

	return (
		<section className="py-20 bg-background">
			<div className="container mx-auto px-4">
				<RevealOnScroll>
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
							Nuestros Servicios
						</h2>
						<p className="text-xl text-text-secondary max-w-3xl mx-auto">
							Ofrecemos soluciones completas para llevar tu presencia digital al
							siguiente nivel
						</p>
					</div>
				</RevealOnScroll>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{services.map((service, index) => (
						<RevealOnScroll key={index} delay={index * 0.1}>
							<motion.div
								className="bg-card p-8 rounded-2xl hover:bg-secondary transition-all duration-300 group hover:transform hover:scale-105 cursor-pointer"
								whileHover={{
									y: -10,
									boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
								}}
							>
								<motion.div
									className="text-primary mb-6 group-hover:text-accent transition-colors duration-300"
									whileHover={{ rotate: [0, -10, 10, 0] }}
									transition={{ duration: 0.5 }}
								>
									{service.icon}
								</motion.div>
								<h3 className="text-xl font-bold mb-4 text-text">
									{service.title}
								</h3>
								<p className="text-text-secondary mb-6 leading-relaxed">
									{service.description}
								</p>
								<ul className="space-y-2">
									{service.features.map((feature, idx) => (
										<motion.li
											key={idx}
											className="flex items-center text-sm text-text-muted"
											initial={{ opacity: 0, x: -10 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ delay: idx * 0.1 }}
										>
											<CheckCircle className="w-4 h-4 text-success mr-2 flex-shrink-0" />
											{feature}
										</motion.li>
									))}
								</ul>
							</motion.div>
						</RevealOnScroll>
					))}
				</div>
			</div>
		</section>
	);
}

function Results() {
	const stats = [
		{
			number: 150,
			label: "Proyectos Completados",
			icon: <Zap className="w-8 h-8" />,
			suffix: "+",
		},
		{
			number: 98,
			label: "Clientes Satisfechos",
			icon: <Star className="w-8 h-8" />,
			suffix: "%",
		},
		{
			number: 300,
			label: "Aumento Promedio en Leads",
			icon: <TrendingUp className="w-8 h-8" />,
			suffix: "%",
		},
		{
			number: 50,
			label: "Empresas Confiaron en Nosotros",
			icon: <Users className="w-8 h-8" />,
			suffix: "+",
		},
	];

	return (
		<section className="py-20 bg-gradient-to-r from-primary to-accent">
			<div className="container mx-auto px-4">
				<RevealOnScroll>
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
							Resultados que Hablan por Sí Solos
						</h2>
						<p className="text-xl text-amber-100 max-w-3xl mx-auto">
							Nuestro enfoque en la conversión genera resultados medibles para
							nuestros clientes
						</p>
					</div>
				</RevealOnScroll>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{stats.map((stat, index) => (
						<RevealOnScroll key={index} delay={index * 0.1}>
							<motion.div
								className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
								whileHover={{
									scale: 1.05,
									boxShadow: "0 20px 40px rgba(255,255,255,0.1)",
								}}
							>
								<motion.div
									className="text-white mb-4 flex justify-center"
									whileHover={{ rotate: 360 }}
									transition={{ duration: 0.6 }}
								>
									{stat.icon}
								</motion.div>
								<div className="text-4xl md:text-5xl font-bold text-white mb-2">
									<AnimatedCounter end={stat.number} suffix={stat.suffix} />
								</div>
								<div className="text-amber-100 font-medium">{stat.label}</div>
							</motion.div>
						</RevealOnScroll>
					))}
				</div>
			</div>
		</section>
	);
}

function Testimonials() {
	const testimonials = [
		{
			quote:
				"Nuestro sitio web generó un 250% más de leads en los primeros 3 meses. El diseño es increíble y la funcionalidad perfecta.",
			author: "María González",
			role: "CEO, TechStart",
			rating: 5,
		},
		{
			quote:
				"El equipo entendió perfectamente nuestra visión y la transformó en una experiencia digital excepcional. Altamente recomendados.",
			author: "Carlos Ruiz",
			role: "Director de Marketing, InnovaLab",
			rating: 5,
		},
		{
			quote:
				"Profesionales, creativos y orientados a resultados. Nuestro ROI se duplicó gracias a la optimización de conversión.",
			author: "Ana Martínez",
			role: "Fundadora, EcoSolutions",
			rating: 5,
		},
	];

	return (
		<section className="py-20 bg-card">
			<div className="container mx-auto px-4">
				<RevealOnScroll>
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-text">
							Lo que Dicen Nuestros Clientes
						</h2>
						<p className="text-xl text-text-secondary max-w-3xl mx-auto">
							La satisfacción de nuestros clientes es nuestra mejor carta de
							presentación
						</p>
					</div>
				</RevealOnScroll>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<RevealOnScroll key={index} delay={index * 0.1}>
							<motion.div
								className="bg-secondary p-8 rounded-2xl hover:bg-secondary/70 transition-all duration-300 h-full"
								whileHover={{
									y: -5,
									boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
								}}
							>
								<div className="flex mb-4">
									{[...Array(testimonial.rating)].map((_, i) => (
										<motion.div
											key={i}
											initial={{ opacity: 0, scale: 0 }}
											whileInView={{ opacity: 1, scale: 1 }}
											transition={{ delay: i * 0.1 }}
										>
											<Star className="w-5 h-5 text-accent fill-current" />
										</motion.div>
									))}
								</div>
								<p className="text-text-secondary mb-6 text-lg leading-relaxed italic">
									"{testimonial.quote}"
								</p>
								<div>
									<p className="font-bold text-text">{testimonial.author}</p>
									<p className="text-text-muted">{testimonial.role}</p>
								</div>
							</motion.div>
						</RevealOnScroll>
					))}
				</div>
			</div>
		</section>
	);
}

function FinalCTA() {
	return (
		<section className="py-20 bg-background">
			<div className="container mx-auto px-4 text-center">
				<RevealOnScroll>
					<motion.div
						className="max-w-4xl mx-auto"
						whileInView={{ scale: [0.9, 1] }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
							¿Listo para Transformar tu Negocio?
						</h2>
						<p className="text-xl md:text-2xl text-text-secondary mb-12 leading-relaxed">
							Obtén una consulta gratuita y descubre cómo podemos ayudarte a
							generar más leads y hacer crecer tu negocio
						</p>

						<div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
							<motion.button
								className="bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-primary text-white px-10 py-5 rounded-full font-bold text-xl flex items-center gap-3 shadow-2xl group"
								whileHover={{
									scale: 1.05,
									boxShadow: "0 20px 40px rgba(217, 119, 6, 0.4)",
								}}
								whileTap={{ scale: 0.95 }}
							>
								Consulta Gratuita
								<motion.div
									animate={{ x: [0, 5, 0] }}
									transition={{ duration: 1.5, repeat: Infinity }}
								>
									<ArrowRight className="w-6 h-6" />
								</motion.div>
							</motion.button>

							<motion.button
								className="border-2 border-text-muted hover:border-text-secondary text-text-secondary hover:text-text px-10 py-5 rounded-full font-bold text-xl transition-all duration-300"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Ver Casos de Éxito
							</motion.button>
						</div>

						<motion.div
							className="mt-12 text-text-muted"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
						>
							<p>
								✓ Consulta sin compromiso ✓ Propuesta personalizada ✓ Resultados
								garantizados
							</p>
						</motion.div>
					</motion.div>
				</RevealOnScroll>
			</div>
		</section>
	);
}

function Home() {
	return (
		<>
			<Hero />
			<TrustedBrands />
			<Services />
			<Results />
			<Testimonials />
			<FinalCTA />
		</>
	);
}

export default Home;
