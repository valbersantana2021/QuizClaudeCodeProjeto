/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F5F0E8',
          primary: '#D97706',
          'primary-hover': '#B45309',
          text: '#1C1917',
          secondary: '#78716C',
          success: '#16A34A',
          error: '#DC2626',
          card: '#FFFFFF',
          border: '#E7E5E4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
