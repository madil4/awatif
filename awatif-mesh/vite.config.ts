import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "minimal.html",
  },
  root: "./src/tests",
});
