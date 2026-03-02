/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#f8fafc", // Slate 50 (Off-white)
                secondary: "#ffffff", // Pure White
                accent: "#3b82f6", // Blue
                gold: "#fbbf24", // Gold for premium look
                glass: "rgba(0, 0, 0, 0.05)", // Darker tint for light mode glass
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'premium-gradient': 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', // Subtle light slate gradient
            }
        },
    },
    plugins: [],
}
