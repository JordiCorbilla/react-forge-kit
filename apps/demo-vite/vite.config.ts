import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  resolve: {
    alias: {
      "@": "/src",
      "@forge/api": "/packages/api/src/index.ts",
      "@forge/query": "/packages/query/src/index.tsx",
      "@forge/state": "/packages/state/src/index.ts",
      "@forge/signalr": "/packages/signalr/src/index.tsx",
      "@forge/ui": "/packages/ui/src/index.tsx",
      "@forge/grid": "/packages/grid/src/index.tsx",
      "@forge/notifications": "/packages/notifications/src/index.tsx",
      "@forge/utils": "/packages/utils/src/index.ts"
    }
  }
});
