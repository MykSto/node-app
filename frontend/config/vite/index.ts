import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

const certPath =path.join(__dirname, '../../../certs/')

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
      port: 5050,
      proxy: {
        '/api': {
          target: 'https://localhost:9000',
          changeOrigin: true,
          secure: false,
          cookiePathRewrite: {
            '*': '/'
          }
        }
      },
      https: {
        cert: fs.readFileSync(`${certPath}cert.pem`),
        key: fs.readFileSync(`${certPath}key.pem`)
      }
    }
  }
})

export default config
