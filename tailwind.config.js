/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // cubre layout, page y todos los componentes
  ],
  theme: {
    extend: {
      colors: {
        risk: {
          low: "#10b981",
          medium: "#f59e0b",
          high: "#ef4444",
          critical: "#7c2d12",
        },
      },
    },
  },
  plugins: [],
}
