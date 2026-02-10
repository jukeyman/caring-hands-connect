import pages from "@hono/vite-cloudflare-pages"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    // Client-side React SPA build
    return {
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      build: {
        outDir: 'dist',
        emptyOutDir: false,
        rollupOptions: {
          input: './index.html',
        },
      },
    }
  }

  // Server-side Hono API build (default)
  return {
    plugins: [
      pages({
        entry: './src/index.tsx',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  }
})
