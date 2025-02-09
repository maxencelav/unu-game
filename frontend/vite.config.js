import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    outDir: "../backend/public",
    emptyOutDir: false,
  },
  define: {
    'import.meta.env.VITE_WS_URL': JSON.stringify(process.env.VITE_WS_URL),
  },
})
