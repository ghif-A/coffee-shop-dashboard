import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const API_ENDPOINT = 'https://coffee-shop-dashboard-backend.onrender.com'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/products': API_ENDPOINT,
      '/dailysales': API_ENDPOINT,
      '/dailyspoilage': API_ENDPOINT,
      '/productcategorysales': API_ENDPOINT,
    }
  }
})
