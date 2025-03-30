import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "minimal/index.html",
  },
  root: "./src/tests",
});
