/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#31def5',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
