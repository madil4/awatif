import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "truss-designer/index.html",
  },
  base: "./", // needed to resolve assets
  root: "./src",
  build: {
    outDir: "../../website/src/examples",
    emptyOutDir: true,
    minify: false, // todo: solve the function name look up by re-architecture reports
    rollupOptions: {
      input: {
        "two-bars": "src/two-bars/index.html",
        building: "src/building/index.html",
        sphere: "src/sphere/index.html",
        "2d-truss": "src/2d-truss/index.html",
        "3d-tower": "src/3d-tower/index.html",
        "arched-bridge": "src/arched-bridge/index.html",
        "portal-frame": "src/portal-frame/index.html",
        "truss-designer": "src/truss-designer/index.html",
        dynamic: "src/dynamic/index.html",
        report: "src/report/index.html",
      },
    },
  },
});
