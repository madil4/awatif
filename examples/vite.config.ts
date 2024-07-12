import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "truss-designer/index.html",
  },
  base: "./", // to resolve assets
  root: "./src",
  build: {
    outDir: "../../website/src/examples",
    emptyOutDir: true,
  },
});
