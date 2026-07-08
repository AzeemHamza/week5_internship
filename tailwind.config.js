/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0f172a', // darkest background
          800: '#1e293b', // card background
          700: '#334155', // borders/separators
          600: '#475569', // muted text
          500: '#64748b', // placeholders
        },
      },
    },
  },
  plugins: [],
};