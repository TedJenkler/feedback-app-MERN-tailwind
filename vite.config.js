import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost', // Specify the host
    port: 3000, // Specify the port
  },
  plugins: [react()],
})
