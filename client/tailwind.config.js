/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0f172a", // Dark Blue
                secondary: "#1e293b", // Slate
                accent: "#3b82f6", // Blue
                gold: "#fbbf24", // Gold for premium look
                glass: "rgba(255, 255, 255, 0.05)",
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'premium-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            }
        },
    },
    plugins: [],
}
