import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
	Loader,
	Lock,
	User,
	AtSign,
	Phone,
	FileText,
	Building,
	ArrowLeft,
	CheckCircle,
} from "lucide-react";
import logoFlow from "../assets/logos/logoflow.png"; // <-- 1. IMPORTAR LOGO LOCAL

// --- Componentes de Apoyo Internos ---

// Stepper para guiar al usuario
const CheckoutStepper = ({ currentStep }) => {
	const steps = ["Tus Datos", "Pago"];
	return (
		<div className="flex justify-center items-center mb-12">
			{steps.map((step, index) => (
				<div key={index} className="flex items-center">
					<div
						className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${
							index + 1 <= currentStep
								? "bg-primary text-white"
								: "bg-secondary text-text-secondary"
						}`}
					>
						{index + 1}
					</div>
					<span
						className={`ml-3 mr-6 font-semibold transition-colors duration-300 ${
							index + 1 <= currentStep ? "text-text" : "text-text-muted"
						}`}
					>
						{step}
					</span>
					{index < steps.length - 1 && (
						<div className="w-16 h-0.5 bg-secondary mr-6"></div>
					)}
				</div>
			))}
		</div>
	);
};

// Componente para un campo de formulario reutilizable
const FormInput = ({ icon, ...props }) => (
	<div className="relative">
		<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted pointer-events-none">
			{icon}
		</span>
		<input
			{...props}
			className="w-full pl-10 pr-4 py-3 bg-secondary border border-text-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-text placeholder-text-muted transition-colors duration-300"
		/>
	</div>
);

// Componente para el botón de selección de método de pago
const PaymentMethodButton = ({ method, logo, selectedMethod, onSelect }) => (
	<button
		onClick={() => onSelect(method.toLowerCase())}
		className={`relative w-full flex items-center justify-center gap-4 py-4 px-5 rounded-xl border-2 transition-all duration-300 ${
			selectedMethod === method.toLowerCase()
				? "border-primary bg-primary/10"
				: "border-secondary bg-secondary hover:border-primary/50"
		}`}
	>
		<img src={logo} alt={method} className="h-8 object-contain" />
		{selectedMethod === method.toLowerCase() && (
			<motion.div
				className="absolute top-2 right-2 text-primary"
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
			>
				<CheckCircle size={20} />
			</motion.div>
		)}
	</button>
);

const Checkout = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { plan } = location.state || {};

	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		rut: "",
		isBilling: false,
		billingRut: "",
		businessName: "",
		businessGiro: "",
	});
	const [paymentMethod, setPaymentMethod] = useState("flow");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	if (!plan) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
				<h1 className="text-3xl font-bold mb-4">Plan no seleccionado</h1>
				<p className="text-text-secondary mb-8">
					Por favor, vuelve a la sección de precios y elige un plan para
					continuar.
				</p>
				<button
					onClick={() => navigate("/#pricing")}
					className="bg-primary text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-primary-hover transition-colors"
				>
					<ArrowLeft className="w-5 h-5" />
					Volver a Planes
				</button>
			</div>
		);
	}

	const handlePayment = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const backendUrl = "https://nubestilo-backend.onrender.com";
			const response = await fetch(`${backendUrl}/create-payment`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					gateway: paymentMethod,
					amount: plan.discountPrice || plan.price,
					description: plan.name,
					email: formData.email,
				}),
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Error en el servidor de pagos.");
			}
			const data = await response.json();
			window.location.href = data.url;
		} catch (err) {
			setError(
				"No se pudo iniciar el pago. Intenta con otro método o contáctanos."
			);
			console.error("Detalle del error:", err);
			setIsLoading(false);
		}
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const formatRut = (rut) => {
		let value = rut.replace(/[^\dkK.-]/g, "");
		return value;
	};

	return (
		<div className="min-h-screen bg-background text-text pt-32 pb-20 px-4">
			<motion.div
				className="max-w-4xl mx-auto"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Finalizar Compra
					</h1>
					<p className="text-xl text-text-secondary">
						Estás a punto de adquirir el{" "}
						<span className="text-primary font-bold">{plan.name}</span>.
					</p>
				</div>

				<CheckoutStepper currentStep={step} />

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
					<div className="lg:col-span-3">
						{step === 1 && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="space-y-6 bg-card p-8 rounded-2xl"
							>
								<h2 className="text-2xl font-bold mb-4">
									Información de Contacto
								</h2>
								<FormInput
									icon={<User size={18} />}
									type="text"
									name="name"
									placeholder="Nombre Completo"
									value={formData.name}
									onChange={handleChange}
									required
								/>
								<FormInput
									icon={<AtSign size={18} />}
									type="email"
									name="email"
									placeholder="Email de Contacto"
									value={formData.email}
									onChange={handleChange}
									required
								/>
								<FormInput
									icon={<Phone size={18} />}
									type="tel"
									name="phone"
									placeholder="+56 9 1234 5678 (Opcional)"
									value={formData.phone}
									onChange={handleChange}
								/>
								<FormInput
									icon={<FileText size={18} />}
									type="text"
									name="rut"
									placeholder="RUT (para boleta)"
									value={formData.rut}
									onChange={(e) =>
										setFormData({ ...formData, rut: formatRut(e.target.value) })
									}
									required
								/>

								<div className="pt-4">
									<label className="flex items-center space-x-3 cursor-pointer">
										<input
											type="checkbox"
											name="isBilling"
											checked={formData.isBilling}
											onChange={handleChange}
											className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
										/>
										<span className="text-text-secondary">
											¿Necesitas factura?
										</span>
									</label>
								</div>

								{formData.isBilling && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										className="space-y-4 pt-4 border-t border-secondary mt-4"
									>
										<FormInput
											icon={<Building size={18} />}
											type="text"
											name="businessName"
											placeholder="Razón Social"
											value={formData.businessName}
											onChange={handleChange}
										/>
										<FormInput
											icon={<FileText size={18} />}
											type="text"
											name="billingRut"
											placeholder="RUT de la Empresa"
											value={formData.billingRut}
											onChange={(e) =>
												setFormData({
													...formData,
													billingRut: formatRut(e.target.value),
												})
											}
										/>
										<FormInput
											icon={<FileText size={18} />}
											type="text"
											name="businessGiro"
											placeholder="Giro"
											value={formData.businessGiro}
											onChange={handleChange}
										/>
									</motion.div>
								)}

								<button
									onClick={() => setStep(2)}
									className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-hover transition-colors"
								>
									Continuar al Pago
								</button>
							</motion.div>
						)}
						{step === 2 && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="bg-card p-8 rounded-2xl"
							>
								<button
									onClick={() => setStep(1)}
									className="flex items-center gap-2 text-text-secondary hover:text-primary mb-6 transition-colors"
								>
									<ArrowLeft size={18} /> Volver a datos
								</button>
								<h2 className="text-2xl font-bold mb-6">
									Elige tu método de pago
								</h2>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<PaymentMethodButton
										method="Flow"
										logo={logoFlow} // <-- 2. USAR EL LOGO IMPORTADO
										selectedMethod={paymentMethod}
										onSelect={setPaymentMethod}
									/>
									<PaymentMethodButton
										method="MercadoPago"
										logo="https://img.icons8.com/color/48/mercado-pago.png"
										selectedMethod={paymentMethod}
										onSelect={setPaymentMethod}
									/>
								</div>
								<p className="text-xs text-text-muted mt-6 text-center flex items-center justify-center gap-2">
									<Lock size={12} /> Todas las transacciones son seguras y
									encriptadas.
								</p>
							</motion.div>
						)}
					</div>

					<div className="lg:col-span-2">
						<div className="bg-card p-8 rounded-2xl sticky top-32">
							<h3 className="text-xl font-bold mb-6">Resumen del Pedido</h3>
							<div className="space-y-4">
								<div className="flex justify-between">
									<span className="text-text-secondary">{plan.name}</span>
									<span className="font-semibold">
										${new Intl.NumberFormat("es-CL").format(plan.price)}
									</span>
								</div>
								{plan.discountPrice && (
									<div className="flex justify-between text-success">
										<span>Descuento Online</span>
										<span className="font-semibold">
											-$
											{new Intl.NumberFormat("es-CL").format(
												plan.price - plan.discountPrice
											)}
										</span>
									</div>
								)}
								<div className="border-t border-secondary my-4"></div>
								<div className="flex justify-between text-2xl font-bold">
									<span>Total</span>
									<span>
										$
										{new Intl.NumberFormat("es-CL").format(
											plan.discountPrice || plan.price
										)}{" "}
										<span className="text-sm font-normal text-text-muted">
											CLP
										</span>
									</span>
								</div>
							</div>

							{step === 2 && (
								<>
									<button
										onClick={handlePayment}
										disabled={isLoading}
										className="w-full mt-8 bg-gradient-to-r from-primary to-accent text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60 hover:from-primary-hover hover:to-primary transition-all duration-300"
									>
										{isLoading ? <Loader className="animate-spin" /> : <Lock />}
										{isLoading
											? "Procesando..."
											: `Pagar con ${
													paymentMethod.charAt(0).toUpperCase() +
													paymentMethod.slice(1)
											  }`}
									</button>
									{error && (
										<p className="text-red-500 text-center mt-4 text-sm">
											{error}
										</p>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default Checkout;
