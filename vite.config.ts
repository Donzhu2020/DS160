import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        'content/translation': resolve(__dirname, 'src/content/translation/index.ts'),
        'content/simple-test': resolve(__dirname, 'src/content/simple-translation-test.ts'),
        'background/service-worker': resolve(__dirname, 'src/background/debug-service-worker.ts'),
        'popup/popup': resolve(__dirname, 'src/popup/popup.ts')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    minify: false, // 开发阶段保持可读性
    sourcemap: true,
    copyPublicDir: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'assets')
    }
  },
  publicDir: false
});
