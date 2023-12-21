import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [],
    build: {
        outDir: resolve(__dirname, "dist"),
        rollupOptions: {
            input: resolve(__dirname, "static/index.ts"),
            output: { entryFileNames: "bundle.js" },
        },
    },
});
