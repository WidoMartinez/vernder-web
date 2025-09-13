import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToAnchor from "@/components/ScrollToAnchor";
import {
	ScrollToTop,
	ParallaxBackground,
	FloatingContactButton,
	ScrollProgress,
} from "@/components/InteractiveElements";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

function App() {
	return (
		<Router>
			<ScrollToAnchor />
			<ScrollProgress />
			<ParallaxBackground />
			<div className="min-h-screen bg-background text-text relative">
				<Navigation />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/servicios" element={<Services />} />
						<Route path="/portafolio" element={<Portfolio />} />
						<Route path="/nosotros" element={<About />} />
						<Route path="/contacto" element={<Contact />} />
					</Routes>
				</main>
				<Footer />
				<ScrollToTop />
				<FloatingContactButton />
			</div>
		</Router>
	);
}

export default App;
