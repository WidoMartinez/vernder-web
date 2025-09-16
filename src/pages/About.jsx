import { motion } from "framer-motion";
import {
	Users,
	Award,
	Target,
	Heart,
	CheckCircle,
	ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
	const values = [
		{
			icon: <Target className="w-8 h-8" />,
			title: "Enfoque en Resultados",
			description:
				"Cada diseño está pensado para generar conversiones y hacer crecer tu negocio.",
		},
		{
			icon: <Heart className="w-8 h-8" />,
			title: "Pasión por el Diseño",
			description:
				"Amamos lo que hacemos y se refleja en cada proyecto que entregamos.",
		},
		{
			icon: <Users className="w-8 h-8" />,
			title: "Colaboración Cercana",
			description:
				"Trabajamos de la mano contigo para asegurar que tu visión se haga realidad.",
		},
		{
			icon: <Award className="w-8 h-8" />,
			title: "Calidad Premium",
			description:
				"Utilizamos las mejores prácticas y tecnologías para garantizar excelencia.",
		},
	];

	const team = [
		{
			name: "Ana García",
			role: "Directora Creativa",
			description:
				"10+ años creando experiencias digitales que conectan marcas con usuarios.",
			image: "/api/placeholder/300/300",
		},
		{
			name: "Carlos Ruiz",
			role: "Desarrollador Senior",
			description:
				"Especialista en React y tecnologías modernas, enfocado en performance.",
			image: "/api/placeholder/300/300",
		},
		{
			name: "María López",
			role: "Estratega UX/UI",
			description:
				"Experta en optimización de conversión y experiencia de usuario.",
			image: "/api/placeholder/300/300",
		},
	];

	const stats = [
		{ number: "150+", label: "Proyectos Completados" },
		{ number: "5", label: "Años de Experiencia" },
		{ number: "98%", label: "Clientes Satisfechos" },
		{ number: "24h", label: "Tiempo de Respuesta" },
	];

	const achievements = [
		"Certificados en Google Analytics y Google Ads",
		"Especialistas en WordPress y React",
		"Experiencia con más de 50 industrias diferentes",
		"Metodología ágil y entregas puntuales",
		"Soporte post-lanzamiento incluido",
		"Garantía de satisfacción del 100%",
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
						Sobre Nosotros
					</motion.h1>
					<motion.p
						className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						Somos un equipo apasionado de diseñadores y desarrolladores web
						comprometidos con transformar ideas en experiencias digitales
						exitosas
					</motion.p>
				</div>
			</section>

			{/* Mission Section */}
			<section className="px-4 pb-20">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
						>
							<h2 className="text-3xl md:text-4xl font-bold mb-6">
								Nuestra Misión
							</h2>
							<p className="text-text-secondary text-lg leading-relaxed mb-6">
								Creemos que cada negocio merece una presencia digital que no
								solo se vea increíble, sino que también genere resultados
								reales. Nuestro objetivo es ayudar a empresas de todos los
								tamaños a conectar con su audiencia y hacer crecer su negocio a
								través del poder del diseño web estratégico.
							</p>
							<p className="text-text-secondary text-lg leading-relaxed mb-8">
								Combinamos creatividad, tecnología y estrategia para crear
								sitios web que no solo impresionan visualmente, sino que también
								convierten visitantes en clientes leales.
							</p>
							<Link to="/portafolio">
								<motion.button
									className="bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-primary text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Conoce nuestro trabajo
									<ArrowRight className="w-5 h-5" />
								</motion.button>
							</Link>
						</motion.div>

						<motion.div
							className="relative"
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
						>
							<div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-8 text-center">
								<div className="grid grid-cols-2 gap-6">
									{stats.map((stat, index) => (
										<motion.div
											key={stat.label}
											className="text-center"
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.5, delay: index * 0.1 }}
										>
											<div className="text-3xl md:text-4xl font-bold mb-2">
												{stat.number}
											</div>
											<div className="text-amber-100 font-medium">
												{stat.label}
											</div>
										</motion.div>
									))}
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Values Section */}
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
							Nuestros Valores
						</h2>
						<p className="text-xl text-text-secondary max-w-3xl mx-auto">
							Los principios que guían cada proyecto y decisión que tomamos
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{values.map((value, index) => (
							<motion.div
								key={value.title}
								className="bg-card rounded-2xl p-6 text-center hover:bg-secondary transition-all duration-300 group"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
							>
								<div className="text-primary group-hover:text-accent transition-colors duration-300 mb-4 flex justify-center">
									{value.icon}
								</div>
								<h3 className="text-lg font-bold mb-3">{value.title}</h3>
								<p className="text-text-secondary text-sm leading-relaxed">
									{value.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="px-4 pb-20">
				<div className="max-w-7xl mx-auto">
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">
							Nuestro Equipo
						</h2>
						<p className="text-xl text-text-secondary max-w-3xl mx-auto">
							Profesionales apasionados con la experiencia y creatividad para
							hacer realidad tu visión
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{team.map((member, index) => (
							<motion.div
								key={member.name}
								className="bg-card rounded-3xl p-8 text-center hover:bg-secondary transition-all duration-300 group"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
							>
								<div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-6 flex items-center justify-center">
									<Users className="w-16 h-16 text-white opacity-50" />
								</div>
								<h3 className="text-xl font-bold mb-2">{member.name}</h3>
								<p className="text-primary font-medium mb-4">{member.role}</p>
								<p className="text-text-secondary text-sm leading-relaxed">
									{member.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Achievements Section */}
			<section className="px-4 pb-20 bg-card/50">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
						>
							<h2 className="text-3xl md:text-4xl font-bold mb-6">
								¿Por qué elegirnos?
							</h2>
							<p className="text-text-secondary text-lg leading-relaxed mb-8">
								Nuestra experiencia, metodología y compromiso con la excelencia
								nos distinguen en el mercado del diseño web.
							</p>
							<div className="space-y-4">
								{achievements.map((achievement, index) => (
									<motion.div
										key={achievement}
										className="flex items-start gap-3"
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
									>
										<CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
										<span className="text-text-secondary">{achievement}</span>
									</motion.div>
								))}
							</div>
						</motion.div>

						<motion.div
							className="relative"
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
						>
							<div className="bg-card rounded-3xl p-8">
								<h3 className="text-2xl font-bold mb-6 text-center">
									Proceso de Trabajo
								</h3>
								<div className="space-y-6">
									{[
										{
											step: "01",
											title: "Consulta",
											desc: "Entendemos tus necesidades",
										},
										{
											step: "02",
											title: "Estrategia",
											desc: "Planificamos la solución",
										},
										{
											step: "03",
											title: "Diseño",
											desc: "Creamos la experiencia",
										},
										{
											step: "04",
											title: "Desarrollo",
											desc: "Construimos tu sitio",
										},
										{
											step: "05",
											title: "Lanzamiento",
											desc: "Publicamos y optimizamos",
										},
									].map((item, index) => (
										<motion.div
											key={item.step}
											className="flex items-center gap-4"
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.5, delay: index * 0.1 }}
										>
											<div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center font-bold text-sm">
												{item.step}
											</div>
											<div>
												<h4 className="font-semibold">{item.title}</h4>
												<p className="text-text-muted text-sm">{item.desc}</p>
											</div>
										</motion.div>
									))}
								</div>
							</div>
						</motion.div>
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
							¿Listo para trabajar juntos?
						</h2>
						<p className="text-xl mb-8 opacity-90 text-amber-100">
							Conversemos sobre tu proyecto y descubre cómo podemos ayudarte a
							alcanzar tus objetivos
						</p>
						<Link to="/contacto">
							<motion.button
								className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Iniciar Conversación
							</motion.button>
						</Link>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default About;
