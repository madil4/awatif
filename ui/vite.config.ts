import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "viewer/geometry/index.html",
  },
  root: "./src",
});
