/** @type {import('tailwindcss').Config} */
import tailwindAnimate from 'tailwindcss-animate';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'editor-primary': 'rgb(var(--editor-primary-color) / <alpha-value>)',
        'editor-secondary': 'rgb(var(--editor-secondary-color) / <alpha-value>)',
        'editor-border': 'rgb(var(--editor-border-color) / <alpha-value>)',
        'editor-accent': 'rgb(var(--editor-accent-color) / <alpha-value>)',
        'editor-accent-light': 'rgb(var(--editor-accent-light-color) / <alpha-value>)',
        'editor-ring': 'rgb(var(--editor-ring) / <alpha-value>)',
      },
    },
  },
  plugins: [tailwindAnimate],
};
