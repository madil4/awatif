import { mergeConfig } from "vite";
import turbosnap from "vite-plugin-turbosnap";

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  framework: {
    name: "@storybook/html-vite",
  },
  core: { builder: "@storybook/builder-vite" },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins:
        configType === "PRODUCTION"
          ? [turbosnap({ rootDir: config.root ?? process.cwd() })]
          : [],
    });
  },
};
