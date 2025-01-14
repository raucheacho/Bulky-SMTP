import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }: { mode: string }) => {
  // Charger les variables d'environnement
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    define: {
      "process.env.VITE_BACKEND_PORT": process.env.VITE_BACKEND_PORT,
    },
    server: {
      proxy: {
        "/api": {
          target: `http://localhost:${process.env.VITE_BACKEND_PORT}`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
