import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

// Scroll to top button
export const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.pageYOffset > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<motion.button
			className={`fixed bottom-8 right-8 z-50 bg-gradient-to-r from-primary to-accent text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
				isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
			}`}
			onClick={scrollToTop}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: isVisible ? 1 : 0 }}
			transition={{ duration: 0.3 }}
		>
			<ArrowUp className="w-6 h-6" />
		</motion.button>
	);
};

// Parallax background elements
export const ParallaxBackground = () => {
	const { scrollYProgress } = useScroll();
	const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
	const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
	const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);

	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden">
			<motion.div
				className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
				style={{ y: y1 }}
			/>
			<motion.div
				className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
				style={{ y: y2 }}
			/>
			<motion.div
				className="absolute bottom-20 left-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
				style={{ y: y3 }}
			/>
		</div>
	);
};

// Loading animation
export const LoadingSpinner = () => {
	return (
		<div className="flex items-center justify-center">
			<motion.div
				className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			/>
		</div>
	);
};

// Animated counter
export const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		let startTime;
		let animationFrame;

		const animate = (timestamp) => {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

			setCount(Math.floor(progress * end));

			if (progress < 1) {
				animationFrame = requestAnimationFrame(animate);
			}
		};

		animationFrame = requestAnimationFrame(animate);

		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	}, [end, duration]);

	return (
		<span>
			{count}
			{suffix}
		</span>
	);
};

// Floating action button for contact
export const FloatingContactButton = () => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			className="fixed bottom-8 left-8 z-50"
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
		>
			<motion.button
				className="bg-gradient-to-r from-success to-primary text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
				onHoverStart={() => setIsHovered(true)}
				onHoverEnd={() => setIsHovered(false)}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				<motion.div
					className="w-3 h-3 bg-lime-400 rounded-full"
					animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
					transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
				/>
				<span className="font-medium">Chat en vivo</span>
			</motion.button>
		</motion.div>
	);
};

// Progress bar for page scroll
export const ScrollProgress = () => {
	const { scrollYProgress } = useScroll();

	return (
		<motion.div
			className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-50 origin-left"
			style={{ scaleX: scrollYProgress }}
		/>
	);
};

// Reveal animation wrapper
export const RevealOnScroll = ({ children, delay = 0 }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ duration: 0.6, delay }}
		>
			{children}
		</motion.div>
	);
};
