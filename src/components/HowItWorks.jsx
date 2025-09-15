import { motion } from "framer-motion";
import step1Image from "../assets/crm-dashboard-bl.png"; // Reemplazar con imágenes adecuadas
import step2Image from "../assets/crm-dashboard-tr.png"; // Reemplazar con imágenes adecuadas
import step3Image from "../assets/crm-dashboard-r.png"; // Reemplazar con imágenes adecuadas

function HowItWorks() {
	const steps = [
		{
			stepNumber: "PASO 1",
			title: "Elige tu Plan y Contáctanos",
			description:
				"Revisa nuestros planes y elige el que mejor se adapte a ti. Luego, envíanos un mensaje para iniciar el proceso.",
			image: step1Image,
			alt: "Persona eligiendo un plan de página web",
		},
		{
			stepNumber: "PASO 2",
			title: "Envíanos tu Información",
			description:
				"Te pediremos los textos, logo e imágenes para tu sitio. Si no los tienes, ¡no te preocupes! Podemos ayudarte.",
			image: step2Image,
			alt: "Carpeta con información y contenido para la web",
		},
		{
			stepNumber: "PASO 3",
			title: "¡Lanzamos tu Página Web!",
			description:
				"En pocos días, tu página web estará lista, publicada y funcionando para atraer a tus nuevos clientes.",
			image: step3Image,
			alt: "Cohete despegando, simbolizando el lanzamiento de la web",
		},
	];

	return (
		<section id="how-it-works" className="py-20 px-6 bg-background">
			<div className="container mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h3 className="text-sm font-semibold text-primary tracking-wider uppercase mb-4">
						PROCESO SIMPLE
					</h3>
					<h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
						Tu Página Web en 3 Simples Pasos
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
					{steps.map((step, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="relative rounded-2xl overflow-hidden bg-card border border-primary/30 p-6 flex flex-col"
						>
							<div className="mb-6">
								<span className="text-xs font-semibold text-primary tracking-wider uppercase mb-2 block">
									{step.stepNumber}
								</span>
								<h3 className="text-xl font-bold text-text mb-4">
									{step.title}
								</h3>
								<p className="text-text-secondary leading-relaxed">
									{step.description}
								</p>
							</div>
							<div className="mt-auto h-56 rounded-xl overflow-hidden bg-secondary">
								<img
									src={step.image}
									alt={step.alt}
									className="w-full h-full object-cover"
								/>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

export default HowItWorks;
