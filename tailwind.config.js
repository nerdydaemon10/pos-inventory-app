/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'selector', // enable dark mode by '.dark'
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-primeui')]
}