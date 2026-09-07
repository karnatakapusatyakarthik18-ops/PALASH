/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palash: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          flame: '#d84315',
          deep: '#bf360c'
        },
        tribal: {
          forest: '#1b4332',
          emerald: '#2d6a4f',
          earth: '#8b5a2b',
          ochre: '#c68b59',
          terracotta: '#a04000',
          sand: '#fdfbf7',
          charcoal: '#212529'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        olchiki: ['"Noto Sans Ol Chiki"', '"Nirmala UI"', 'system-ui', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', '"Nirmala UI"', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
