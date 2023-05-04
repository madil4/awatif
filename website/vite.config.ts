import solid from "solid-start/vite";
// @ts-ignore
import staticAdapter from "solid-start-static";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid({ adapter: staticAdapter() })],
});
