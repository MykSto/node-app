import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = {
  plugins: [react(), tailwindcss()],
  base: '/',
  mode: 'development',
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
} satisfies UserConfig

export default config
