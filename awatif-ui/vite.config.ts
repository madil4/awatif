import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "sheets/index.html",
  },
  root: "./src",
});
