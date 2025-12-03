import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        // Intelligent code splitting: separate vendor chunks from app code
        // This allows better caching while avoiding too many small chunks
        manualChunks: (id) => {
          // Separate node_modules into vendor chunk
          if (id.includes('node_modules')) {
            // Large libraries get their own chunk
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('react-icons') || id.includes('lucide-react')) {
              return 'icons';
            }
            // Other vendor code
            return 'vendor';
          }
        },
      },
    },
    // Use esbuild for faster minification (default and faster than terser)
    minify: 'esbuild',
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
});
