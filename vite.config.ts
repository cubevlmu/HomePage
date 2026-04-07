import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'es2022',
    minify: true,
    cssMinify: 'lightningcss',
    reportCompressedSize: true,
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@fortawesome')) {
              return 'vendor-fontawesome'
            }

            if (id.includes('vue') || id.includes('vue-router')) {
              return 'vendor-vue'
            }

            if (id.includes('markdown-it')) {
              return 'vendor-markdown'
            }

            return 'vendor'
          }
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
