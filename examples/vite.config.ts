import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "truss-designer/index.html",
  },
  base: "./",
  build: {
    outDir: "../docs/src/examples",
    emptyOutDir: true,
    minify: false, // todo: solve the function name look up
    rollupOptions: {
      input: {
        "truss-designer": "truss-designer/index.html",
        building: "building/index.html",
        sphere: "sphere/index.html",
        "2d-truss": "2d-truss/index.html",
        "3d-tower": "3d-tower/index.html",
        "arched-bridge": "arched-bridge/index.html",
        "portal-frame": "portal-frame/index.html",
        "two-bars": "two-bars/index.html",
        dynamic: "dynamic/index.html",
        report: "report/index.html",
      },
    },
  },
});
