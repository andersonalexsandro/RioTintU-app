import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // o Vite serve e compila a partir da pasta src
  build: {
    outDir: '../dist', // saída do build
    emptyOutDir: true
  },
  server: {
    port: 5173,
    open: true
  }
});
