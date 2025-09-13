import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Palette } from "lucide-react";
import { motion } from "framer-motion";

function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const navItems = [
		{ name: "Inicio", path: "/" },
		{ name: "Servicios", path: "/servicios" },
		{ name: "Portafolio", path: "/portafolio" },
		{ name: "Nosotros", path: "/nosotros" },
		{ name: "Contacto", path: "/contacto" },
	];

	const isActive = (path) => location.pathname === path;

	return (
		<header className="bg-card/95 backdrop-blur-sm sticky top-0 z-50 border-b border-secondary">
			<nav className="container mx-auto px-6 py-4 flex justify-between items-center">
				{/* Logo */}
				<Link to="/" className="flex items-center space-x-2">
					<div className="bg-gradient-to-r from-primary to-accent p-2 rounded-lg">
						<Palette className="w-6 h-6 text-white" />
					</div>
					<span className="text-xl font-bold text-text">WebDesign Pro</span>
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden md:flex space-x-8">
					{navItems.map((item) => (
						<Link
							key={item.path}
							to={item.path}
							className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
								isActive(item.path)
									? "text-accent"
									: "text-text-secondary hover:text-text"
							}`}
						>
							{item.name}
							{isActive(item.path) && (
								<motion.div
									className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
									layoutId="activeTab"
									initial={false}
									transition={{ type: "spring", stiffness: 500, damping: 30 }}
								/>
							)}
						</Link>
					))}
				</div>

				{/* CTA Button */}
				<div className="hidden md:block">
					<Link
						to="/contacto"
						className="bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-primary text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
					>
						Consulta Gratuita
					</Link>
				</div>

				{/* Mobile Menu Button */}
				<button
					onClick={toggleMenu}
					className="md:hidden text-text-secondary hover:text-text transition-colors duration-200"
				>
					{isMenuOpen ? (
						<X className="w-6 h-6" />
					) : (
						<Menu className="w-6 h-6" />
					)}
				</button>
			</nav>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<motion.div
					className="md:hidden bg-card border-t border-secondary"
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: "auto" }}
					exit={{ opacity: 0, height: 0 }}
					transition={{ duration: 0.3 }}
				>
					<div className="px-6 py-4 space-y-4">
						{navItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								onClick={() => setIsMenuOpen(false)}
								className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
									isActive(item.path)
										? "text-accent bg-secondary rounded-lg"
										: "text-text-secondary hover:text-text hover:bg-secondary rounded-lg"
								}`}
							>
								{item.name}
							</Link>
						))}
						<Link
							to="/contacto"
							onClick={() => setIsMenuOpen(false)}
							className="block w-full text-center bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-primary text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 mt-4"
						>
							Consulta Gratuita
						</Link>
					</div>
				</motion.div>
			)}
		</header>
	);
}

export default Navigation;
