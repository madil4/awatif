import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  server: {
    port: 4600,
    open: "drawing/index.html",
  },
});
