import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

export default defineConfig(() => ({
  server: {
    port: 9000,
    allowedHosts: ['https://localhost:5050']
  },
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/lib',
  plugins: [dts({
    entryRoot: 'src', tsconfigPath: path.join(__dirname, 'tsconfig.lib.json')
  })],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  resolve: {
    alias: {
      path: 'rollup-plugin-node-polyfills/polyfills/path',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
      events: 'rollup-plugin-node-polyfills/polyfills/events',
      https: 'rollup-plugin-node-polyfills/polyfills/http',
      url: 'rollup-plugin-node-polyfills/polyfills/url',
      querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
      _stream_readable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
      os: 'rollup-plugin-node-polyfills/polyfills/os'
    }
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [
        '../node_modules/csv-parse/lib/index.js',
        '../node_modules/rollup-plugin-node-polyfills/polyfills/buffer-es6.js',
        '../node_modules/rollup-plugin-node-polyfills/polyfills/browserify-fs.js',
        '../node_modules/string_decoder/lib/string_decoder.js',
        '../node_modules/mongoose/dist/browser.umd.js',
        '../node_modules/express/index.js',
        '../node_modules/config/lib/config.js',
        '../node_modules/passport/lib/index.js',
        '../node_modules/passport-google-oauth20/lib/index.js',
        '../node_modules/cookie-session/index.js',
        '../node_modules/morgan/index.js'
      ]
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: './src/server.ts',
      name: '@self/backend',
      fileName: 'server',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es' as const]
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [],
      plugins: [
        rollupNodePolyFill
      ]
    }
  }
}))
