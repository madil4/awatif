import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/analyze.ts"],
  outdir: "dist",
  entryNames: "[hash]",
  bundle: true,
  format: "esm",
  target: "es2015",
  minify: true,
});
