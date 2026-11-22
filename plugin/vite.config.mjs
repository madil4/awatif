import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  plugins: [glsl()],
  optimizeDeps: {
    esbuildOptions: { loader: { ".glsl": "text" } },
    rolldownOptions: { moduleTypes: { ".glsl": "text" } },
  },
});
