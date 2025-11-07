import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "geometry/index.html",
  },
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        geometry: "./src/geometry/index.html",
      },
    },
  },
});
