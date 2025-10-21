/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.08)',
      },
      colors: {
        brand: {
          DEFAULT: '#5746ea',
          soft: '#eef0ff'
        }
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    },
  },
  plugins: [],
}
