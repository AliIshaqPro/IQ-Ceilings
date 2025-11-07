import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "./", // ✅ ensures assets load correctly in production builds
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,
    assetsDir: "assets", // ✅ keeps all images and static files under /assets
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
