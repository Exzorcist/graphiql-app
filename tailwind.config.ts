/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'editor-primary': 'var(--editor-primary-color)',
        'editor-border': 'var(--editor-border-color)',
        'editor-right-pane': 'var(--editor-right-pane-color)',
      },
    },
  },
  plugins: [],
};
