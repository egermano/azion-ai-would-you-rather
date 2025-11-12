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
        'surface-dark': '#1c1c1c',
        'surface-dark-card': '#2a2a2a',
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
