import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — cached separately, rarely changes
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation library — large, split out
          'vendor-framer': ['framer-motion'],
          // Icon library
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // Raise warning threshold slightly since we're intentionally splitting
    chunkSizeWarningLimit: 400,
  },
})
