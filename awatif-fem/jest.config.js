import { createDefaultEsmPreset } from "ts-jest";

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  ...createDefaultEsmPreset({
    tsconfig: {
      module: "es2022",
      target: "es2022",
    },
  }),
  testPathIgnorePatterns: ["/node_modules/", "\\.bench\\.test\\.ts$"],
};
