#!/usr/bin/env node

// FlexUI CLI — Install cinematic React components
// Usage: npx flexui add <component-name>
//        npx flexui init
//        npx flexui list

import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import * as readline from "readline";

// ── Version ──────────────────────────────────────────────────────────────────

const CLI_VERSION = "0.3.0";

// ── ANSI Colors & Styles ─────────────────────────────────────────────────────

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  underline: "\x1b[4m",
  inverse: "\x1b[7m",
  strikethrough: "\x1b[9m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgCyan: "\x1b[46m",
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function log(msg: string) {
  console.log(msg);
}

function success(msg: string) {
  log(`${c.green}  \u2714 ${c.reset}${msg}`);
}

function info(msg: string) {
  log(`${c.cyan}  \u25B6 ${c.reset}${msg}`);
}

function warn(msg: string) {
  log(`${c.yellow}  \u26A0 ${c.reset}${c.yellow}${msg}${c.reset}`);
}

function error(msg: string) {
  log(`${c.red}  \u2718 ${c.reset}${c.red}${msg}${c.reset}`);
}

function hint(msg: string) {
  log(`${c.gray}    ${msg}${c.reset}`);
}

function banner() {
  log("");
  log(
    `${c.bold}${c.cyan}  FlexUI${c.reset} ${c.dim}v${CLI_VERSION}${c.reset}`
  );
  log(`${c.dim}  Cinematic React components for Next.js${c.reset}`);
  log("");
}

// ── Spinner ──────────────────────────────────────────────────────────────────

class Spinner {
  private frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  private interval: ReturnType<typeof setInterval> | null = null;
  private frameIndex = 0;
  private message: string;

  constructor(message: string) {
    this.message = message;
  }

  start(): this {
    if (!process.stderr.isTTY) {
      process.stderr.write(`  ${this.message}\n`);
      return this;
    }
    this.interval = setInterval(() => {
      const frame = this.frames[this.frameIndex % this.frames.length];
      process.stderr.write(
        `\r${c.cyan}  ${frame}${c.reset} ${this.message}`
      );
      this.frameIndex++;
    }, 80);
    return this;
  }

  stop(finalMessage?: string): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    if (process.stderr.isTTY) {
      process.stderr.write("\r\x1b[K"); // clear spinner line
    }
    if (finalMessage) {
      success(finalMessage);
    }
  }

  fail(finalMessage?: string): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    if (process.stderr.isTTY) {
      process.stderr.write("\r\x1b[K");
    }
    if (finalMessage) {
      error(finalMessage);
    }
  }
}

// ── Arg Parser ───────────────────────────────────────────────────────────────

interface ParsedArgs {
  command: string;
  positional: string[];
  flags: {
    dryRun: boolean;
    diff: boolean;
    overwrite: boolean;
    help: boolean;
    version: boolean;
    all: boolean;
    category: string | null;
  };
}

function parseArgs(argv: string[]): ParsedArgs {
  const args = argv.slice(2);
  const positional: string[] = [];
  const flags = {
    dryRun: false,
    diff: false,
    overwrite: false,
    help: false,
    version: false,
    all: false,
    category: null as string | null,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case "--dry-run":
      case "-n":
        flags.dryRun = true;
        break;
      case "--diff":
      case "-d":
        flags.diff = true;
        break;
      case "--overwrite":
      case "--force":
      case "-f":
        flags.overwrite = true;
        break;
      case "--help":
      case "-h":
        flags.help = true;
        break;
      case "--version":
      case "-v":
        flags.version = true;
        break;
      case "--all":
      case "-a":
        flags.all = true;
        break;
      case "--category":
      case "-c":
        flags.category = args[++i] || null;
        break;
      default:
        if (arg.startsWith("--category=")) {
          flags.category = arg.split("=")[1];
        } else if (arg.startsWith("-") && arg !== "-") {
          error(`Unknown flag: ${arg}`);
          hint(`Run ${c.cyan}flexui --help${c.gray} for usage information.`);
          process.exit(1);
        } else {
          positional.push(arg);
        }
    }
  }

  return {
    command: positional[0] || "",
    positional: positional.slice(1),
    flags,
  };
}

// ── Fetch JSON (HTTPS with redirect support) ─────────────────────────────────

