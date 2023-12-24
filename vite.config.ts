import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        require('autoprefixer'),
        require('tailwindcss'), 
    ],
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'static/index.ts')
            },
            output: {
                entryFileNames: 'bundle.js',
                assetFileNames: "index.css",
            },
            external: ['static/assets/test.module.css']
        }
    },
});
