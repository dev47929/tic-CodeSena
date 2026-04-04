import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@tensorflow-models/pose-detection': path.resolve(
        __dirname,
        'node_modules/@tensorflow-models/pose-detection/dist/index.js'
      ),
      '@tensorflow/tfjs-backend-webgpu': path.resolve(
        __dirname,
        'src/shims/tfjsWebgpuShim.js'
      ),
    },
  },
  plugins: [react(), tailwindcss()],
})
