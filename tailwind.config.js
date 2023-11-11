const theme = require('tailwindcss/defaultTheme.js')
const colors = require('tailwindcss/colors.js')

const primary = colors.stone
const danger = colors.red

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary,
        danger
      },
      textColor: {
        primary: {
          DEFAULT: primary[600],
          header: primary[900],
          subheader: primary[700],
          muted: primary[400]
        },
        danger: {
          DEFAULT: danger[400]
        }
      },
      ringColor: {
        primary: {
          DEFAULT: primary[300]
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...theme.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...theme.fontFamily.mono]
      },
      animation: {
        'fade-in': 'fade-in 150ms var(--animation-delay, 0ms) linear forwards',
        'slide-up': 'slide-up 150ms var(--animation-delay, 0ms) linear forwards',
        'fade-up': 'fade-in 150ms var(--animation-delay, 0ms) linear forwards, slide-up 150ms var(--animation-delay, 0ms) linear forwards',
        'fade-grow': 'fade-in 150ms var(--animation-delay, 0ms) linear forwards, grow 150ms var(--animation-delay, 0ms) linear forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 100 }
        },
        'slide-up': {
          '0%': { transform: 'translateY(10%)' },
          '100%': { transform: 'translateY(0)' }
        },
        'grow': {
          '0%': { transform: 'scale(90%)' },
          '100%': { transform: 'scale(100%)' }
        }
      }
    },
  },
  plugins: [],
}
