import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api/n8n-chat': {
          target: 'https://godiyadeepika.app.n8n.cloud',
          changeOrigin: true,
          secure: true,
          rewrite: () => '/webhook/15c252a3-0ad0-405f-bc58-ee7ba4a2f74a/chat',
        },
        '/api/n8n-chat-test': {
          target: 'https://godiyadeepika.app.n8n.cloud',
          changeOrigin: true,
          secure: true,
          rewrite: () => '/webhook-test/15c252a3-0ad0-405f-bc58-ee7ba4a2f74a/chat',
        },
      },
    },
  };
});
