import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

const apiTarget =
  process.env.VITE_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://annatation-backend.onrender.com'
    : 'http://localhost:5000');

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
        secure: false,
      },
      '/files': {
        target: apiTarget,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    include: ['react-window'],
  },
  build: {
    commonjsOptions: {
      include: [/react-window/, /node_modules/],
    },
  },
});
