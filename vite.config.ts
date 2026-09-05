import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    cors: true,
    allowedHosts: true
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1000
  }
})
