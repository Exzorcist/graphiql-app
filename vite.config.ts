/// <reference types="vitest" />
import { defineConfig, configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: [...configDefaults.exclude, 'src/types/**'],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/test-setup.ts'],
    passWithNoTests: true,
  },
});
