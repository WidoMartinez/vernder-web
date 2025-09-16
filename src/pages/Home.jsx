import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Zap, TrendingUp } from "lucide-react";
import {
	AnimatedCounter,
	RevealOnScroll,
} from "@/components/InteractiveElements";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import { Link } from "react-router-dom";

function Results() {
	const stats = [
		{
			number: 40,
			label: "Más Consultas Mensuales",
			icon: <TrendingUp className="w-8 h-8" />,
			suffix: "%",
		},
		{
			number: 99,
			label: "Clientes Satisfechos",
			icon: <Star className="w-8 h-8" />,
			suffix: "%",
		},
		{
			number: 7,
			label: "Días de Entrega Promedio",
			icon: <Zap className="w-8 h-8" />,
			suffix: "",
		},
		{
			number: 50,
			label: "Emprendedores Impulsados",
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
							Resultados que Impulsan tu Negocio
						</h2>
						<p className="text-xl text-amber-100 max-w-3xl mx-auto">
							Nuestro enfoque es simple: crear webs que funcionen y generen
							valor real para nuestros clientes.
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
				"La página quedó excelente y fue súper rápido. Desde que la tengo, me han llegado más clientes por WhatsApp. Totalmente recomendado.",
			author: "Juan Pérez",
			role: "Contratista, Santiago",
			rating: 5,
		},
		{
			quote:
				"Necesitaba una web simple para mostrar mis tortas y el resultado fue perfecto. El precio es muy conveniente para emprendedores.",
			author: "Carla Muñoz",
			role: "Dueña de 'Dulce Secreto', Valparaíso",
			rating: 5,
		},
		{
			quote:
				"El proceso fue muy claro y me entregaron la tienda online lista para vender. El soporte post-venta es un gran plus.",
			author: "Rodrigo Fuentes",
			role: "Tienda 'Patagonia Style', Coyhaique",
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
							La satisfacción de quienes confían en nosotros es nuestro mayor
							orgullo.
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
							¿Listo para Tener tu Propia Página Web?
						</h2>
						<p className="text-xl md:text-2xl text-text-secondary mb-12 leading-relaxed">
							Da el primer paso para profesionalizar tu negocio en línea. Obtén
							una cotización gratuita y sin compromiso.
						</p>

						<div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
							<Link to="/contacto">
								<motion.button
									className="bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-primary text-white px-10 py-5 rounded-full font-bold text-xl flex items-center gap-3 shadow-2xl group"
									whileHover={{
										scale: 1.05,
										boxShadow: "0 20px 40px rgba(217, 119, 6, 0.4)",
									}}
									whileTap={{ scale: 0.95 }}
								>
									Cotizar mi Web Ahora
									<motion.div
										animate={{ x: [0, 5, 0] }}
										transition={{ duration: 1.5, repeat: Infinity }}
									>
										<ArrowRight className="w-6 h-6" />
									</motion.div>
								</motion.button>
							</Link>
						</div>

						<motion.div
							className="mt-12 text-text-muted"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
						>
							<p>✓ Cotización rápida ✓ Sin compromisos ✓ Precios claros</p>
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
			<Features />
			<HowItWorks />
			<Pricing />
			<Results />
			<Testimonials />
			<FinalCTA />
		</>
	);
}

export default Home;
