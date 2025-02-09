import { defineConfig, loadEnv } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [preact()],
    build: {
      outDir: "../backend/public",
      emptyOutDir: false,
    },
    define: {
      'WS_URL': env.RAILWAY_TCP_PROXY_DOMAIN ? `wss://${env.RAILWAY_TCP_PROXY_DOMAIN}:${RAILWAY_TCP_PROXY_PORT}` : `wss://${location.host}:8080`,
    },
  }
})
