import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redireciona todas as requisições para '/sessions' para o backend na porta 8080
      '/sessions': 'http://localhost:8080'
    }
  }
})
