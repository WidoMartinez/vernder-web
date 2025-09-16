import { Linkedin, Instagram, Github } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

function Footer() {
	return (
		<footer className="bg-background border-t border-card py-16">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
					{/* Columna 1: Marca y Redes Sociales */}
					<div className="md:col-span-1">
						<Link to="/" className="inline-block mb-4">
							<img src={logo} alt="Nubestilo" className="h-12" />
						</Link>
						<p className="text-text-secondary leading-relaxed max-w-xs">
							Transformamos ideas en experiencias digitales. Creamos páginas web
							profesionales para impulsar tu negocio.
						</p>
						<div className="flex items-center space-x-4 mt-6">
							<a
								href="https://www.linkedin.com/"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn"
								className="text-text-muted hover:text-accent transition-colors duration-200"
							>
								<Linkedin className="w-5 h-5" />
							</a>
							<a
								href="https://www.instagram.com/"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Instagram"
								className="text-text-muted hover:text-accent transition-colors duration-200"
							>
								<Instagram className="w-5 h-5" />
							</a>
							<a
								href="https://github.com/"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub"
								className="text-text-muted hover:text-accent transition-colors duration-200"
							>
								<Github className="w-5 h-5" />
							</a>
						</div>
					</div>

					{/* Columna 2: Navegación */}
					<div>
						<h4 className="text-lg font-semibold text-text mb-4">Navegación</h4>
						<ul className="space-y-3">
							<li>
								<Link
									to="/"
									className="text-text-secondary hover:text-accent transition-colors duration-200"
								>
									Inicio
								</Link>
							</li>
							<li>
								<Link
									to="/servicios"
									className="text-text-secondary hover:text-accent transition-colors duration-200"
								>
									Servicios
								</Link>
							</li>
							<li>
								<Link
									to="/portafolio"
									className="text-text-secondary hover:text-accent transition-colors duration-200"
								>
									Portafolio
								</Link>
							</li>
							<li>
								<Link
									to="/nosotros"
									className="text-text-secondary hover:text-accent transition-colors duration-200"
								>
									Nosotros
								</Link>
							</li>
							<li>
								<Link
									to="/contacto"
									className="text-text-secondary hover:text-accent transition-colors duration-200"
								>
									Contacto
								</Link>
							</li>
						</ul>
					</div>

					{/* Columna 3: Servicios */}
					<div>
						<h4 className="text-lg font-semibold text-text mb-4">Servicios</h4>
						<ul className="space-y-3">
							<li>
								<Link
									to="/servicios#one-page"
									className="text-text-secondary hover:text-accent transition-colors duration-200"
								>
									Web One-Page
								</Link>
							</li>
							<li>
								<Link
									to="/servicios#wordpress"
									className="text-text-secondary hover:text-accent transition-colors duration-200"
								>
									Sitio WordPress
								</Link>
							</li>
							<li>
								<Link
									to="/servicios#ecommerce"
									className="text-text-secondary hover:text-accent transition-colors duration-200"
								>
									Tienda E-commerce
								</Link>
							</li>
							<li>
								<Link
									to="/servicios#webflow"
									className="text-text-secondary hover:text-accent transition-colors duration-200"
								>
									Webflow Pro
								</Link>
							</li>
						</ul>
					</div>

					{/* Columna 4: Contacto y Legal */}
					<div>
						<h4 className="text-lg font-semibold text-text mb-4">Contacto</h4>
						<ul className="space-y-3 text-text-secondary">
							<li>
								<a
									href="mailto:contacto@nubestilo.com"
									className="hover:text-accent transition-colors duration-200"
								>
									contacto@nubestilo.com
								</a>
							</li>
							<li>
								<a
									href="tel:+56964355581"
									className="hover:text-accent transition-colors duration-200"
								>
									+56 9 643 55581
								</a>
							</li>
						</ul>
						<h4 className="text-lg font-semibold text-text mb-4 mt-6">Legal</h4>
						<ul className="space-y-3">
							<li>
								<Link
									to="/privacidad"
									className="text-text-secondary hover:text-accent transition-colors duration-200"
								>
									Política de Privacidad
								</Link>
							</li>
							<li>
								<Link
									to="/terminos"
									className="text-text-secondary hover:text-accent transition-colors duration-200"
								>
									Términos de Servicio
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-card pt-8 text-center">
					<p className="text-text-muted text-sm">
						© 2024 Nubestilo. Todos los derechos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
