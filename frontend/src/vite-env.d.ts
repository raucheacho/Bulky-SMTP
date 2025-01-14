/// <reference types="vite/client" />
// vite-env.d.ts
interface ImportMetaEnv {
  VITE_BACKEND_PORT: string;
  // Ajoutez d'autres variables d'environnement que vous utilisez ici
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
