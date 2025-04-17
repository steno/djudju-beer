/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        akhio: ['Akhio', 'sans-serif'],
      },
    },
  },
  plugins: [],
};