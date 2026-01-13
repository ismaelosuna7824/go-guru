import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-helmet-async'],
          'vendor-firebase': ['firebase/app', 'firebase/analytics'],
          // 'data-topics': ['/src/data/topics.js']
        }
      }
    }
  }
})
