import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

function copyStaticDataForPages() {
  return {
    name: 'copy-static-data-for-pages',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      if (!fs.existsSync(distDir)) return;

      // Ensure .nojekyll exists for GitHub Pages
      fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf-8');

      // Copy data/db.json -> dist/data/db.json so static hosting has the latest database state
      const srcDb = path.resolve(process.cwd(), 'data', 'db.json');
      if (fs.existsSync(srcDb)) {
        const destDataDir = path.join(distDir, 'data');
        fs.mkdirSync(destDataDir, { recursive: true });
        fs.copyFileSync(srcDb, path.join(destDataDir, 'db.json'));
      }

      // Copy uploads/ -> dist/uploads/ so static hosting serves all uploaded photos
      const srcUploads = path.resolve(process.cwd(), 'uploads');
      if (fs.existsSync(srcUploads)) {
        const destUploads = path.join(distDir, 'uploads');
        fs.mkdirSync(destUploads, { recursive: true });
        for (const file of fs.readdirSync(srcUploads)) {
          const srcFile = path.join(srcUploads, file);
          if (fs.statSync(srcFile).isFile()) {
            fs.copyFileSync(srcFile, path.join(destUploads, file));
          }
        }
      }
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), copyStaticDataForPages()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
