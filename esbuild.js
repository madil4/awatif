import { exec } from "child_process";
import * as esbuild from "esbuild";

const ctx = await esbuild.context({
  entryPoints: ["examples/2d-truss/src/app.ts"],
  bundle: true,
  outfile: "./examples/2d-truss/bundle.js",
});

await ctx.watch();

const { host, port } = await ctx.serve({
  servedir: "./examples/2d-truss/",
});
const url = `http://${host}:${port}`;
console.log(`Serving on: ${url}`);

if (process.platform === "win32") {
  exec(`start ${url}`);
} else {
  exec(`open ${url}`);
}
