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
        'white': '#FFFFFF',
        'grey-white': '#F2F4FF',
        'blue': '#3A4374',
        'grey': '#647196',
        'strong-blue': '#4661E6',
      },
    },
  },
  plugins: [],
}