function fetchJSON(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Request timed out: ${url}`));
    }, 15000);

    https
      .get(url, (res) => {
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          clearTimeout(timeout);
          fetchJSON(res.headers.location).then(resolve, reject);
          return;
        }
        if (res.statusCode === 404) {
          clearTimeout(timeout);
          reject(new Error(`Not found: ${url}`));
          return;
        }
        if (res.statusCode !== 200) {
          clearTimeout(timeout);
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        let data = "";
        res.on("data", (chunk: string) => (data += chunk));
        res.on("end", () => {
          clearTimeout(timeout);
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error("Invalid JSON response from registry"));
          }
        });
      })
      .on("error", (err) => {
        clearTimeout(timeout);
        reject(err);
      });
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

// Resolve a registry JSON: try local first, then remote
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
      `Component "${name}" not found in the registry.\n\n` +
        `    Checked remote: ${c.dim}${remoteUrl}${c.reset}\n` +
        `    Checked local:  ${c.dim}${localPaths[0]}${c.reset}\n\n` +
        `    Run ${c.cyan}flexui list${c.reset} to see all available components.`
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
    throw new Error(
      "Could not fetch component index.\n\n" +
        `    Make sure you have an internet connection, or run from\n` +
        `    a FlexUI project directory with a local registry.`
    );
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

// ── Category inference ───────────────────────────────────────────────────────

const CATEGORY_RULES: [RegExp, string][] = [
  [/button$/, "Buttons"],
  [/card$/, "Cards"],
  [/text|words|typewriter|scramble|reveal|gradient-text|chromatic-text|glow-text/, "Text & Typography"],
  [/background$|pattern$|grid$|stars|beams|mesh|aurora|particle|retro-grid|flickering/, "Backgrounds & Patterns"],
  [/cursor$|cursor|follow|blob-cursor|splash-cursor|spotlight-cursor/, "Cursor Effects"],
  [/scroll|parallax|sticky|fade-on-scroll/, "Scroll Animations"],
  [/block$|hero$|cta/, "Blocks & Sections"],
  [/tab|accordion|drawer|toast|popover|dropdown|tooltip|menu|dialog|modal|navbar|search-spotlight|command/, "Navigation & Overlays"],
  [/input|otp|tag-input|slider|switch|color-picker|rating/, "Form & Input"],
  [/avatar|badge|skeleton|divider|kbd|code-inline|breadcrumb|stepper|timeline|empty-state/, "Data Display"],
  [/beam|border-beam|moving-border|neon|spotlight-border|orbit/, "Border & Glow Effects"],
  [/three|globe|shader|neural|canvas|eye/, "3D & WebGL"],
  [/frame|browser|phone/, "Device Frames"],
  [/transition|disintegration|portal|split-screen|glitch|smoke/, "Transitions & Effects"],
  [/chart|sparkline|ring|kpi|stat|counter|ticker|countdown|progress/, "Data & Charts"],
  [/marquee|dock|tilt|wobble|magnetic|hover|direction|ambient|blob|icon-cloud|data-orbit/, "Interactive & Motion"],
];

function inferCategory(name: string): string {
  for (const [pattern, category] of CATEGORY_RULES) {
    if (pattern.test(name)) return category;
  }
  return "Other";
}

// ── Detect installed components ──────────────────────────────────────────────

function getInstalledComponents(): Set<string> {
  const installed = new Set<string>();
  const flexuiDir = path.resolve(process.cwd(), "components", "flexui");
  if (!fs.existsSync(flexuiDir)) return installed;

  try {
    const files = fs.readdirSync(flexuiDir);
    for (const file of files) {
      if (file.endsWith(".tsx") || file.endsWith(".ts")) {
        installed.add(file.replace(/\.tsx?$/, ""));
      }
    }
  } catch {
    // ignore
  }
  return installed;
}

// ── Simple unified diff ──────────────────────────────────────────────────────

function generateDiff(
  filePath: string,
  newContent: string
): { diff: string; isNew: boolean } {
  const relPath = path.relative(process.cwd(), filePath);

  if (!fs.existsSync(filePath)) {
    const lines = newContent.split("\n");
    const diffLines = [
      `${c.bold}--- /dev/null${c.reset}`,
      `${c.bold}+++ b/${relPath}${c.reset}`,
      `${c.cyan}@@ -0,0 +1,${lines.length} @@${c.reset}`,
      ...lines.map((l) => `${c.green}+${l}${c.reset}`),
    ];
    return { diff: diffLines.join("\n"), isNew: true };
  }

  const oldContent = fs.readFileSync(filePath, "utf-8");
  if (oldContent === newContent) {
    return { diff: `${c.dim}  (no changes)${c.reset}`, isNew: false };
  }

  const oldLines = oldContent.split("\n");
  const newLines = newContent.split("\n");

  const diffLines = [
    `${c.bold}--- a/${relPath}${c.reset}`,
    `${c.bold}+++ b/${relPath}${c.reset}`,
  ];

  // Simple line-by-line diff (not a full Myers diff, but good enough for preview)
  const maxLines = Math.max(oldLines.length, newLines.length);
  let removals = 0;
  let additions = 0;

  for (let i = 0; i < maxLines; i++) {
    const oldLine = i < oldLines.length ? oldLines[i] : undefined;
    const newLine = i < newLines.length ? newLines[i] : undefined;

    if (oldLine === newLine) continue;
    if (oldLine !== undefined && newLine === undefined) {
      diffLines.push(`${c.red}-${oldLine}${c.reset}`);
      removals++;
    } else if (oldLine === undefined && newLine !== undefined) {
      diffLines.push(`${c.green}+${newLine}${c.reset}`);
      additions++;
    } else {
      diffLines.push(`${c.red}-${oldLine}${c.reset}`);
      diffLines.push(`${c.green}+${newLine}${c.reset}`);
      removals++;
      additions++;
    }
  }

  if (removals === 0 && additions === 0) {
    return { diff: `${c.dim}  (no changes)${c.reset}`, isNew: false };
  }

  diffLines.push(
    `\n${c.dim}  ${c.green}+${additions}${c.dim} additions, ${c.red}-${removals}${c.dim} removals${c.reset}`
  );

  return { diff: diffLines.join("\n"), isNew: false };
}

// ── Commands ─────────────────────────────────────────────────────────────────

async function commandInit(flags: ParsedArgs["flags"]) {
  banner();

  // Detect existing config
  const configPath = path.resolve(process.cwd(), "components.json");
  const flexuiDir = path.resolve(process.cwd(), "components", "flexui");
  const utilsPath = path.resolve(process.cwd(), "lib", "utils.ts");
  const alreadyInitialized =
    fs.existsSync(configPath) ||
    fs.existsSync(flexuiDir) ||
    fs.existsSync(utilsPath);

  if (alreadyInitialized) {
    warn("FlexUI appears to already be initialized in this project.");
    log("");
    if (fs.existsSync(configPath)) {
      hint(`Found: ${c.dim}components.json${c.reset}`);
    }
    if (fs.existsSync(flexuiDir)) {
      hint(`Found: ${c.dim}components/flexui/${c.reset}`);
    }
    if (fs.existsSync(utilsPath)) {
      hint(`Found: ${c.dim}lib/utils.ts${c.reset}`);
    }
    log("");

    if (!flags.overwrite) {
      if (process.stdin.isTTY) {
        const answer = await prompt(
          `${c.cyan}  ? ${c.reset}Continue and overwrite existing files? ${c.dim}(y/N)${c.reset} `
        );
        if (answer !== "y" && answer !== "yes") {
          log("");
          info("Aborted. No changes made.");
          log("");
          return;
        }
      } else {
        info(
          `Use ${c.bold}--overwrite${c.reset} to reinitialize.`
        );
        log("");
        return;
      }
    }
    log("");
  }

  info("Initializing FlexUI in your project...");
  log("");

  // Create components/flexui/ directory
  const componentsDir = path.resolve(process.cwd(), "components", "flexui");
  ensureDir(componentsDir);
  success(`Created ${c.dim}components/flexui/${c.reset}`);

  // Create lib/utils.ts with cn() function
  const libDir = path.resolve(process.cwd(), "lib");
  ensureDir(libDir);

  if (fs.existsSync(utilsPath) && !flags.overwrite) {
    warn(`${c.dim}lib/utils.ts${c.reset} already exists, skipping.`);
    hint(`Use ${c.cyan}--overwrite${c.gray} to replace it.`);
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
  log(`${c.bold}  Next steps:${c.reset}`);
  log("");
  log(
    `  ${c.dim}1.${c.reset} Install peer dependencies:`
  );
  log(
    `     ${c.cyan}npm install clsx tailwind-merge framer-motion${c.reset}`
  );
  log("");
  log(
    `  ${c.dim}2.${c.reset} Add your first component:`
  );
  log(`     ${c.cyan}npx flexui add shimmer-button${c.reset}`);
  log("");
  log(
    `  ${c.dim}3.${c.reset} Browse all components:`
  );
  log(`     ${c.cyan}npx flexui list${c.reset}`);
  log("");
}

async function commandAdd(
  componentNames: string[],
  flags: ParsedArgs["flags"]
) {
  banner();

  if (componentNames.length === 0) {
    error("Missing component name.");
    log("");
    log(`  ${c.bold}Usage:${c.reset}`);
    log(`    ${c.cyan}flexui add <component-name>${c.reset}`);
    log(`    ${c.cyan}flexui add <name1> <name2> ...${c.reset}`);
    log("");
    log(`  ${c.bold}Examples:${c.reset}`);
    log(`    ${c.dim}$ npx flexui add shimmer-button${c.reset}`);
    log(
      `    ${c.dim}$ npx flexui add shimmer-button spotlight-card${c.reset}`
    );
    log(`    ${c.dim}$ npx flexui add shimmer-button --dry-run${c.reset}`);
    log(`    ${c.dim}$ npx flexui add shimmer-button --diff${c.reset}`);
    log("");
    log(`  ${c.bold}Flags:${c.reset}`);
    log(
      `    ${c.cyan}--dry-run, -n${c.reset}     Preview what would be installed`
    );
    log(
      `    ${c.cyan}--diff, -d${c.reset}        Show diff of changes`
    );
    log(
      `    ${c.cyan}--overwrite, -f${c.reset}   Force overwrite existing files`
    );
    log("");
    process.exit(1);
  }

  const isDryRun = flags.dryRun;
  const showDiff = flags.diff;
  const forceOverwrite = flags.overwrite;

  if (isDryRun) {
    log(
      `  ${c.bgYellow}${c.bold} DRY RUN ${c.reset} ${c.yellow}No files will be written.${c.reset}`
    );
    log("");
  }

  const allDeps: Set<string> = new Set();
  let totalFiles = 0;

  for (const componentName of componentNames) {
    if (componentNames.length > 1) {
      log(`${c.dim}  ${"─".repeat(50)}${c.reset}`);
    }
    info(`Installing ${c.bold}${componentName}${c.reset}...`);
    log("");

    // Fetch component registry JSON
    const spinner = new Spinner(
      `Fetching ${componentName} from registry...`
    );
    let registry: any;
    try {
      spinner.start();
      registry = await resolveRegistryJSON(componentName);
      spinner.stop(`Fetched ${c.bold}${componentName}${c.reset} metadata`);
    } catch (err: any) {
      spinner.fail(`Failed to fetch ${componentName}`);
      log("");
      error(err.message);

      // Suggest similar component names
      try {
        const index = await resolveIndexJSON();
        const items: any[] = index.items || [];
        const similar = items
          .filter((item) => {
            const name = item.name as string;
            return (
              name.includes(componentName) ||
              componentName.includes(name) ||
              levenshteinClose(name, componentName)
            );
          })
          .slice(0, 5);

        if (similar.length > 0) {
          log("");
          log(`  ${c.bold}Did you mean:${c.reset}`);
          for (const s of similar) {
            log(`    ${c.cyan}${s.name}${c.reset}`);
          }
        }
      } catch {
        // ignore suggestion errors
      }

      log("");
      if (componentNames.length > 1) continue;
      process.exit(1);
    }

    if (!registry.files || registry.files.length === 0) {
      error(`Component "${componentName}" has no files defined.`);
      if (componentNames.length > 1) continue;
      process.exit(1);
    }

    // Collect deps
    for (const dep of registry.dependencies || []) {
      allDeps.add(dep);
    }

    // Process each file from the registry
    for (const file of registry.files) {
      const targetPath = file.target || file.path;
      const fullPath = path.resolve(process.cwd(), targetPath);
      const dir = path.dirname(fullPath);
      const fileExists = fs.existsSync(fullPath);

      if (showDiff || isDryRun) {
        // Show diff
        const { diff, isNew } = generateDiff(fullPath, file.content);
        const status = isNew
          ? `${c.green}[new]${c.reset}`
          : fileExists
            ? `${c.yellow}[modified]${c.reset}`
            : `${c.green}[new]${c.reset}`;

        log(`  ${status} ${c.dim}${targetPath}${c.reset}`);

        if (showDiff) {
          log("");
          log(diff);
          log("");
        }
      }

      if (!isDryRun) {
        if (fileExists && !forceOverwrite) {
          if (process.stdin.isTTY && !flags.overwrite) {
            const answer = await prompt(
              `${c.yellow}  ? ${c.reset}${c.dim}${targetPath}${c.reset} already exists. Overwrite? ${c.dim}(y/N)${c.reset} `
            );
            if (answer !== "y" && answer !== "yes") {
              warn(`Skipped ${c.dim}${targetPath}${c.reset}`);
              continue;
            }
          } else if (!forceOverwrite) {
            warn(
              `${c.dim}${targetPath}${c.reset} already exists. Use ${c.bold}--overwrite${c.reset} to replace.`
            );
            continue;
          }
        }

        ensureDir(dir);
        fs.writeFileSync(fullPath, file.content);
        success(`Written ${c.dim}${targetPath}${c.reset}`);
      }

      totalFiles++;
    }

    // Print usage example
    if (!isDryRun && !showDiff) {
      const mainFile = registry.files[0];
      const importPath = (mainFile.target || mainFile.path)
        .replace(/\.tsx?$/, "")
        .replace(/^components\//, "@/components/");

      log("");
      log(`  ${c.dim}Import:${c.reset}`);
      log(
        `  ${c.dim}import { ${toPascalCase(componentName)} } from "${importPath}";${c.reset}`
      );
    }
  }

  // Summary
  log("");
  if (isDryRun) {
    log(`${c.dim}  ${"─".repeat(50)}${c.reset}`);
    log("");
    info(
      `${c.bold}Dry run summary:${c.reset} ${totalFiles} file(s) would be written.`
    );

    if (allDeps.size > 0) {
      log("");
      info(`Dependencies that would be needed:`);
      log(
        `  ${c.cyan}npm install ${[...allDeps].join(" ")}${c.reset}`
      );
    }

    log("");
    log(
      `  ${c.dim}Run without ${c.cyan}--dry-run${c.dim} to apply changes.${c.reset}`
    );
    log("");
    return;
  }

  // Show dependencies
  if (allDeps.size > 0) {
    log("");
    log(`${c.dim}  ${"─".repeat(50)}${c.reset}`);
    log("");
    info(`Dependencies: ${c.bold}${[...allDeps].join(", ")}${c.reset}`);

    if (process.stdin.isTTY) {
      const answer = await prompt(
        `${c.cyan}  ? ${c.reset}Install dependencies with npm? ${c.dim}(y/N)${c.reset} `
      );

      if (answer === "y" || answer === "yes") {
        const { execSync } = require("child_process");
        const depSpinner = new Spinner("Installing dependencies...");
        try {
          depSpinner.start();
          execSync(`npm install ${[...allDeps].join(" ")}`, {
            stdio: "pipe",
          });
          depSpinner.stop("Dependencies installed.");
        } catch {
          depSpinner.fail("Failed to install dependencies.");
          log("");
          warn("Install manually:");
          log(
            `  ${c.cyan}npm install ${[...allDeps].join(" ")}${c.reset}`
          );
        }
      } else {
        log("");
        log(`  ${c.dim}Install manually:${c.reset}`);
        log(
          `  ${c.cyan}npm install ${[...allDeps].join(" ")}${c.reset}`
        );
      }
    } else {
      log("");
      log(`  ${c.dim}Install dependencies:${c.reset}`);
      log(
        `  ${c.cyan}npm install ${[...allDeps].join(" ")}${c.reset}`
      );
    }
  }

  log("");
  success(
    `${c.bold}${componentNames.length === 1 ? componentNames[0] : `${componentNames.length} components`}${c.reset} installed!`
  );
  log("");
}

async function commandList(flags: ParsedArgs["flags"]) {
  banner();

  const spinner = new Spinner("Fetching component index...");
  spinner.start();

  let index: any;
  try {
    index = await resolveIndexJSON();
    spinner.stop("Component index loaded.");
  } catch (err: any) {
    spinner.fail("Failed to fetch component index.");
    log("");
    error(err.message);
    process.exit(1);
  }

  log("");

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

  // Detect installed components
  const installed = getInstalledComponents();
  const installedCount = unique.filter((i) => installed.has(i.name)).length;

  // Add category info
  const categorized = unique.map((item) => ({
    ...item,
    category: inferCategory(item.name),
  }));

  // Filter by category if requested
  const filterCategory = flags.category;
  const filtered = filterCategory
    ? categorized.filter(
        (item) =>
          item.category.toLowerCase() === filterCategory.toLowerCase()
      )
    : categorized;

  if (filterCategory && filtered.length === 0) {
    warn(`No components found in category "${filterCategory}".`);
    log("");
    log(`  ${c.bold}Available categories:${c.reset}`);
    const cats = new Set(categorized.map((i) => i.category));
    for (const cat of [...cats].sort()) {
      log(`    ${c.cyan}${cat}${c.reset}`);
    }
    log("");
    return;
  }

  // Group by category
  const groups = new Map<string, typeof filtered>();
  for (const item of filtered) {
    const cat = item.category;
    if (!groups.has(cat)) groups.set(cat, []);
    groups.get(cat)!.push(item);
  }

  // Sort categories alphabetically, render
  const sortedCategories = [...groups.keys()].sort();
  const maxNameLen = Math.max(...filtered.map((i) => i.name.length));

  for (const category of sortedCategories) {
    const items = groups.get(category)!;
    log(`  ${c.bold}${c.magenta}${category}${c.reset} ${c.dim}(${items.length})${c.reset}`);
    log("");

    for (const item of items) {
      const isInstalled = installed.has(item.name);
      const status = isInstalled
        ? `${c.green}\u2714${c.reset}`
        : `${c.dim}\u2022${c.reset}`;
      const padded = item.name.padEnd(maxNameLen + 2);
      const installedTag = isInstalled
        ? ` ${c.green}${c.dim}[installed]${c.reset}`
        : "";

      log(
        `    ${status} ${c.cyan}${padded}${c.reset}${c.dim}${truncate(item.description || "", 60)}${c.reset}${installedTag}`
      );
    }
    log("");
  }

  log(`${c.dim}  ${"─".repeat(50)}${c.reset}`);
  log("");
  log(
    `  ${c.bold}${filtered.length}${c.reset} components available` +
      (installedCount > 0
        ? ` ${c.dim}(${c.green}${installedCount} installed${c.dim})${c.reset}`
        : "")
  );
  log("");
  log(`  ${c.dim}Install:${c.reset}  ${c.cyan}npx flexui add <name>${c.reset}`);
  log(
    `  ${c.dim}Filter:${c.reset}   ${c.cyan}npx flexui list --category "Buttons"${c.reset}`
  );
  log("");
}

function commandHelp() {
  banner();
  log(`${c.bold}  Usage:${c.reset}`);
  log("");
  log(
    `    ${c.cyan}flexui${c.reset} ${c.bold}init${c.reset}                        Set up FlexUI in your project`
  );
  log(
    `    ${c.cyan}flexui${c.reset} ${c.bold}add${c.reset} ${c.dim}<name> [names...]${c.reset}       Install one or more components`
  );
  log(
    `    ${c.cyan}flexui${c.reset} ${c.bold}list${c.reset}                        List all available components`
  );
  log(
    `    ${c.cyan}flexui${c.reset} ${c.bold}theme${c.reset} ${c.dim}<list|apply> [name]${c.reset}   Manage themes`
  );
  log(
    `    ${c.cyan}flexui${c.reset} ${c.bold}help${c.reset}                        Show this help message`
  );
  log("");
  log(`${c.bold}  Flags:${c.reset}`);
  log("");
  log(
    `    ${c.cyan}--dry-run, -n${c.reset}       Preview what would be installed (no file writes)`
  );
  log(
    `    ${c.cyan}--diff, -d${c.reset}          Show a diff of the changes before applying`
  );
  log(
    `    ${c.cyan}--overwrite, -f${c.reset}     Force overwrite existing files without prompting`
  );
  log(
    `    ${c.cyan}--category, -c${c.reset}      Filter list by category (e.g. "Buttons")`
  );
  log(
    `    ${c.cyan}--version, -v${c.reset}       Print CLI version`
  );
  log(
    `    ${c.cyan}--help, -h${c.reset}          Show help (works on any command)`
  );
  log("");
  log(`${c.bold}  Examples:${c.reset}`);
  log("");
  log(`    ${c.dim}# Initialize FlexUI in your project${c.reset}`);
  log(`    ${c.cyan}$ npx flexui init${c.reset}`);
  log("");
  log(`    ${c.dim}# Install a single component${c.reset}`);
  log(`    ${c.cyan}$ npx flexui add shimmer-button${c.reset}`);
  log("");
  log(`    ${c.dim}# Install multiple components at once${c.reset}`);
  log(`    ${c.cyan}$ npx flexui add shimmer-button spotlight-card toast${c.reset}`);
  log("");
  log(`    ${c.dim}# Preview what would be installed${c.reset}`);
  log(`    ${c.cyan}$ npx flexui add shimmer-button --dry-run${c.reset}`);
  log("");
  log(`    ${c.dim}# See file diffs before installing${c.reset}`);
  log(`    ${c.cyan}$ npx flexui add shimmer-button --diff${c.reset}`);
  log("");
  log(`    ${c.dim}# Overwrite existing files without prompting${c.reset}`);
  log(`    ${c.cyan}$ npx flexui add shimmer-button --overwrite${c.reset}`);
  log("");
  log(`    ${c.dim}# List all components, grouped by category${c.reset}`);
  log(`    ${c.cyan}$ npx flexui list${c.reset}`);
  log("");
  log(`    ${c.dim}# Filter by category${c.reset}`);
  log(`    ${c.cyan}$ npx flexui list --category "Buttons"${c.reset}`);
  log("");
  log(`    ${c.dim}# List available themes${c.reset}`);
  log(`    ${c.cyan}$ npx flexui theme list${c.reset}`);
  log("");
  log(`    ${c.dim}# Apply a theme${c.reset}`);
  log(`    ${c.cyan}$ npx flexui theme apply ocean${c.reset}`);
  log("");
}

