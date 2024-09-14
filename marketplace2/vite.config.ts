import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "analyzer/index.html",
  },
  root: "./src",
  base: "./", // to resolve assets
  build: {
    outDir: "../../website/src/marketplace",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        analyzer: "src/analyzer/index.html",
      },
    },
  },
});
