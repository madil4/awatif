import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "color-map/index.html",
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
        building: "src/building/index.html",
        "color-map": "src/color-map/index.html",
        curves: "src/curves/index.html",
        "1d-mesh": "src/1d-mesh/index.html",
        truss: "src/truss/index.html",
        tables: "src/tables/index.html",
        "2d-mesh": "src/2d-mesh/index.html",
        drawing: "src/drawing/index.html",
        report: "src/report/index.html",
        plate: "src/plate/index.html",
        visuals: "src/visuals/index.html",
      },
    },
  },
});
