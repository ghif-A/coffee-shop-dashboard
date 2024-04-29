import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/products': 'http://localhost:9000',
      '/dailysales': 'http://localhost:9000',
      '/dailyspoilage': 'http://localhost:9000',
      '/productcategorysales': 'http://localhost:9000',
    }
  }
})
