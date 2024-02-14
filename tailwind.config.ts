import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '475px',
        ...defaultTheme.screens,
      },
      colors: {
        purlue: { DEFAULT: '#6A4DFF', dark: '#9782ff' },
        fire: { DEFAULT: '#E45758', dark: '#e76869' },
        active: { DEFAULT: '#5bce90', dark: '#7cd8a6' },
      },
      animation: {
        alertTimerScale: 'timerS 5s linear',
        alertBody: 'timerF 5s linear forwards, popup 500ms ease forwards',
      },
      keyframes: {
        timerS: {
          '0%': { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0)' },
        },
        timerF: {
          '85%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        popup: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(16px)' },
        },
      },
    },
  },
  plugins: [require('tailwind-children')],
};

export default config;
