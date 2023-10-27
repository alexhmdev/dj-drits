/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: true,
  theme: {
    extend: {
      colors: {
        primary: '#F6019D',
        secondary: '#2DE2E6',
        tertiary: '#F9C80E',
        synthwave: '#261447',
      },
    },
  },
  plugins: [],
};