// ── Theme Command ───────────────────────────────────────────────────────────

const THEMES: Record<string, { label: string; accent: string; description: string }> = {
  midnight: { label: "Midnight", accent: "#8B5CF6", description: "Deep blacks, violet accents, glass surfaces" },
  ocean:    { label: "Ocean",    accent: "#06B6D4", description: "Deep sea blues and teals — calm, professional" },
  forest:   { label: "Forest",   accent: "#10B981", description: "Rich emerald greens — natural, grounded" },
  sunset:   { label: "Sunset",   accent: "#F97316", description: "Warm ambers and roses — vibrant, bold" },
  neon:     { label: "Neon",     accent: "#00FF88", description: "Electric neon on black — cyberpunk, futuristic" },
  corporate:{ label: "Corporate",accent: "#6366F1", description: "Clean slate tones — enterprise-ready" },
};

async function commandTheme(subcommand: string, args: string[]) {
  switch (subcommand) {
    case "list":
    case "ls": {
      log("");
      log(`${c.bold}  Available Themes${c.reset}`);
      log("");
      for (const [name, theme] of Object.entries(THEMES)) {
        const dot = `${c.magenta}\u25CF${c.reset}`;
        log(`  ${dot}  ${c.bold}${theme.label.padEnd(12)}${c.reset} ${c.dim}(${name})${c.reset}`);
        log(`     ${c.gray}${theme.description}${c.reset}`);
        log("");
      }
      log(`  ${c.dim}Apply a theme:${c.reset} ${c.cyan}flexui theme apply <name>${c.reset}`);
      log("");
      break;
    }

    case "apply":
    case "set": {
      const themeName = args[0];
      if (!themeName) {
        error("Please specify a theme name.");
        log(`  ${c.dim}Available:${c.reset} ${Object.keys(THEMES).join(", ")}`);
        process.exit(1);
      }
      if (!THEMES[themeName]) {
        error(`Unknown theme: "${themeName}"`);
        log(`  ${c.dim}Available:${c.reset} ${Object.keys(THEMES).join(", ")}`);
        const similar = Object.keys(THEMES).filter((t) => levenshteinClose(t, themeName));
        if (similar.length > 0) {
          log(`  ${c.bold}Did you mean:${c.reset} ${similar.map((s) => `${c.cyan}${s}${c.reset}`).join(", ")}`);
        }
        process.exit(1);
      }

      const configPath = path.join(process.cwd(), "flexui.theme.json");
      const config = { theme: themeName, updatedAt: new Date().toISOString() };
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
      success(`Theme set to ${c.bold}${THEMES[themeName].label}${c.reset}`);
      log("");
      hint(`Config written to ${c.dim}flexui.theme.json${c.reset}`);
      hint(`Import ThemeProvider and set defaultTheme="${themeName}" in your layout.`);
      log("");
      break;
    }

    default: {
      if (subcommand && THEMES[subcommand]) {
        // Allow `flexui theme ocean` as shorthand for `flexui theme apply ocean`
        await commandTheme("apply", [subcommand]);
        return;
      }
      log("");
      log(`${c.bold}  Theme Commands${c.reset}`);
      log("");
      log(`    ${c.cyan}flexui theme list${c.reset}            List all available themes`);
      log(`    ${c.cyan}flexui theme apply <name>${c.reset}    Apply a theme to your project`);
      log("");
      log(`  ${c.dim}Available themes:${c.reset} ${Object.keys(THEMES).join(", ")}`);
      log("");
      break;
    }
  }
}

