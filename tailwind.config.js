/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fff8ec',
        butter: '#ffe2a7',
        carrot: '#f97316',
        tomato: '#ef4444',
        herb: '#16a34a',
        ink: '#2a2118',
      },
      boxShadow: {
        sticker: '0 10px 24px rgba(85, 54, 24, 0.13)',
        soft: '0 22px 60px rgba(82, 48, 18, 0.14)',
        pot: 'inset 0 -24px 48px rgba(83, 50, 20, 0.23), 0 26px 60px rgba(92, 55, 22, 0.22)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
