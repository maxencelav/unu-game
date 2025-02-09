import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig(({mode}) => {

  return {
    plugins: [preact()],
    build: {
      outDir: "../backend/public",
      emptyOutDir: false,
    },
    define: {
      // access RAILWAY_TCP_PROXY_DOMAIN  & RAILWAY_TCP_PROXY_PORT
      'WS_URL': process.env.RAILWAY_TCP_PROXY_DOMAIN ? `ws://${process.env.RAILWAY_TCP_PROXY_DOMAIN}:${process.env.RAILWAY_TCP_PROXY_PORT}` : 'ws://localhost:8080',
    },
  }
})
