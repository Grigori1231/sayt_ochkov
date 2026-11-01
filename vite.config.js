import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    minify: 'terser',
    target: 'es2015'
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
      polyfills: true,
    })
  ]
});