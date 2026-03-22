#!/usr/bin/env node

// FlexUI CLI — Install cinematic React components
// Usage: npx flexui add <component-name>
//        npx flexui init
//        npx flexui list

import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import * as readline from "readline";

// ── ANSI Colors ──────────────────────────────────────────────────────────────

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function log(msg: string) {
  console.log(msg);
}

function success(msg: string) {
  log(`${c.green}${c.bold}  OK ${c.reset}${msg}`);
}

function info(msg: string) {
  log(`${c.cyan}${c.bold}  >> ${c.reset}${msg}`);
}

function warn(msg: string) {
  log(`${c.yellow}${c.bold}  !! ${c.reset}${msg}`);
}

function error(msg: string) {
  log(`${c.red}${c.bold}  ERR ${c.reset}${msg}`);
}

function banner() {
  log("");
  log(`${c.cyan}${c.bold}  FlexUI${c.reset} ${c.dim}v0.2.0${c.reset}`);
  log(`${c.dim}  Cinematic React components${c.reset}`);
  log("");
}

// ── Fetch JSON (HTTPS with local fallback) ───────────────────────────────────

function fetchJSON(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchJSON(res.headers.location).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        let data = "";
        res.on("data", (chunk: string) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error("Invalid JSON response"));
          }
        });
      })
      .on("error", reject);
  });
}

function readLocalJSON(filePath: string): any | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Resolve a registry JSON: try remote first, then local fallback
async function resolveRegistryJSON(name: string): Promise<any> {
  const remoteUrl = `https://flexui.dev/r/${name}.json`;

  // Try local fallback first (works offline and during development)
  const localPaths = [
    path.resolve(__dirname, "..", "public", "r", `${name}.json`),
    path.resolve(process.cwd(), "public", "r", `${name}.json`),
  ];

  for (const p of localPaths) {
    const data = readLocalJSON(p);
    if (data) return data;
  }

  // Try remote
  try {
    return await fetchJSON(remoteUrl);
  } catch {
    throw new Error(
      `Component "${name}" not found.\n  Checked: ${remoteUrl}\n  Local: ${localPaths.join(", ")}`
    );
  }
}

// Resolve the index.json for listing
async function resolveIndexJSON(): Promise<any> {
  const localPaths = [
    path.resolve(__dirname, "..", "public", "r", "index.json"),
    path.resolve(process.cwd(), "public", "r", "index.json"),
  ];

  for (const p of localPaths) {
    const data = readLocalJSON(p);
    if (data) return data;
  }

  try {
    return await fetchJSON("https://flexui.dev/r/index.json");
  } catch {
    throw new Error("Could not fetch component index.");
  }
}

// ── Prompt user ──────────────────────────────────────────────────────────────

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

// ── Ensure directory exists ──────────────────────────────────────────────────

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// ── Convert component name to PascalCase ─────────────────────────────────────

function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

// ── Commands ─────────────────────────────────────────────────────────────────

async function commandInit() {
  banner();
  info("Initializing FlexUI in your project...");
  log("");

  // Create components/flexui/ directory
  const componentsDir = path.resolve(process.cwd(), "components", "flexui");
  ensureDir(componentsDir);
  success(`Created ${c.dim}components/flexui/${c.reset}`);

  // Create lib/utils.ts with cn() function
  const libDir = path.resolve(process.cwd(), "lib");
  ensureDir(libDir);
  const utilsPath = path.join(libDir, "utils.ts");

  if (fs.existsSync(utilsPath)) {
    warn(`${c.dim}lib/utils.ts${c.reset} already exists, skipping.`);
  } else {
    const utilsContent = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
    fs.writeFileSync(utilsPath, utilsContent);
    success(`Created ${c.dim}lib/utils.ts${c.reset}`);
  }

  log("");
  success("FlexUI initialized!");
  log("");
  log(`${c.dim}  Next steps:${c.reset}`);
  log(`${c.dim}  1.${c.reset} npm install clsx tailwind-merge framer-motion`);
  log(`${c.dim}  2.${c.reset} npx flexui add shimmer-button`);
  log("");
}

