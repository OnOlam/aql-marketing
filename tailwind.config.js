/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { bg: '#0a1628', warm: '#f2b84b', coral: '#ee6a58', teal: '#2fd1a8' },
      fontFamily: {
        serif: ['Georgia', '"Times New Roman"', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
