import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToAnchor from "@/components/ScrollToAnchor";
import {
	ScrollToTop,
	ParallaxBackground,
	ScrollProgress,
	LoadingSpinner, // Importamos el Spinner
} from "@/components/InteractiveElements";

// --- Implementación de Code Splitting con React.lazy ---
const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
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
						</Routes>
					</Suspense>
				</main>
				<Footer />
				<ScrollToTop />
			</div>
		</Router>
	);
}

export default App;
