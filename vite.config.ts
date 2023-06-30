import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  server: {
    port: 4600,
  },
  plugins: [solidPlugin()],
});
