import { motion } from "framer-motion";
import {
	Smartphone,
	Mail,
	Rocket,
	GaugeCircle,
	ShieldCheck,
	MessageSquare,
} from "lucide-react";

function Features() {
	const features = [
		{
			icon: Smartphone,
			title: "Diseño 100% Adaptable",
			description:
				"Tu página se verá increíble en cualquier dispositivo, ya sea un celular, tablet o computador de escritorio.",
		},
		{
			icon: MessageSquare,
			title: "Botón de WhatsApp",
			description:
				"Facilita el contacto directo. Tus clientes podrán enviarte un WhatsApp con un solo clic desde tu página web.",
		},
		{
			icon: Mail,
			title: "Formulario de Contacto",
			description:
				"Recibe las consultas de tus futuros clientes directamente en tu correo electrónico de forma ordenada y profesional.",
		},
		{
			icon: GaugeCircle,
			title: "Optimización SEO Básica",
			description:
				"Configuramos tu sitio con las bases para que los motores de búsqueda como Google puedan encontrarlo más fácilmente.",
		},
		{
			icon: Rocket,
			title: "Entrega Ultra Rápida",
			description:
				"Sabemos que tu tiempo es oro. Entregamos tu página web lista para funcionar en plazos que te sorprenderán.",
		},
		{
			icon: ShieldCheck,
			title: "Seguridad y Confianza",
			description:
				"Todos nuestros sitios incluyen certificado de seguridad (SSL) para proteger los datos y generar confianza en tus visitantes.",
		},
	];

	return (
		<section id="features" className="py-20 px-6 bg-[var(--bg-dark)]">
			<div className="container mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h3 className="text-sm font-semibold text-[var(--primary-color)] tracking-wider uppercase mb-4">
						CARACTERÍSTICAS
					</h3>
					<h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
						Todo lo que tu Negocio Necesita para Despegar
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => {
						const IconComponent = feature.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								whileHover={{ y: -5 }}
								className="bg-[var(--bg-card)] border border-[var(--bg-muted)] rounded-lg p-8 hover:border-[var(--border-primary)] transition-all duration-300 group"
							>
								<div className="mb-6">
									<div className="w-12 h-12 bg-[var(--primary-color)]/10 rounded-lg flex items-center justify-center group-hover:bg-[var(--primary-color)]/20 transition-colors duration-300">
										<IconComponent className="w-12 h-12 text-[var(--primary-color)]" />
									</div>
								</div>

								<h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4 group-hover:text-[var(--primary-color)] transition-colors duration-300">
									{feature.title}
								</h3>

								<p className="text-[var(--text-secondary)] leading-relaxed">
									{feature.description}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default Features;
