import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "viewer/objects/polylines/index.html",
  },
  root: "./src",
});
