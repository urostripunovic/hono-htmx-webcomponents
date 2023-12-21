import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  build: {
    outDir: 'dist',
    outFile: 'bundle.js',
    rollupOptions: {
        input: "static/index.js"
    }
  },
});