import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../public/",
    lib: {
      entry: "src/index.ts",
      name: "algorithms",
      formats: ["es"],
      fileName: (format) => `algorithms-${format}-[hash].js`,
    },
  },
});
