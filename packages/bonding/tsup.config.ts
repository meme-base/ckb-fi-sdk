import { defineConfig } from "tsup";

export default defineConfig({
  name: "@ckb-fi/bonding",
  entry: ["./src/ckb-fi-bonding.ts"],
  minify: true,
  minifySyntax: true,
  minifyWhitespace: true,
  treeshake: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  platform: "neutral",
  // @ts-ignore
  format: ["cjs", "esm", "umd"],
  globalName: "CKBFiBonding",
  // legacyOutput: true,
  outExtension({ format }) {
    return {
      js:
        { cjs: ".cjs", esm: ".mjs", umd: ".umd.js", iife: ".iife.js" }[
          format
        ] || `.${format}.js`,
    };
  },
  publicDir: "./public",
  outDir: "./dist",
});
