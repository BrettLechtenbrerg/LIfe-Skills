/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8'
        },
        martial: {
          gold: '#fbbf24',
          red: '#dc2626',
          black: '#1f2937'
        }
      },
      fontFamily: {
        'display': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}