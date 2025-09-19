import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react"; // O puedes usar un ícono de WhatsApp si lo tienes

function WhatsAppButton() {
	const phoneNumber = "56964355581";
	const message = "Hola, me gustaría cotizar un servicio.";
	const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
		message
	)}`;

	return (
		<a
			href={whatsappLink}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Contactar por WhatsApp"
			className="fixed bottom-8 left-8 z-50"
		>
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{
					type: "spring",
					stiffness: 260,
					damping: 20,
					delay: 1,
				}}
				whileHover={{ scale: 1.1, rotate: 5 }}
				whileTap={{ scale: 0.9 }}
				className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
			>
				<MessageCircle className="w-8 h-8" />
			</motion.div>
		</a>
	);
}

export default WhatsAppButton;
