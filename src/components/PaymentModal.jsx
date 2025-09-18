import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Loader, ShieldCheck, FileText } from "lucide-react";
import { useState } from "react";

import logoFlow from "@/assets/logos/logoflow.png";

const GatewayButton = ({ gateway, onSelect, isSelected, isLoading }) => {
	const logos = {
		mercadopago: "https://img.icons8.com/color/48/mercado-pago.png",
		flow: logoFlow,
	};

	return (
		<button
			onClick={() => onSelect(gateway)}
			disabled={isLoading}
			// --- ¡CAMBIO REALIZADO! Se eliminó la clase "bg-white" para restaurar el fondo original ---
			className={`w-full h-14 flex items-center justify-center p-2 rounded-lg font-semibold transition-all duration-300 text-sm border-2 ${
				isSelected
					? "border-primary bg-primary/10"
					: "border-secondary hover:border-primary/50"
			}`}
		>
			<img
				src={logos[gateway]}
				alt={gateway}
				className="max-h-full max-w-full object-contain"
			/>
		</button>
	);
};

const PaymentModal = ({ isOpen, onClose, plan, onInitiatePayment }) => {
	const [email, setEmail] = useState("");
	const [selectedGateway, setSelectedGateway] = useState("mercadopago");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !selectedGateway) {
			setError("Por favor, ingresa tu email y selecciona un método de pago.");
			return;
		}
		setIsLoading(true);
		setError(null);
		try {
			await onInitiatePayment(selectedGateway, plan, email);
		} catch (err) {
			setError(
				err.message || "Ocurrió un error. Por favor, inténtalo de nuevo."
			);
			setIsLoading(false);
		}
	};

	if (!isOpen || !plan) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
					onClick={onClose}
				>
					<motion.div
						initial={{ scale: 0.9, y: 20 }}
						animate={{ scale: 1, y: 0 }}
						exit={{ scale: 0.9, y: 20 }}
						className="bg-card border border-secondary rounded-2xl w-full max-w-md text-text relative overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={onClose}
							className="absolute top-4 right-4 text-text-muted hover:text-text transition-colors z-10"
						>
							<X className="w-5 h-5" />
						</button>

						<div className="p-8">
							<div className="bg-secondary rounded-lg p-4 mb-6 text-center">
								<h3 className="text-sm font-semibold text-text-secondary mb-2">
									RESUMEN DE TU COMPRA
								</h3>
								<p className="text-lg font-bold text-text">{plan.name}</p>
								<p className="text-2xl font-bold text-primary">
									$
									{new Intl.NumberFormat("es-CL").format(
										plan.discountPrice || plan.price
									)}
									<span className="text-sm text-text-muted"> CLP</span>
								</p>
							</div>

							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-text-secondary mb-2"
									>
										1. Ingresa tu Correo Electrónico
									</label>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
										<input
											type="email"
											id="email"
											name="email"
											required
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="w-full pl-10 pr-4 py-3 bg-secondary border border-text-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-text-muted"
											placeholder="Aquí enviaremos la confirmación"
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-text-secondary mb-2">
										2. Selecciona tu Método de Pago Seguro
									</label>
									<div className="grid grid-cols-2 gap-4">
										<GatewayButton
											gateway="mercadopago"
											onSelect={setSelectedGateway}
											isSelected={selectedGateway === "mercadopago"}
											isLoading={isLoading}
										/>
										<GatewayButton
											gateway="flow"
											onSelect={setSelectedGateway}
											isSelected={selectedGateway === "flow"}
											isLoading={isLoading}
										/>
									</div>
								</div>

								{error && (
									<p className="text-red-500 text-sm text-center">{error}</p>
								)}

								<motion.button
									type="submit"
									disabled={isLoading}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-primary text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70"
								>
									{isLoading ? (
										<Loader className="w-5 h-5 animate-spin" />
									) : (
										<ShieldCheck className="w-5 h-5" />
									)}
									<span>
										{isLoading ? "Redirigiendo..." : "Pagar de forma segura"}
									</span>
								</motion.button>
							</form>
						</div>
						<div className="bg-secondary/50 p-4 border-t border-secondary text-center">
							<p className="text-xs text-text-muted flex items-center justify-center gap-2">
								<FileText className="w-4 h-4 text-primary" />
								Después del pago, te guiaremos para que nos des los detalles de
								tu proyecto.
							</p>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default PaymentModal;
