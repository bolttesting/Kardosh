import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: true,
      port: 5173,
      strictPort: false,
      proxy: {
        // Keeps Reelly API key server-side during local dev
        // @see https://docs.reelly.ai/docs/reelly-api-v20-getting-started
        '/api/reelly': {
          target: 'https://api-reelly.up.railway.app',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/reelly/, '/api/v2/clients'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (env.REELLY_API_KEY) {
                proxyReq.setHeader('X-API-Key', env.REELLY_API_KEY)
              }
            })
          },
        },
      },
    },
  }
})
