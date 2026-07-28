import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const buildDate = new Date().toISOString().split('T')[0];

export default defineConfig({
  base: '/dx2_fusion/',
  plugins: [vue(), vueDevTools()],
  define: {
    __BUILD_DATE__: JSON.stringify(buildDate)
  },
  publicDir: 'public',
  build: {
    outDir: 'dist'
  },
  test: {
    environment: 'jsdom'
  }
})