// ── Utility: truncate ────────────────────────────────────────────────────────

function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 1) + "\u2026";
}

// ── Utility: fuzzy match for suggestions ─────────────────────────────────────

function levenshteinClose(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 3) return false;
  let distance = 0;
  const maxLen = Math.max(a.length, b.length);
  for (let i = 0; i < maxLen; i++) {
    if (a[i] !== b[i]) distance++;
    if (distance > 3) return false;
  }
  return distance <= 3;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const parsed = parseArgs(process.argv);

  // Handle --version at top level
  if (parsed.flags.version) {
    log(`flexui v${CLI_VERSION}`);
    return;
  }

  // Handle --help at top level (no command)
  if (!parsed.command && parsed.flags.help) {
    commandHelp();
    return;
  }

  // Handle --help for specific commands
  if (parsed.flags.help && parsed.command) {
    commandHelp();
    return;
  }

  const command = parsed.command;

  switch (command) {
    case "init":
      await commandInit(parsed.flags);
      break;

    case "add":
    case "install":
    case "i":
      await commandAdd(parsed.positional, parsed.flags);
      break;

    case "list":
    case "ls":
      await commandList(parsed.flags);
      break;

    case "theme":
      await commandTheme(parsed.positional[0] || "", parsed.positional.slice(1));
      break;

    case "help":
      commandHelp();
      break;

    case "--version":
    case "-v":
      log(`flexui v${CLI_VERSION}`);
      break;

    case "--help":
    case "-h":
      commandHelp();
      break;

    default:
      if (command) {
        error(`Unknown command: "${command}"`);
        log("");

        // Suggest similar commands
        const commands = ["init", "add", "list", "theme", "help"];
        const similar = commands.filter((cmd) =>
          levenshteinClose(cmd, command)
        );
        if (similar.length > 0) {
          log(`  ${c.bold}Did you mean:${c.reset}`);
          for (const s of similar) {
            log(`    ${c.cyan}flexui ${s}${c.reset}`);
          }
          log("");
        }
      }
      commandHelp();
      if (command) process.exit(1);
      break;
  }
}

main().catch((err) => {
  log("");
  error(err.message || String(err));
  log("");

  if (err.code === "ENOENT") {
    hint("A required file or directory was not found.");
    hint(
      `Make sure you are in the project root directory.`
    );
  } else if (err.code === "EACCES") {
    hint("Permission denied. Check file permissions or try with sudo.");
  } else if (
    err.code === "ENOTFOUND" ||
    err.code === "ETIMEDOUT" ||
    err.code === "EAI_AGAIN"
  ) {
    hint("Network error. Check your internet connection.");
    hint(
      `The FlexUI registry is at ${c.dim}https://flexui.dev/r/${c.reset}`
    );
  } else if (err.stack && process.env.DEBUG) {
    log(`${c.dim}${err.stack}${c.reset}`);
  }

  log("");
  process.exit(1);
});
