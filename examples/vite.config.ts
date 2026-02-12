import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  server: {
    port: 4600,
    open: "slab-designer/index.html",
  },
  base: "./", // to resolve assets
  root: "./src",
  build: {
    outDir: "../../website/src/examples",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        "3d-structure": "src/3d-structure/index.html",
        "advanced-truss": "src/advanced-truss/index.html",
        beams: "src/beams/index.html",
        curves: "src/curves/index.html",
        "1d-mesh": "src/1d-mesh/index.html",
        truss: "src/truss/index.html",
        tables: "src/tables/index.html",
        "2d-mesh": "src/2d-mesh/index.html",
        drawing: "src/drawing/index.html",
        report: "src/report/index.html",
        plate: "src/plate/index.html",
        "clt-plate": "src/clt-plate/index.html",
        "clt-two-way-slab": "src/clt-two-way-slab/index.html",
        "clt-tower": "src/clt-tower/index.html",
        "clt-tower-benchmark": "src/clt-tower-benchmark/index.html",
        "clt-building-openings": "src/clt-building-openings/index.html",
        "clt-realtime-benchmark": "src/clt-realtime-benchmark/index.html",
        "clt-multi-story-designer": "src/clt-multi-story-designer/index.html",
        "clt-wall-coupling": "src/clt-wall-coupling/index.html",
        building: "src/building/index.html",
        "slab-designer": "src/slab-designer/index.html",
        "color-map": "src/color-map/index.html",
      },
    },
  },
  plugins: [topLevelAwait()], // used by awatif-fem & awatif-mesh to load wasm at top level
});
