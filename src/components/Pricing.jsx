import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Loader } from "lucide-react";
import PaymentModal from "./PaymentModal"; // Importamos nuestro nuevo modal

// El componente PaymentButton ya no es necesario aquí, lo movimos a PaymentModal.jsx

function Pricing() {
	// Estados para manejar el modal y el plan seleccionado
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState(null);
	const [error, setError] = useState(null);

	// Función para abrir el modal con el plan correcto
	const handlePlanSelection = (plan) => {
		setSelectedPlan(plan);
		setIsModalOpen(true);
	};

	// La lógica de pago ahora recibe el email desde el modal
	const initiatePayment = async (gateway, plan, email) => {
		setError(null);
		try {
			const backendUrl = "https://nubestilo-backend.onrender.com";
			const response = await fetch(`${backendUrl}/create-payment`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					gateway,
					amount: plan.discountPrice || plan.price,
					description: plan.name,
					email: email,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Error en el servidor de pagos.");
			}

			const data = await response.json();
			window.location.href = data.url; // Redirigir al usuario a la pasarela
		} catch (err) {
			console.error("Detalle del error de pago:", err);
			// Este error se pasará al modal para ser mostrado al usuario
			throw new Error(
				"No se pudo iniciar el proceso de pago. Por favor, intenta de nuevo."
			);
		}
	};

	const plans = [
		{
			name: "Plan Básico",
			description:
				"Perfecto para empezar y captar tus primeros clientes online.",
			price: 30000,
			discountPrice: 21000, // 30% de descuento
			period: "Pago Único",
			features: [
				"Página web de una sección (One-Page)",
				"Diseño profesional y moderno",
				"Formulario de contacto",
				"Entrega en tiempo récord",
			],
			cta: "Comenzar ahora",
			highlighted: false,
			hasOffer: true,
		},
		{
			name: "Plan Emprendedor",
			description:
				"Ideal para quienes necesitan un sitio autoadministrable y completo.",
			price: 50000,
			period: "Pago Único",
			features: [
				"Sitio web con WordPress",
				"Panel para administrar tu contenido",
				"Blog integrado",
				"Diseño adaptable a tu marca",
			],
			cta: "Elegir Plan Emprendedor",
			highlighted: true,
		},
		{
			name: "Plan E-commerce",
			description:
				"La solución completa para empezar a vender tus productos en línea.",
			price: 100000,
			period: "Pago Único",
			features: [
				"Tienda online (Shopify, Jumpseller, etc.)",
				"Configuración de pasarelas de pago",
				"Carga inicial de productos",
				"Capacitación para gestionar tu tienda",
			],
			cta: "Crear mi Tienda",
			highlighted: false,
		},
		{
			name: "Plan Webflow Pro",
			description:
				"Para sitios de contenido dinámico con un diseño de alto impacto visual.",
			price: 120000,
			period: "Pago Único",
			features: [
				"Diseño avanzado en Webflow",
				"CMS visual para gestionar contenido",
				"Animaciones e interacciones",
				"Capacitación en la plataforma",
			],
			cta: "Elegir Plan Pro",
			highlighted: false,
		},
	];

	return (
		<>
			<section id="pricing" className="py-20 px-6 bg-[var(--bg-dark)]">
				<div className="container mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h3 className="text-sm font-semibold text-[var(--primary-color)] tracking-wider uppercase mb-4">
							PLANES
						</h3>
						<h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
							Elige el Plan Perfecto para tu Negocio
						</h2>
						<p className="text-xl text-[var(--text-secondary)] mb-8">
							Precios transparentes y soluciones a la medida de tus necesidades.
						</p>
						{error && (
							<p className="text-red-500 mt-4">Error general: {error}</p>
						)}
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
						{plans.map((plan, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								whileHover={{ y: -5 }}
								className={`relative rounded-2xl p-8 transition-all duration-300 flex flex-col h-full ${
									plan.highlighted
										? "bg-gradient-to-b from-[var(--primary-hover)]/10 to-[var(--primary-hover)]/5 border-2 border-[var(--primary-color)]"
										: "bg-[var(--bg-card)]/80 border border-[var(--border-gray-700)]"
								}`}
							>
								{plan.hasOffer && (
									<div className="absolute top-0 -right-4 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full transform rotate-12 shadow-lg">
										¡OFERTA ONLINE!
									</div>
								)}
								<div className="text-center flex-grow">
									<h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
										{plan.name}
									</h3>
									<p className="text-[var(--text-secondary)] mb-6 min-h-[3rem] flex items-center justify-center text-sm">
										{plan.description}
									</p>

									<div className="mb-8 min-h-[5rem] flex flex-col justify-center">
										{plan.hasOffer ? (
											<>
												<span className="text-2xl font-semibold text-gray-500 line-through">
													${new Intl.NumberFormat("es-CL").format(plan.price)}
												</span>
												<span className="text-4xl font-bold text-green-400">
													$
													{new Intl.NumberFormat("es-CL").format(
														plan.discountPrice
													)}
												</span>
											</>
										) : (
											<span className="text-4xl font-bold text-[var(--text-primary)]">
												${new Intl.NumberFormat("es-CL").format(plan.price)}
											</span>
										)}
										<span className="text-[var(--text-secondary)] text-sm">
											{plan.period}
										</span>
									</div>

									{plan.hasOffer ? (
										<motion.button
											onClick={() => handlePlanSelection(plan)}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											className="w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 text-md mb-8 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 shadow-lg text-white"
										>
											Pagar Online y Ahorrar
										</motion.button>
									) : (
										<Link to="/contacto">
											<motion.button
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												className="w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 text-md mb-8 bg-gradient-to-r from-gray-200 to-white hover:from-gray-100 hover:to-gray-50 shadow-lg text-black"
											>
												{plan.cta}
											</motion.button>
										</Link>
									)}
								</div>

								<div className="flex-grow">
									<h4 className="text-[var(--text-primary)] font-semibold mb-6 text-md">
										Incluye:
									</h4>
									<ul className="space-y-3">
										{plan.features.map((feature, featureIndex) => (
											<li
												key={featureIndex}
												className="flex items-start space-x-3"
											>
												<div className="w-4 h-4 rounded-full border-2 border-[var(--text-primary)] flex items-center justify-center mt-1 flex-shrink-0">
													<div className="w-1.5 h-1.5 bg-[var(--text-primary)] rounded-full"></div>
												</div>
												<span className="text-[var(--text-primary)] leading-relaxed text-sm">
													{feature}
												</span>
											</li>
										))}
									</ul>
								</div>
							</motion.div>
						))}
					</div>
					<div className="flex justify-center mt-12 text-center">
						<p className="text-text-secondary">
							¿Buscas un diseño con animaciones de vanguardia y pago mensual?{" "}
							<br /> El <b>Plan Premium Framer</b> es para ti.{" "}
							<Link
								to="/contacto"
								className="text-primary hover:underline font-semibold"
							>
								¡Contáctanos!
							</Link>
						</p>
					</div>
				</div>
			</section>

			{/* Renderizar el modal */}
			<PaymentModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				plan={selectedPlan}
				onInitiatePayment={initiatePayment}
			/>
		</>
	);
}

export default Pricing;
