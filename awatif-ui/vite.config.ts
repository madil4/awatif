import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "/examples/parametric/index.html",
  },
  build: {
    rollupOptions: {
      input: {
        landing: "index.html",
        docs: "docs/index.html",
        basic: "examples/basic/index.html",
        parametric: "examples/parametric/index.html",
      },
    },
  },
});
