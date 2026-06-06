import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const root = resolve(__dirname, "../..");

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true
  },
  build: {
    chunkSizeWarningLimit: 1500
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@forge/api": resolve(root, "packages/api/src/index.ts"),
      "@forge/query": resolve(root, "packages/query/src/index.tsx"),
      "@forge/state": resolve(root, "packages/state/src/index.ts"),
      "@forge/signalr": resolve(root, "packages/signalr/src/index.tsx"),
      "@forge/ui": resolve(root, "packages/ui/src/index.tsx"),
      "@forge/grid": resolve(root, "packages/grid/src/index.tsx"),
      "@forge/notifications": resolve(root, "packages/notifications/src/index.tsx"),
      "@forge/utils": resolve(root, "packages/utils/src/index.ts")
    }
  }
});
