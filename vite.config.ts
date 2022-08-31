import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        solidPlugin(),
        viteStaticCopy({
            targets: [
                {
                    src: './src/dual-n-back/assets/sounds',
                    dest: 'assets',
                },
            ],
        }),
    ],
    server: {
        port: 3000,
    },
    build: {
        target: 'esnext',
    },
    base: './',
});
