import { buildSync, type BuildOptions } from "esbuild";
import { readFileSync, watch, writeFileSync } from "fs";
import { Logger } from "./src/libs/logger/index.js";

type ConfigKeys = "app" | "style" | "main";

const CONFIG: { [key in ConfigKeys]: BuildOptions } = {
  app: {
    entryPoints: ["./src/app/index.tsx"],
    bundle: true,
    minify: false,
    write: false,
    format: "esm",
    platform: "browser",
    tsconfig: "./tsconfig.json",
  },
  style: {
    entryPoints: ["./src/app/index.css"],
    bundle: true,
    minify: false,
    write: false,
  },
  main: {
    entryPoints: ["./src/main/index.ts"],
    outdir: "./.dist/",
    bundle: true,
    minify: false,
    format: "esm",
    tsconfig: "./tsconfig.json",
  },
};
const logger = new Logger();

async function build() {
  logger.log("<cyan>[APP]: <reset>Building...");
  const app = buildSync(CONFIG.app);
  const style = buildSync(CONFIG.style);
  if (app.outputFiles && style.outputFiles) {
    outputHtml(style.outputFiles[0].text, app.outputFiles[0].text);
  }
  logger.log("<green>[APP]: <reset>Success!!");

  logger.log("<cyan>[MAIN]: <reset>Building...");
  const main = buildSync(CONFIG.main);
  logger.log("<green>[MAIN]: <reset>Success!!\n");

  const warnings = [...app.warnings, ...main.warnings];
  warnings.forEach((msg) =>
    logger.log(
      `<yellow>[WARNING ${msg.id}]: <reset>${msg.text}\n
                                    ${msg.detail}\n
                                    ${msg.location}`
    )
  );

  const errors = [...app.errors, ...main.errors];
  errors.forEach((msg) =>
    logger.log(
      `<red>[ERROR ${msg.id}]: <reset>${msg.text}\n
                               ${msg.detail}\n
                               ${msg.location}`
    )
  );
}

function handleOnWatch() {
  logger.log("<magenta>[WATCH]: <reset>processing...\n");
  watch(
    "./src/",
    { persistent: true, recursive: true },
    (eventType, filename) => {
      logger.log(`<magenta>[${eventType.toUpperCase()}]: <reset>${filename}`);
      build();
    }
  );
}

function outputHtml(styles: string, scripts: string) {
  const html = readFileSync("./src/app/index.html", "utf-8");
  const styleEl = `<style>${styles}</style>`;
  const scriptEl = `<script>${scripts}</script>`;

  writeFileSync("./.dist/ui.html", `${html}${styleEl}\n${scriptEl}`);
}

if (process.argv.includes("--watch")) {
  handleOnWatch();
} else {
  build();
}
