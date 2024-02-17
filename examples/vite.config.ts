import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "2d-truss/index.html",
  },
  base: "./",
  build: {
    outDir: "../docs/src/examples",
    rollupOptions: {
      input: {
        "2d-truss": "2d-truss/index.html",
        "2d-truss-2": "2d-truss-2/index.html",
      },
    },
  },
});
