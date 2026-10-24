/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-cherry': '#17090F',
        'noir-wine': '#210B15',
        'dark-burgundy': '#2B101D',
        'imperial-burgundy': '#421522',
        'royal-bordeaux': '#702638',
        'spiced-wine': '#8A3948',
        'gilded-gold': '#C5A15A',
        'antique-ochre': '#98743C',
        'sunlit-champagne': '#D8C6A1',
        'alabaster': '#F0E7D5',
        'dusty-rose': '#A38A8C',

        // Legacy compatibility aliases
        lacquer: '#17090F',
        felt: {
          DEFAULT: '#2B101D',
          2: '#421522'
        },
        ivory: {
          DEFAULT: '#F0E7D5',
          dim: '#A38A8C',
          faint: 'rgba(163, 138, 140, 0.22)'
        },
        brass: {
          DEFAULT: '#C5A15A',
          deep: '#98743C',
          faint: 'rgba(197, 161, 90, 0.28)'
        },
        oxblood: '#702638',
        ink: '#17090F',
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'Didot', '"Bodoni 72"', 'serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        maxWrap: '1240px',
      }
    },
  },
  plugins: [],
}
