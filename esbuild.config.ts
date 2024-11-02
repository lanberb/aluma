import linaria from "@linaria/esbuild";
import { build as buildAsync, type BuildOptions } from "esbuild";
import { readFileSync, watch, writeFileSync } from "node:fs";
import { Logger } from "./src/libs/logger/index.js";

type ConfigKeys = "app" | "main";

const CONFIG: { [key in ConfigKeys]: BuildOptions } = {
  app: {
    entryPoints: ["./src/app/App.tsx"],
    outdir: "./.dist/ui",
    bundle: true,
    minify: false,
    format: "esm",
    platform: "browser",
    plugins: [
      linaria({
        sourceMap: true,
      }),
    ],
  },
  main: {
    entryPoints: ["./src/main/index.ts"],
    outdir: "./.dist/main",
    bundle: true,
    minify: false,
    format: "esm",
    tsconfig: "./tsconfig.json",
  },
};
const logger = new Logger();

async function build() {
  logger.log("<blue>======== Build Started ========");

  /**
   * Build Main Thread.
   */
  logger.log("<cyan>[MAIN] <reset>Building...");
  await buildAsync(CONFIG.main);
  logger.log("<green>[MAIN] <reset>Success\n");

  /**
   * Build App.
   */
  logger.log("<cyan>[APP] <reset>Building...");
  await buildAsync(CONFIG.app);

  const html = readFileSync("./src/app/index.html", "utf-8");
  const style = readFileSync("./.dist/ui/App.css", "utf-8");
  const script = readFileSync("./.dist/ui/App.js", "utf-8");
  const styleEl = `<style>${style}</style>`;
  const scriptEl = `<script>${script}</script>`;
  writeFileSync("./.dist/ui/index.html", `${html}${styleEl}\n${scriptEl}`);

  logger.log("<green>[APP] <reset>Success");
}

function handleOnWatch() {
  logger.log("\n<magenta>[WATCH] <reset>processing...\n");

  watch(
    "./src/",
    { persistent: true, recursive: true },
    async (eventType, filename) => {
      logger.log(`\n<magenta>[${eventType.toUpperCase()}] <reset>${filename}`);
      await build();
    },
  );
}

await build();

if (process.argv.includes("--watch")) {
  handleOnWatch();
}
