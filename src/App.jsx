import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToAnchor from "@/components/ScrollToAnchor";
import {
	ScrollToTop,
	ParallaxBackground,
	ScrollProgress,
	LoadingSpinner,
} from "@/components/InteractiveElements";
import WhatsAppButton from "@/components/WhatsAppButton"; // <-- 1. Importar el nuevo componente

// --- Implementación de Code Splitting con React.lazy ---
const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Checkout = lazy(() => import("@/pages/Checkout"));

// ---------------------------------------------------------

function App() {
	return (
		<Router>
			<ScrollToAnchor />
			<ScrollProgress />
			<ParallaxBackground />
			<div className="min-h-screen bg-background text-text relative">
				<Navigation />
				<main>
					{/* Usamos Suspense para mostrar un loader mientras se carga el código de la página */}
					<Suspense
						fallback={
							<div className="flex justify-center items-center h-screen">
								<LoadingSpinner />
							</div>
						}
					>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/servicios" element={<Services />} />
							<Route path="/portafolio" element={<Portfolio />} />
							<Route path="/nosotros" element={<About />} />
							<Route path="/contacto" element={<Contact />} />
							<Route path="/checkout" element={<Checkout />} />
						</Routes>
					</Suspense>
				</main>
				<Footer />
				<ScrollToTop />
				<WhatsAppButton /> {/* <-- 2. Añadir el botón aquí */}
			</div>
		</Router>
	);
}

export default App;
