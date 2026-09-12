/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          bg: '#0a0a0c',
          surface: '#131318',
          surface2: '#1a1a21',
          border: '#26262f',
          borderLight: '#32323d',
        },
        brand: {
          blue: '#3b6bdb',
          blueLight: '#5b83e8',
          blueDark: '#2a4fad',
          green: '#22c55e',
          greenDark: '#16a34a',
          gold: '#c9a24b',
          teal: '#0f6d5c',
        },
        ink: {
          primary: '#f5f6f8',
          secondary: '#a6a8b3',
          muted: '#6b6d78',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Cal Sans"', '"Plus Jakarta Sans"', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.02) inset',
        soft: '0 8px 24px rgba(0,0,0,0.35)',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
}
