/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
        // CRM Dashboard color scheme
        crm: {
          // Background colors
          background: "#121212",
          card: "#1E1E1E",
          secondary: "#2A2A2A",
          
          // Accent colors
          primary: "#7C5DFA",
          "primary-hover": "#6C4AE0",
          accent: "#FF8A65",
          
          // Status colors
          success: "#4CAF50",
          warning: "#FF9800",
          error: "#FF5252",
          pending: "#FF9800",
          "in-progress": "#7C5DFA",
          overdue: "#FF5252",
          
          // Text colors
          text: "#FFFFFF",
          "text-secondary": "#A0A0A0",
          "text-muted": "#6E6E6E",
        },
      },
      borderColor: {
        DEFAULT: "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
