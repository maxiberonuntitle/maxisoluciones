import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    // Optimizaciones para producción
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild', // Usar esbuild en lugar de terser
    rollupOptions: {
      output: {
        // Separar chunks para mejor caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          icons: ['lucide-react']
        }
      }
    }
  },
  // Configuración para el dominio personalizado
  base: '/',
  preview: {
    port: 4173,
    host: true
  }
})
