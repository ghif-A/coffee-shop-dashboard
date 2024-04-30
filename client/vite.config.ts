import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { API_ENDPOINT } from './config.local';

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
