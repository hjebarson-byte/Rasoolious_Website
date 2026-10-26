/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6F0',
          200: '#F5ECE1',
          300: '#EBDDC9',
          400: '#DEC9B0',
        },
        chocolate: {
          100: '#F2ECE9',
          200: '#D9C8BF',
          300: '#B89B8C',
          400: '#8C6752',
          500: '#5C3A28',
          600: '#482C1E',
          700: '#3D2314',
          800: '#2C1810',
          900: '#1C100B',
          950: '#120A06',
        },
        caramel: {
          100: '#FDF4EB',
          200: '#F7E2CD',
          300: '#ECC59F',
          400: '#DDA15E',
          500: '#C68037',
          600: '#A46322',
        },
        terracotta: {
          500: '#C4622D',
          600: '#A84D1E',
        },
        warmwhite: '#FFFDF9',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(44, 24, 16, 0.05)',
        'soft': '0 6px 20px -4px rgba(44, 24, 16, 0.07)',
        'soft-lg': '0 12px 32px -6px rgba(44, 24, 16, 0.1)',
        'card': '0 4px 16px 0 rgba(44, 24, 16, 0.06)',
        'card-hover': '0 16px 36px -4px rgba(44, 24, 16, 0.12)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
