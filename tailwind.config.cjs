/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neu-primary-neu-light': '#EBF0F3',
        'neu-primary-neu-dark': '#C4D1D9',
        'neu-secondary-neu-light': '#F5E2D9',
        'neu-secondary-neu-dark': '#D9B9A9',
      },
      boxShadow: {
        'neu-light': '0 10px 15px -3px rgba(196, 209, 217, 0.5), 0 4px 6px -2px rgba(196, 209, 217, 0.5)',
        'neu-dark': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}