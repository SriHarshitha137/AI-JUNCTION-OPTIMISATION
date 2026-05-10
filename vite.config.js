import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'lucide-react': fileURLToPath(new URL('./src/components/icons.jsx', import.meta.url)),
      'framer-motion': fileURLToPath(new URL('./src/components/motion.jsx', import.meta.url)),
    },
  },
});
