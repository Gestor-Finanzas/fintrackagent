import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración de Vite para FinTrack.
// - `plugin-react` habilita Fast Refresh, JSX y SWC automático.
// - `build.outDir: "build"` mantiene la carpeta de salida que Vercel ya
//   tenía configurada; cuando estés tranquilo con el cambio, puedes pasar
//   al default de Vite ("dist") actualizando `vercel.json`.
// - Las variables de entorno expuestas al cliente deben empezar por `VITE_`.
//   `import.meta.env.VITE_*` es el equivalente a `process.env.REACT_APP_*`.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // mantenemos el mismo puerto que usabas con CRA
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: false,
  },
});
