import { motion } from "framer-motion";
import { Server, Mail, Globe, ShieldCheck } from "lucide-react";

function HostingInfo() {
	const includedFeatures = [
		{
			icon: <Server className="w-6 h-6 text-primary" />,
			title: "Hosting Gratis por 1 Año",
			description:
				"Alojamos tu sitio web en nuestros servidores rápidos y seguros sin costo durante el primer año.",
		},
		{
			icon: <Mail className="w-6 h-6 text-primary" />,
			title: "Correo Electrónico Profesional",
			description:
				"Incluimos una cuenta de correo electrónico con tu nombre de dominio (ej. contacto@tuempresa.cl) gratis por 1 año.",
		},
		{
			icon: <ShieldCheck className="w-6 h-6 text-primary" />,
			title: "Certificado SSL Incluido",
			description:
				"Tu sitio contará con un candado de seguridad, protegiendo los datos de tus visitantes y mejorando la confianza.",
		},
	];

	return (
		<section className="px-4 py-20 bg-card/50">
			<div className="max-w-7xl mx-auto">
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-6">
						Hosting, Dominio y Correo Electrónico
					</h2>
					<p className="text-xl text-text-secondary max-w-3xl mx-auto">
						Nos encargamos de los detalles técnicos para que tú te enfoques en
						tu negocio.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
					{includedFeatures.map((feature, index) => (
						<motion.div
							key={feature.title}
							className="bg-card rounded-2xl p-6 text-center"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
						>
							<div className="flex justify-center mb-4">{feature.icon}</div>
							<h3 className="text-lg font-bold mb-3">{feature.title}</h3>
							<p className="text-text-secondary text-sm leading-relaxed">
								{feature.description}
							</p>
						</motion.div>
					))}
				</div>

				<div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
					<div className="bg-card rounded-2xl p-6">
						<Globe className="w-8 h-8 text-primary mx-auto mb-4" />
						<h4 className="text-lg font-bold mb-2">Nombre de Dominio</h4>
						<p className="text-text-secondary text-sm">
							El dominio (ej. tuempresa.cl) no está incluido, pero te asesoramos
							para que lo puedas registrar fácilmente en{" "}
							<a
								href="https://nic.cl"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline"
							>
								NIC.cl
							</a>
							.
						</p>
					</div>
					<div className="bg-card rounded-2xl p-6">
						<Server className="w-8 h-8 text-primary mx-auto mb-4" />
						<h4 className="text-lg font-bold mb-2">Renovación Anual</h4>
						<p className="text-text-secondary text-sm">
							Después del primer año, puedes migrar tu sitio o renovar el
							hosting y correo con nosotros por un pago anual de $100.000 CLP.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HostingInfo;
