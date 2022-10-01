/** @type {import('tailwindcss').Config} */
const percentageWidth = require('tailwindcss-percentage-width');
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito','serif'],
      },
    },
  },
  plugins: [
    percentageWidth,
  ],
}
