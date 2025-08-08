import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  base: '/github-topics-explorer/', // 替换为你的仓库名
  build: {
    outDir: 'dist'
  }
}) 