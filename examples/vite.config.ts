import { resolve } from "path";
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
        "3d-structure": resolve(__dirname, "src/3d-structure/index.html"),
        "advanced-truss": resolve(__dirname, "src/advanced-truss/index.html"),
        beams: resolve(__dirname, "src/beams/index.html"),
        curves: resolve(__dirname, "src/curves/index.html"),
        "1d-mesh": resolve(__dirname, "src/1d-mesh/index.html"),
        truss: resolve(__dirname, "src/truss/index.html"),
        tables: resolve(__dirname, "src/tables/index.html"),
        "2d-mesh": resolve(__dirname, "src/2d-mesh/index.html"),
        drawing: resolve(__dirname, "src/drawing/index.html"),
        report: resolve(__dirname, "src/report/index.html"),
        plate: resolve(__dirname, "src/plate/index.html"),
        "clt-plate": resolve(__dirname, "src/clt-plate/index.html"),
        "clt-handbook-3-6": resolve(
          __dirname,
          "src/clt-handbook-3-6/index.html",
        ),
        "clt-two-way-slab": resolve(
          __dirname,
          "src/clt-two-way-slab/index.html",
        ),
        "clt-6-4-shear-check": resolve(
          __dirname,
          "src/clt-6-4-shear-check/index.html",
        ),
        "clt-tower": resolve(__dirname, "src/clt-tower/index.html"),
        "clt-tower-benchmark": resolve(
          __dirname,
          "src/clt-tower-benchmark/index.html",
        ),
        "clt-building-openings": resolve(
          __dirname,
          "src/clt-building-openings/index.html",
        ),
        "clt-realtime-benchmark": resolve(
          __dirname,
          "src/clt-realtime-benchmark/index.html",
        ),
        "clt-multi-story-designer": resolve(
          __dirname,
          "src/clt-multi-story-designer/index.html",
        ),
        "clt-wall-coupling": resolve(
          __dirname,
          "src/clt-wall-coupling/index.html",
        ),
        building: resolve(__dirname, "src/building/index.html"),
        "slab-designer": resolve(__dirname, "src/slab-designer/index.html"),
        "color-map": resolve(__dirname, "src/color-map/index.html"),
      },
    },
  },
  worker: {
    format: "es",
    plugins: () => [topLevelAwait()],
  },
  plugins: [topLevelAwait()], // used by awatif-fem & awatif-mesh to load wasm at top level
});
