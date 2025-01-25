import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Carpeta de salida para el build
    sourcemap: true, // Habilita mapas de fuente para depuración
  },
  server: {
    port: 3000, // Puerto para desarrollo local
    open: true, // Abre automáticamente el navegador
  },
});
