/** @type {import('tailwindcss').Config} */
import tailwindAnimate from 'tailwindcss-animate';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'editor-font-family': 'var(--editor-font-family)',
        mono: 'var(--font-mono)',
        sans: 'var(--font-sans)',
      },
      colors: {
        main: {
          DEFAULT: '#d60590',
        },
        'editor-primary': 'rgb(var(--editor-primary-color) / <alpha-value>)',
        'editor-secondary': 'rgb(var(--editor-secondary-color) / <alpha-value>)',
        'editor-border': 'rgb(var(--editor-border-color) / <alpha-value>)',
        'editor-accent': 'rgb(var(--editor-accent-color) / <alpha-value>)',
        'editor-accent-light': 'rgb(var(--editor-accent-light-color) / <alpha-value>)',
        'editor-ring': 'rgb(var(--editor-ring) / <alpha-value>)',
        'editor-text-color': 'rgb(var(--editor-text-color) / <alpha-value>)',
        'editor-line-numbers-color': 'rgb(var(--editor-line-numbers-color) / <alpha-value>)',
        'editor-code-selection': 'rgb(var(--editor-code-selection-color) / <alpha-value>)',
      },
    },
  },
  plugins: [tailwindAnimate],
};
