/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-blue': '#28A7ED',
        'gradient-purple': '#A337F6',
        'gradient-red': '#E84D70',
      },
    },
  },
  plugins: [],
}