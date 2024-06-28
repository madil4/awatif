import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "/examples/3-folders/index.html",
  },
  base: "./", // needed to resolve assets
  build: {
    outDir: "../website/src/awatif-ui",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        basic: "examples/1-basic/index.html",
        parametric: "examples/2-parametric/index.html",
        folders: "examples/3-folders/index.html",
      },
    },
  },
});
