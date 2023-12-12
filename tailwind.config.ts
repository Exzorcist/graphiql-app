/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'editor-primary': 'var(--editor-primary-color)',
        'editor-secondary': 'var(--editor-secondary-color)',
        'editor-border': 'var(--editor-border-color)',
      },
    },
  },
  plugins: [],
};
