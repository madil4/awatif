import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  server: {
    port: 4600,
    open: "slab-designer/index.html",
  },
  root: "./src",
  plugins: [topLevelAwait()], // used by awatif-fem & awatif-mesh to load wasm at top level
});
