/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'text-dark': '#2E2A3E',
        'text-light': '#F4F0F2',
        'primary': '#F3652B',
        'secondary': '#2E2A3E',
        'neutral': '#CBC7CB',
        'surface-light': '#F4F0F2',
        'surface-dark': '#2E2A3E',
        'surface-dark-card': '#3A3548',
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
