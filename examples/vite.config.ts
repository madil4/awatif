import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "polylines/index.html",
  },
  root: "./src",
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
