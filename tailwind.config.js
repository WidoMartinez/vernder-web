/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				marquee: "marquee 30s linear infinite",
			},
			keyframes: {
				marquee: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(calc(-100% * 4))" },
				},
			},
			colors: {
				// Paleta de colores Otoñal
				background: "#2a1d1d", // Marrón oscuro terroso
				card: "#402f2f", // Marrón medio
				secondary: "#574040", // Marrón un poco más claro

				// Colores de acento
				primary: "#d97706", // Naranja cálido (amber-600)
				"primary-hover": "#b45309", // Naranja más oscuro (amber-700)
				accent: "#f59e0b", // Amarillo dorado (amber-500)

				// Colores de estado (adaptados)
				success: "#65a30d", // Verde oliva (lime-600)
				warning: "#f59e0b", // Amarillo dorado (amber-500)
				error: "#dc2626", // Rojo cálido (red-600)
				pending: "#f59e0b", // Amarillo dorado (amber-500)
				"in-progress": "#d97706", // Naranja cálido (amber-600)
				overdue: "#dc2626", // Rojo cálido (red-600)

				// Colores de texto
				text: "#f3f4f6", // Blanco cálido (gray-100)
				"text-secondary": "#a8a29e", // Gris/marrón claro (stone-400)
				"text-muted": "#78716c", // Gris/marrón medio (stone-500)
			},
			borderColor: {
				DEFAULT: "rgba(255, 255, 255, 0.1)",
			},
			fontFamily: {
				sans: ["Manrope", "sans-serif"],
			},
		},
	},
	plugins: [],
};
