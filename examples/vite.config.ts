import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  server: {
    port: 4600,
    open: "polylines/index.html",
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        polylines: "./src/polylines/index.html",
      },
    },
  },
});
