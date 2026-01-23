import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './src/manifest.config.ts'
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        crx({ manifest })
    ],
    build: {
        cssCodeSplit: false
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/theme/variables.scss" as *;`,
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})
