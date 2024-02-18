import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cors from 'cors';
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation'

// https://vitejs.dev/config/
export default {
  plugins: [
    [react()],
    crossOriginIsolation(), 
  ],
  server: {
    middleware: [
      cors({ origin: '*',}), // Enable CORS middleware
    ],
  },
}