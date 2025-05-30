import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 👈 bind to 0.0.0.0 so Docker can access it
    port: 3000, // 👈 consistent with docker-compose port mapping
    proxy: {
      "/apis": {
        target: process.env.VITE_API_PROXY,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apis/, ""),
      },
    },
  },
});