async function commandAdd(componentName: string) {
  banner();
  info(`Installing ${c.bold}${componentName}${c.reset}...`);
  log("");

  // Fetch component registry JSON
  let registry: any;
  try {
    registry = await resolveRegistryJSON(componentName);
  } catch (err: any) {
    error(err.message);
    process.exit(1);
  }

  if (!registry.files || registry.files.length === 0) {
    error(`Component "${componentName}" has no files defined.`);
    process.exit(1);
  }

  // Write each file from the registry
  const writtenFiles: string[] = [];

  for (const file of registry.files) {
    const targetPath = file.target || file.path;
    const fullPath = path.resolve(process.cwd(), targetPath);
    const dir = path.dirname(fullPath);

    ensureDir(dir);

    if (fs.existsSync(fullPath)) {
      warn(`${c.dim}${targetPath}${c.reset} already exists, overwriting.`);
    }

    fs.writeFileSync(fullPath, file.content);
    success(`Written ${c.dim}${targetPath}${c.reset}`);
    writtenFiles.push(targetPath);
  }

  // Show dependencies
  const deps: string[] = registry.dependencies || [];
  if (deps.length > 0) {
    log("");
    info(`Dependencies: ${c.bold}${deps.join(", ")}${c.reset}`);

    // Check if running in a TTY (interactive terminal)
    if (process.stdin.isTTY) {
      const answer = await prompt(
        `${c.cyan}  ?  ${c.reset}Install dependencies with npm? ${c.dim}(y/N)${c.reset} `
      );

      if (answer === "y" || answer === "yes") {
        const { execSync } = require("child_process");
        try {
          info(`Running: npm install ${deps.join(" ")}`);
          execSync(`npm install ${deps.join(" ")}`, { stdio: "inherit" });
          success("Dependencies installed.");
        } catch {
          warn("Failed to install dependencies. Install manually:");
          log(`${c.dim}  npm install ${deps.join(" ")}${c.reset}`);
        }
      } else {
        log("");
        log(`${c.dim}  Install manually:${c.reset}`);
        log(`${c.dim}  npm install ${deps.join(" ")}${c.reset}`);
      }
    } else {
      log("");
      log(`${c.dim}  Install dependencies:${c.reset}`);
      log(`${c.dim}  npm install ${deps.join(" ")}${c.reset}`);
    }
  }

  // Print usage example
  log("");
  success(`${c.bold}${registry.title || toPascalCase(componentName)}${c.reset} installed!`);
  log("");
  log(`${c.dim}  Import:${c.reset}`);

  const mainFile = registry.files[0];
  const importPath = (mainFile.target || mainFile.path)
    .replace(/\.tsx?$/, "")
    .replace(/^components\//, "@/components/");

  log(
    `${c.dim}  import { ${toPascalCase(componentName)} } from "${importPath}";${c.reset}`
  );
  log("");
}

async function commandList() {
  banner();
  info("Available components:");
  log("");

  let index: any;
  try {
    index = await resolveIndexJSON();
  } catch (err: any) {
    error(err.message);
    process.exit(1);
  }

  const items: any[] = index.items || [];

  // Deduplicate by name
  const seen = new Set<string>();
  const unique: any[] = [];
  for (const item of items) {
    if (!seen.has(item.name)) {
      seen.add(item.name);
      unique.push(item);
    }
  }

  // Group by category (inferred from name patterns)
  const maxNameLen = Math.max(...unique.map((i) => i.name.length));

  for (const item of unique) {
    const padded = item.name.padEnd(maxNameLen + 2);
    log(
      `  ${c.cyan}${padded}${c.reset}${c.dim}${item.description || ""}${c.reset}`
    );
  }

  log("");
  log(`${c.dim}  ${unique.length} components available${c.reset}`);
  log(`${c.dim}  Install: npx flexui add <name>${c.reset}`);
  log("");
}

function commandHelp() {
  banner();
  log(`${c.bold}  Usage:${c.reset}`);
  log("");
  log(`    ${c.cyan}flexui init${c.reset}              Set up FlexUI in your project`);
  log(`    ${c.cyan}flexui add ${c.dim}<name>${c.reset}        Install a component`);
  log(`    ${c.cyan}flexui list${c.reset}              List all available components`);
  log(`    ${c.cyan}flexui help${c.reset}              Show this help message`);
  log("");
  log(`${c.bold}  Examples:${c.reset}`);
  log("");
  log(`    ${c.dim}$ npx flexui init${c.reset}`);
  log(`    ${c.dim}$ npx flexui add shimmer-button${c.reset}`);
  log(`    ${c.dim}$ npx flexui add spotlight-card${c.reset}`);
  log(`    ${c.dim}$ npx flexui list${c.reset}`);
  log("");
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "init":
      await commandInit();
      break;

    case "add": {
      const componentName = args[1];
      if (!componentName) {
        error("Missing component name.");
        log(`${c.dim}  Usage: flexui add <component-name>${c.reset}`);
        log(`${c.dim}  Example: flexui add shimmer-button${c.reset}`);
        process.exit(1);
      }
      await commandAdd(componentName);
      break;
    }

    case "list":
    case "ls":
      await commandList();
      break;

    case "help":
    case "--help":
    case "-h":
      commandHelp();
      break;

    default:
      if (command) {
        error(`Unknown command: "${command}"`);
        log("");
      }
      commandHelp();
      if (command) process.exit(1);
      break;
  }
}

main().catch((err) => {
  error(err.message || String(err));
  process.exit(1);
});
