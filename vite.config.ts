import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'spa-404-fallback',
      apply: 'build',
      closeBundle() {
        const src = resolve('dist/index.html')
        const dest = resolve('dist/404.html')
        if (existsSync(src)) {
          copyFileSync(src, dest)
        }
      },
    },
  ],
})
