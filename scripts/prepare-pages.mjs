import { copyFileSync, existsSync, rmSync } from "node:fs";
import path from "node:path";

const clientOutput = path.resolve("dist/client");
const page = path.join(clientOutput, "index.html");
const jekyllMarker = path.resolve("public/.nojekyll");
const publishedJekyllMarker = path.join(clientOutput, ".nojekyll");
const nestedHostingMetadata = path.join(clientOutput, ".openai");

if (!existsSync(page)) {
  throw new Error("The framework build did not produce dist/client/index.html.");
}
if (!existsSync(jekyllMarker)) {
  throw new Error("public/.nojekyll is required for the GitHub Pages asset directory.");
}

// GitHub Pages needs the marker to publish Vite's underscore-prefixed assets.
copyFileSync(jekyllMarker, publishedJekyllMarker);

// This metadata is only needed by the Sites packaging archive, never by visitors.
if (existsSync(nestedHostingMetadata)) {
  rmSync(nestedHostingMetadata, { recursive: true, force: true });
}
