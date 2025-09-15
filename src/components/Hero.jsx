import { useRef } from "react";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import { RainbowButton } from "./magicui/rainbow-button";
import crmDashboard from "../assets/crm-dashboard.png";

function Hero() {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});

	const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
	const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

	return (
		<section ref={container} className="relative py-20 px-6 overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background"></div>

			<div className="relative container mx-auto text-center">
				<Motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="max-w-4xl mx-auto mb-4"
				>
					<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
						<span className="bg-gradient-to-b from-primary to-accent bg-clip-text text-transparent">
							Tu Página Web Profesional
							<br />
							Desde $30.000 CLP
						</span>
					</h1>

					<p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
						Lanza tu presencia en línea con una página web de una sola sección,
						optimizada para captar clientes y con entrega rápida.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<RainbowButton size="lg">Quiero mi Página Web</RainbowButton>
					</div>
				</Motion.div>

				<Motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.3 }}
					style={{
						rotateX: rotateX,
						scale: scale,
						transformPerspective: 1000,
						transformStyle: "preserve-3d",
					}}
					className="relative max-w-6xl mx-auto"
				>
					<img
						src={crmDashboard}
						alt="Dashboard de página web"
						className="w-full rounded-lg shadow-2xl border border-secondary"
					/>
				</Motion.div>
			</div>
		</section>
	);
}

export default Hero;
