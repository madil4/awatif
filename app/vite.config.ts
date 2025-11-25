import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: true,
  },
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
