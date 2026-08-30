#!/usr/bin/env node
import { cp, copyFile, mkdir } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const generators = new Map([
  ["vite-app", "Vite app"],
  ["next-app", "Next app"],
  ["ui-package", "UI package only"],
  ["ag-grid-page", "AG Grid page"],
  ["signalr-client", "SignalR client"],
  ["tanstack-query-api-layer", "TanStack Query API layer"],
  ["ui-design-skill", "UI design skill"],
  ["ui-review-skill", "UI review skill"],
  ["image-to-threejs-skill", "Image to Three.js skill"],
  ["design-system", "DESIGN.md brief"]
]);

const [, , generator, target = generator ? `./${generator}` : undefined] = process.argv;

if (!generator || !generators.has(generator) || !target) {
  console.log(`Usage: create-react-forge-kit <generator> <target>

Generators:
${Array.from(generators, ([key, label]) => `  ${key.padEnd(26)} ${label}`).join("\n")}
`);
  process.exit(generator ? 1 : 0);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const template = resolve(__dirname, "..", "templates", generator);
const output = resolve(process.cwd(), target);

if (generator === "design-system" && target.toLowerCase().endsWith(".md")) {
  await mkdir(dirname(output), { recursive: true });
  await copyFile(resolve(template, "DESIGN.md"), output, constants.COPYFILE_EXCL);
} else {
  await mkdir(output, { recursive: true });
  await cp(template, output, { recursive: true, force: false, errorOnExist: false });
}

console.log(`Created ${generators.get(generator)} at ${output}`);
