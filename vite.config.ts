import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure this matches the base URL of your app (adjust for subdirectory deployments)
  resolve: {
    alias: {
      '@': '/src', // Use '@' as a shortcut for '/src'
    },
  },
  build: {
    rollupOptions: {
      // Optional: Fine-tune Rollup options for chunk splitting or other optimizations
      output: {
        manualChunks: undefined,
      },
    },
  },
});
