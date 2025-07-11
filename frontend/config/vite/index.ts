import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig(({ mode }) => {

  const env = loadEnv(
    mode, process.cwd(), ''
  )

  return {
    define: {
      'process.env.API_BASE_URL': JSON.stringify(env.API_BASE_URL)
    },
    plugins: [react(), tailwindcss()],
    base: '/',
    mode,
    build: {
      outDir: 'dist',
      sourcemap: false,
      emptyOutDir: true
    },
    resolve: {
      extensions: ['.ts', '.tsx']
    },
    server:{
      host: '0.0.0.0',
      port: 5050,
      proxy: {
        '/api': 'http://localhost:9000'
      }
    }
  }
})

export default config
