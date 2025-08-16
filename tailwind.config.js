/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // cubre app, layout, page y subcarpetas
    "./types/**/*.{js,ts,jsx,tsx,mdx}", // si usas tsx en types (opcional)
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
};
