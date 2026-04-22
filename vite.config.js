import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `build.outDir: "build"` en lugar del default "dist" para que vercel.json
// y cualquier script externo que apunte a /build sigan funcionando.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: false,
  },
});
