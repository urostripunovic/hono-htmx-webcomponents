import { resolve } from 'path';
import { defineConfig } from 'vite';
import ViteRestart from 'vite-plugin-restart';
import devServer from '@hono/vite-dev-server';

export default defineConfig({
    plugins: [
        devServer({ entry: 'src/index.tsx' }), // The file path of your application. 
        ViteRestart({ restart: ['src/static/**/*'] }), //refresh the browser when any of the files in this root changes
        /*{
            name: 'components' //These are the island code components that will be loaded in, they are named after components but island is better 
        },*/
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
        emptyOutDir: false,
        copyPublicDir: false,
    },
});
