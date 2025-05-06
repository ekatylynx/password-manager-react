import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  },
  optimizeDeps: {
    exclude: ['react-devtools']
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
