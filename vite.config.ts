import { resolve } from 'path';
import { defineConfig } from 'vite';
import ViteRestart from 'vite-plugin-restart';
import devServer from '@hono/vite-dev-server';

export default defineConfig({
    plugins: [
        devServer({
            entry: 'src/index.tsx', // The file path of your application.
        }),
        ViteRestart({
            restart: ['src/static/**/*'], //react to all changes for all files
        }),
    ],
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/static/index.ts'),
            },
            output: {
                entryFileNames: 'bundle.js',
                assetFileNames: 'index.css',
            },
        },
        sourcemap: 'inline',
    },
});
