import { useState, useEffect, useRef } from "react"; // 1. Importar useRef
import { motion } from "framer-motion";
import {
	CheckCircle,
	Loader,
	Send,
	XCircle,
	AlertCircle,
	RefreshCw,
} from "lucide-react";

const PostPaymentForm = () => {
	const [paymentStatus, setPaymentStatus] = useState("loading");
	const [paymentData, setPaymentData] = useState(null);
	const [transactionId, setTransactionId] = useState(null);
	const [formData, setFormData] = useState({
		companyName: "",
		socialMedia: "",
		colors: "",
		references: "",
		content: "",
	});
	const [formStatus, setFormStatus] = useState("idle");
	const [retryCount, setRetryCount] = useState(0);

	// 2. Usar useRef para evitar que el evento se dispare múltiples veces
	const conversionSentRef = useRef(false);

	// Función para el seguimiento de conversiones de Google Ads
	const trackConversion = (data) => {
		if (typeof gtag === "function" && data) {
			gtag("event", "conversion", {
				send_to: "AW-17566977229/6cctCNTo2J0bEM2Zy7hB",
				value: data.amount || 1.0, // Usar el valor real de la transacción
				currency: "CLP",
				transaction_id: data.transactionId, // Usar el ID de transacción único
			});
			console.log("✅ Conversión de compra registrada:", data);
		}
	};

	const verifyPayment = async (txnId) => {
		try {
			const backendUrl =
				import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
			const response = await fetch(`${backendUrl}/verify-payment/${txnId}`);

			if (!response.ok) {
				throw new Error(
					response.status === 404
						? "Transacción no encontrada"
						: "Error al verificar el pago"
				);
			}

			const data = await response.json();
			setPaymentData(data);

			const status = data.status;
			if (status === "approved" || status === "paid" || status === 2) {
				setPaymentStatus("success");
				// 3. Disparar el evento solo si es exitoso y no se ha enviado antes
				if (!conversionSentRef.current) {
					trackConversion(data);
					conversionSentRef.current = true;
				}
			} else if (
				status === "rejected" ||
				status === "cancelled" ||
				status === "failed" ||
				status === 3
			) {
				setPaymentStatus("failed");
			} else {
				setPaymentStatus("pending");
			}
		} catch (error) {
			console.error("Error verificando pago:", error);
			setPaymentStatus("error");
		}
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const txnId = urlParams.get("txn");

		if (txnId) {
			setTransactionId(txnId);
			verifyPayment(txnId);
		} else {
			setPaymentStatus("error");
		}
	}, []);

	useEffect(() => {
		if (paymentStatus === "pending" && transactionId && retryCount < 5) {
			const timer = setTimeout(() => {
				setRetryCount((prev) => prev + 1);
				verifyPayment(transactionId);
			}, 10000);

			return () => clearTimeout(timer);
		}
	}, [paymentStatus, transactionId, retryCount]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormStatus("loading");

		try {
			const dataToSend = {
				subject: `Nuevos Detalles de Proyecto para: ${formData.companyName}`,
				data: {
					...formData,
					paymentInfo: paymentData
						? {
								transactionId: paymentData.transactionId,
								gateway: paymentData.gateway,
								amount: paymentData.amount,
								status: paymentData.status,
						  }
						: null,
				},
			};

			const response = await fetch("/api/send_project_details.php", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(dataToSend),
			});

			if (!response.ok) {
				throw new Error("Error en el servidor al enviar los detalles.");
			}

			setFormStatus("success");
		} catch (error) {
			console.error("Error al enviar el formulario:", error);
			setFormStatus("error");
		}
	};

	const handleRetryVerification = () => {
		if (transactionId) {
			setPaymentStatus("loading");
			setRetryCount(0);
			verifyPayment(transactionId);
		}
	};

	const renderPaymentStatus = () => {
		switch (paymentStatus) {
			case "loading":
				return (
					<div className="text-center py-12">
						<Loader className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Verificando tu pago...
						</h1>
						<p className="text-xl text-text-secondary">
							Por favor espera mientras confirmamos el estado de tu transacción.
						</p>
					</div>
				);

			case "success":
				return (
					<div className="text-center mb-12">
						<CheckCircle className="w-20 h-20 text-success mx-auto mb-4" />
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							¡Tu pago ha sido exitoso!
						</h1>
						<p className="text-xl text-text-secondary mb-4">
							Ahora, el último paso. Completa el siguiente formulario para que
							podamos comenzar a construir tu sitio web.
						</p>
						{paymentData && (
							<div className="bg-card rounded-lg p-4 mb-6 text-sm">
								<p>
									<strong>ID de Transacción:</strong>{" "}
									{paymentData.transactionId}
								</p>
								<p>
									<strong>Monto:</strong> ${paymentData.amount} CLP
								</p>
								<p>
									<strong>Pasarela:</strong> {paymentData.gateway}
								</p>
							</div>
						)}
					</div>
				);

			case "pending":
				return (
					<div className="text-center py-12">
						<AlertCircle className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Tu pago está siendo procesado
						</h1>
						<p className="text-xl text-text-secondary mb-6">
							Tu pago está pendiente de confirmación. Esto puede tomar unos
							minutos. Estamos verificando automáticamente el estado.
						</p>
						{retryCount > 0 && (
							<p className="text-sm text-text-muted mb-4">
								Verificación {retryCount}/5 - Siguiente verificación en 10
								segundos
							</p>
						)}
						<button
							onClick={handleRetryVerification}
							className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"
						>
							<RefreshCw className="w-4 h-4" />
							Verificar ahora
						</button>
					</div>
				);

			case "failed":
				return (
					<div className="text-center py-12">
						<XCircle className="w-20 h-20 text-error mx-auto mb-4" />
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Hubo un problema con el pago
						</h1>
						<p className="text-xl text-text-secondary mb-6">
							Tu pago no pudo ser procesado. Por favor, verifica con tu banco o
							intenta con otro método de pago.
						</p>
						{paymentData && paymentData.statusDetail && (
							<div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
								<p className="text-sm">
									<strong>Detalle:</strong> {paymentData.statusDetail}
								</p>
							</div>
						)}
						<div className="space-y-4">
							<button
								onClick={handleRetryVerification}
								className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"
							>
								<RefreshCw className="w-4 h-4" />
								Verificar nuevamente
							</button>
							<p className="text-sm text-text-muted">
								Si el problema persiste, contáctanos a través de nuestro email
								de soporte.
							</p>
						</div>
					</div>
				);

			case "error":
			default:
				return (
					<div className="text-center py-12">
						<XCircle className="w-20 h-20 text-error mx-auto mb-4" />
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Error al verificar el pago
						</h1>
						<p className="text-xl text-text-secondary mb-6">
							No pudimos verificar el estado de tu pago. Por favor, contáctanos
							con los detalles de tu transacción.
						</p>
						<button
							onClick={handleRetryVerification}
							className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"
						>
							<RefreshCw className="w-4 h-4" />
							Intentar nuevamente
						</button>
					</div>
				);
		}
	};

	const renderForm = () => {
		if (formStatus === "success") {
			return (
				<div className="text-center py-12">
					<CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
					<h3 className="text-2xl font-bold mb-2">¡Información recibida!</h3>
					<p className="text-text-secondary">
						Gracias por enviarnos los detalles. Nos pondremos a trabajar en tu
						proyecto y te contactaremos a la brevedad.
					</p>
				</div>
			);
		}

		if (formStatus === "error") {
			return (
				<div className="text-center py-12">
					<XCircle className="w-16 h-16 text-error mx-auto mb-4" />
					<h3 className="text-2xl font-bold mb-2">Hubo un error.</h3>
					<p className="text-text-secondary mb-4">
						No pudimos recibir tu información. Por favor, contáctanos
						directamente a nuestro email.
					</p>
					<button
						onClick={() => setFormStatus("idle")}
						className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg"
					>
						Intentar nuevamente
					</button>
				</div>
			);
		}

		return (
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<input
						name="companyName"
						onChange={handleChange}
						placeholder="Nombre de tu negocio o marca *"
						required
						className="form-input"
					/>
					<input
						name="socialMedia"
						onChange={handleChange}
						placeholder="Links a tus redes sociales (Instagram, etc.)"
						className="form-input"
					/>
				</div>
				<div>
					<textarea
						name="colors"
						onChange={handleChange}
						placeholder="¿Qué colores representan a tu marca? (Ej: azul marino, dorado, blanco)"
						className="form-input"
						rows="2"
					></textarea>
				</div>
				<div>
					<textarea
						name="references"
						onChange={handleChange}
						placeholder="¿Hay alguna página web que te guste? Déjanos los links aquí."
						className="form-input"
						rows="2"
					></textarea>
				</div>
				<div>
					<textarea
						name="content"
						onChange={handleChange}
						placeholder="Escribe aquí los textos principales para tu web (quiénes somos, servicios, etc.) *"
						required
						className="form-input"
						rows="6"
					></textarea>
				</div>
				<p className="text-xs text-text-muted">
					Si tienes un logo o imágenes, puedes enviárnoslas respondiendo al
					correo de confirmación que recibiste.
				</p>
				<motion.button
					type="submit"
					disabled={formStatus === "loading"}
					className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-primary text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
					whileHover={{ scale: formStatus === "loading" ? 1 : 1.02 }}
					whileTap={{ scale: formStatus === "loading" ? 1 : 0.98 }}
				>
					{formStatus === "loading" ? (
						<Loader className="animate-spin" />
					) : (
						<Send />
					)}
					{formStatus === "loading"
						? "Enviando Información..."
						: "Enviar y Finalizar"}
				</motion.button>
			</form>
		);
	};

	return (
		<div className="min-h-screen bg-background text-text py-20 px-4">
			<style>{`.form-input { width: 100%; padding: 12px; background-color: #402f2f; border: 1px solid #574040; border-radius: 8px; color: #f3f4f6; }`}</style>
			<div className="max-w-4xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{renderPaymentStatus()}
				</motion.div>

				{paymentStatus === "success" && (
					<motion.div
						className="bg-card rounded-2xl p-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
					>
						{renderForm()}
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default PostPaymentForm;
