import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "mesh/index.html",
  },
  root: "./src",
});
