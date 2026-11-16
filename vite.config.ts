import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' gera caminhos relativos: o site funciona tanto na raiz de um domínio
// (Vercel, Netlify) quanto em uma subpasta (GitHub Pages: /portfolio/).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        sicapda: resolve(import.meta.dirname, 'sicapda/index.html'),
      },
    },
  },
})
