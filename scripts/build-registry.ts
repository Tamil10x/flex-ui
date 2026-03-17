import * as fs from "fs";
import * as path from "path";

// ─── Registry Component Definitions ─────────────────────────────────────────

interface RegistryFile {
  path: string;
  content: string;
  type: "registry:ui";
  target?: string;
}

interface RegistryComponent {
  name: string;
  type: "registry:ui";
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: { path: string; target: string }[];
}

interface RegistryOutput {
  $schema: string;
  name: string;
  type: "registry:ui";
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

// ─── Component Configuration ────────────────────────────────────────────────

const COMPONENTS: RegistryComponent[] = [
  {
    name: "magnetic-button",
    type: "registry:ui",
    title: "Magnetic Button",
    description:
      "A button that uses Framer Motion spring physics to magnetically pull toward the cursor on hover with a glowing spotlight border effect.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/magnetic-button.tsx",
        target: "components/flexui/magnetic-button.tsx",
      },
    ],
  },
  {
    name: "floating-panel",
    type: "registry:ui",
    title: "Floating Panel",
    description:
      "A headless, composable floating panel with glassmorphic styling, spring animations, position-aware anchoring, and built-in form support.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/floating-panel.tsx",
        target: "components/flexui/floating-panel.tsx",
      },
    ],
  },
  {
    name: "three-hover-card",
    type: "registry:ui",
    title: "3D Hover Card",
    description:
      "A premium card component that reveals a live Three.js 3D scene with a rotating icosahedron on hover. The canvas is lazy-loaded for performance.",
    dependencies: ["framer-motion", "three", "@react-three/fiber", "@react-three/drei"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/three-hover-card.tsx",
        target: "components/flexui/three-hover-card.tsx",
      },
      {
        path: "components/flexui/three-hover-card-scene.tsx",
        target: "components/flexui/three-hover-card-scene.tsx",
      },
    ],
  },
];

// ─── Build Logic ────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "r");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function buildComponent(component: RegistryComponent): RegistryOutput {
  const files: RegistryFile[] = component.files.map((file) => {
    const filePath = path.join(ROOT, file.path);
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return {
      path: file.target,
      content,
      type: "registry:ui" as const,
      target: file.target,
    };
  });

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: component.name,
    type: component.type,
    title: component.title,
    description: component.description,
    dependencies: component.dependencies,
    registryDependencies: component.registryDependencies,
    files,
  };
}

function main() {
  console.log("🔨 Building FlexUI registry...\n");
  ensureDir(OUT_DIR);

  const index: { name: string; type: string; description: string; url: string }[] = [];

  for (const component of COMPONENTS) {
    try {
      const output = buildComponent(component);
      const outPath = path.join(OUT_DIR, `${component.name}.json`);
      fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
      console.log(`  ✓ ${component.name}.json`);

      index.push({
        name: component.name,
        type: component.type,
        description: component.description,
        url: `/r/${component.name}.json`,
      });
    } catch (err) {
      console.error(`  ✗ ${component.name}: ${(err as Error).message}`);
      process.exit(1);
    }
  }

  // Write master index
  const indexPath = path.join(OUT_DIR, "index.json");
  fs.writeFileSync(
    indexPath,
    JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema/registry.json",
        name: "flexui",
        homepage: "https://flexui.dev",
        items: index,
      },
      null,
      2
    )
  );
  console.log(`  ✓ index.json`);
  console.log(`\n✅ Registry built successfully (${COMPONENTS.length} components)\n`);
}

main();
