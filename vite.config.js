import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      injectRegister: 'script',
      registerType: 'autoUpdate',
      manifest: false,
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,json,ico,png,webp,woff2}']
      }
    })
  ],
  build: {
    cssMinify: false
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
