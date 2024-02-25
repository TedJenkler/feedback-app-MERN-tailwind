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
        'grey-white2': '#F7F8FD',
        'blue': '#3A4374',
        'grey': '#647196',
        'strong-blue': '#4661E6',
        'dark-blue': '#373F68',
        'purple': '#AD1FEA',
        'red': '#D73737',
      },
    },
  },
  plugins: [],
}