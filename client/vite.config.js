import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',   // bind to all interfaces so Docker can expose it
    port: 5173,
    strictPort: true,   // fail fast if port is already taken
  },
})
