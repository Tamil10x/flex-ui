import * as fs from "fs";
import * as path from "path";

// ─── Configuration ──────────────────────────────────────────────────────────

const BASE_URL = "https://flexui.dev";

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
  {
    name: "interactive-globe",
    type: "registry:ui",
    title: "Interactive Globe",
    description:
      "A 3D interactive globe component powered by Three.js and three-globe with customizable arcs, points, and atmosphere rendering.",
    dependencies: ["three", "three-globe", "@react-three/fiber", "@react-three/drei"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/interactive-globe.tsx",
        target: "components/flexui/interactive-globe.tsx",
      },
      {
        path: "components/ui/globe.tsx",
        target: "components/ui/globe.tsx",
      },
      {
        path: "data/globe.json",
        target: "data/globe.json",
      },
    ],
  },
  {
    name: "expandable-card",
    type: "registry:ui",
    title: "Expandable Card",
    description:
      "An expandable card component with smooth Framer Motion animations that reveals additional content on interaction.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/expandable-card.tsx",
        target: "components/flexui/expandable-card.tsx",
      },
    ],
  },
  {
    name: "reflective-card",
    type: "registry:ui",
    title: "Reflective Card",
    description:
      "A card component with a reflective surface effect powered by Framer Motion animations that responds to cursor movement.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/reflective-card.tsx",
        target: "components/flexui/reflective-card.tsx",
      },
    ],
  },
  {
    name: "shimmer-button",
    type: "registry:ui",
    title: "Shimmer Button",
    description:
      "A button with a continuous diagonal shimmer sweep effect, configurable color, and spring-physics hover interactions.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/shimmer-button.tsx",
        target: "components/flexui/shimmer-button.tsx",
      },
    ],
  },
  {
    name: "text-reveal",
    type: "registry:ui",
    title: "Text Reveal",
    description:
      "Text animation that reveals characters or words with staggered blur-in effect on scroll into view.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/text-reveal.tsx",
        target: "components/flexui/text-reveal.tsx",
      },
    ],
  },
  {
    name: "number-ticker",
    type: "registry:ui",
    title: "Number Ticker",
    description:
      "Animated number counter with spring physics that ticks up to a target value when scrolled into view.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/number-ticker.tsx",
        target: "components/flexui/number-ticker.tsx",
      },
    ],
  },
  {
    name: "dock-menu",
    type: "registry:ui",
    title: "Dock Menu",
    description:
      "A macOS-style dock with smooth magnification effect powered by Framer Motion spring physics and motion values.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/dock-menu.tsx",
        target: "components/flexui/dock-menu.tsx",
      },
    ],
  },
  {
    name: "spotlight-card",
    type: "registry:ui",
    title: "Spotlight Card",
    description:
      "A glassmorphic card with a cursor-following spotlight radial gradient, border glow, and hover effects.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/spotlight-card.tsx",
        target: "components/flexui/spotlight-card.tsx",
      },
    ],
  },
  {
    name: "drawer",
    type: "registry:ui",
    title: "Drawer",
    description:
      "An animated bottom sheet / side drawer with spring physics, backdrop blur overlay, ESC-to-close, click-outside dismiss, and body scroll lock.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/drawer.tsx",
        target: "components/flexui/drawer.tsx",
      },
    ],
  },
  {
    name: "toast",
    type: "registry:ui",
    title: "Toast",
    description:
      "A context-based toast notification system with spring-physics animations, auto-dismiss, four color-coded types, and stacked positioning.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/toast.tsx",
        target: "components/flexui/toast.tsx",
      },
    ],
  },
  {
    name: "animated-tabs",
    type: "registry:ui",
    title: "Animated Tabs",
    description:
      "A tab component with a sliding animated indicator and smooth fade+slide content transitions. Three variants with spring physics.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/animated-tabs.tsx",
        target: "components/flexui/animated-tabs.tsx",
      },
    ],
  },
  {
    name: "marquee",
    type: "registry:ui",
    title: "Marquee",
    description:
      "A reusable infinite horizontal scrolling component with pure CSS animation, configurable speed, direction, and hover-to-pause.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/marquee.tsx",
        target: "components/flexui/marquee.tsx",
      },
    ],
  },
  {
    name: "flip-words",
    type: "registry:ui",
    title: "Flip Words",
    description:
      "Words that flip and rotate in and out with 3D perspective animation and spring physics.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/flip-words.tsx",
        target: "components/flexui/flip-words.tsx",
      },
    ],
  },
  {
    name: "wavy-text",
    type: "registry:ui",
    title: "Wavy Text",
    description:
      "Text where each character animates in with a staggered wave pattern using spring physics on viewport entry.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/wavy-text.tsx",
        target: "components/flexui/wavy-text.tsx",
      },
    ],
  },
  {
    name: "typewriter-text",
    type: "registry:ui",
    title: "Typewriter Text",
    description:
      "A typewriter effect that types text character by character with a blinking cursor, cycling through an array of words.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/typewriter-text.tsx",
        target: "components/flexui/typewriter-text.tsx",
      },
    ],
  },
  {
    name: "gradient-text",
    type: "registry:ui",
    title: "Gradient Text",
    description:
      "Animated gradient text with flowing color stops that shift across the text using a CSS keyframe animation.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/gradient-text.tsx",
        target: "components/flexui/gradient-text.tsx",
      },
    ],
  },
  {
    name: "text-scramble",
    type: "registry:ui",
    title: "Text Scramble",
    description:
      "Text that scrambles through random characters before resolving left-to-right with configurable speed and character set.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/text-scramble.tsx",
        target: "components/flexui/text-scramble.tsx",
      },
    ],
  },
  {
    name: "blur-text",
    type: "registry:ui",
    title: "Blur Text",
    description:
      "Text that fades in from a blurred state, word by word or all at once, with configurable blur amount and stagger.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/blur-text.tsx",
        target: "components/flexui/blur-text.tsx",
      },
    ],
  },
  {
    name: "split-text",
    type: "registry:ui",
    title: "Split Text",
    description:
      "Text animation that splits into characters or words with staggered slide, fade, or scale transitions on scroll.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/split-text.tsx",
        target: "components/flexui/split-text.tsx",
      },
    ],
  },
  {
    name: "rotating-text",
    type: "registry:ui",
    title: "Rotating Text",
    description:
      "Text that rotates through multiple strings with a rolling slot-machine effect using spring-physics transitions.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/rotating-text.tsx",
        target: "components/flexui/rotating-text.tsx",
      },
    ],
  },
  {
    name: "grid-pattern",
    type: "registry:ui",
    title: "Grid Pattern",
    description:
      "A subtle CSS grid background pattern with configurable cell size, line color, opacity, and an optional radial fade mask.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/grid-pattern.tsx",
        target: "components/flexui/grid-pattern.tsx",
      },
    ],
  },
  {
    name: "dot-pattern",
    type: "registry:ui",
    title: "Dot Pattern",
    description:
      "A dot matrix background pattern with configurable spacing, dot size, color, and an optional radial fade mask.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/dot-pattern.tsx",
        target: "components/flexui/dot-pattern.tsx",
      },
    ],
  },
  {
    name: "beams-background",
    type: "registry:ui",
    title: "Beams Background",
    description:
      "Animated light beams that sweep across the background with staggered delays and randomized angles. Pure CSS keyframes.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/beams-background.tsx",
        target: "components/flexui/beams-background.tsx",
      },
    ],
  },
  {
    name: "stars-background",
    type: "registry:ui",
    title: "Stars Background",
    description:
      "A twinkling star field background with randomly scattered stars that pulse in and out at varying speeds. Pure CSS keyframes.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/stars-background.tsx",
        target: "components/flexui/stars-background.tsx",
      },
    ],
  },
  {
    name: "mesh-gradient",
    type: "registry:ui",
    title: "Mesh Gradient",
    description:
      "An animated mesh gradient background with multiple color blobs that blend together using heavy CSS blur.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/mesh-gradient.tsx",
        target: "components/flexui/mesh-gradient.tsx",
      },
    ],
  },
  {
    name: "wavy-background",
    type: "registry:ui",
    title: "Wavy Background",
    description:
      "SVG-based animated wavy lines that drift horizontally in the background with decreasing opacity for depth.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/wavy-background.tsx",
        target: "components/flexui/wavy-background.tsx",
      },
    ],
  },
  {
    name: "aurora-background",
    type: "registry:ui",
    title: "Aurora Background",
    description:
      "A CSS-only animated aurora borealis background effect with soft blurred gradient bands that drift and rotate.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/aurora-background.tsx",
        target: "components/flexui/aurora-background.tsx",
      },
    ],
  },
  {
    name: "particle-field",
    type: "registry:ui",
    title: "Particle Field",
    description:
      "Floating particle dots that drift slowly across the background with CSS keyframe animations and randomized timing.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/particle-field.tsx",
        target: "components/flexui/particle-field.tsx",
      },
    ],
  },
  {
    name: "scroll-progress",
    type: "registry:ui",
    title: "Scroll Progress",
    description:
      "A fixed progress bar that animates from 0% to 100% based on page scroll using useScroll and useSpring for smooth spring-physics animation.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/scroll-progress.tsx",
        target: "components/flexui/scroll-progress.tsx",
      },
    ],
  },
  {
    name: "fade-on-scroll",
    type: "registry:ui",
    title: "Fade on Scroll",
    description:
      "A wrapper component that fades and slides children into view when scrolled into the viewport with configurable direction, distance, and spring physics.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/fade-on-scroll.tsx",
        target: "components/flexui/fade-on-scroll.tsx",
      },
    ],
  },
  {
    name: "scroll-counter",
    type: "registry:ui",
    title: "Scroll Counter",
    description:
      "An animated counter that counts from one number to another when scrolled into view using spring physics and direct DOM updates for performance.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/scroll-counter.tsx",
        target: "components/flexui/scroll-counter.tsx",
      },
    ],
  },
  {
    name: "glow-button",
    type: "registry:ui",
    title: "Glow Button",
    description:
      "A button with a pulsing glow shadow that intensifies on hover, using CSS keyframes and Framer Motion spring interactions.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/glow-button.tsx",
        target: "components/flexui/glow-button.tsx",
      },
    ],
  },
  {
    name: "ripple-button",
    type: "registry:ui",
    title: "Ripple Button",
    description:
      "A Material-design-style ripple effect button with expanding circles at the click position. Pure CSS animation, no Framer Motion.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/ripple-button.tsx",
        target: "components/flexui/ripple-button.tsx",
      },
    ],
  },
  {
    name: "gradient-border-button",
    type: "registry:ui",
    title: "Gradient Border Button",
    description:
      "A button with a continuously rotating conic-gradient border and solid dark inner background. Framer Motion hover/tap.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/gradient-border-button.tsx",
        target: "components/flexui/gradient-border-button.tsx",
      },
    ],
  },
  {
    name: "confetti-button",
    type: "registry:ui",
    title: "Confetti Button",
    description:
      "A button that bursts colorful confetti particles on click with random directions, colors, and rotations. Framer Motion hover/tap.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/confetti-button.tsx",
        target: "components/flexui/confetti-button.tsx",
      },
    ],
  },
  {
    name: "follow-cursor",
    type: "registry:ui",
    title: "Follow Cursor",
    description:
      "A decorative glowing dot that smoothly follows the cursor using Framer Motion spring physics with configurable stiffness and damping.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/follow-cursor.tsx",
        target: "components/flexui/follow-cursor.tsx",
      },
    ],
  },
  {
    name: "blob-cursor",
    type: "registry:ui",
    title: "Blob Cursor",
    description:
      "A morphing blob shape that follows the cursor with heavy spring inertia, CSS blur, and mix-blend-mode for an organic liquid feel.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/blob-cursor.tsx",
        target: "components/flexui/blob-cursor.tsx",
      },
    ],
  },
  {
    name: "spotlight-cursor",
    type: "registry:ui",
    title: "Spotlight Cursor",
    description:
      "A full-viewport radial gradient spotlight that follows the cursor, illuminating content beneath with useMotionTemplate for reactive CSS gradients.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/spotlight-cursor.tsx",
        target: "components/flexui/spotlight-cursor.tsx",
      },
    ],
  },
  {
    name: "otp-input",
    type: "registry:ui",
    title: "OTP Input",
    description:
      "An animated OTP/verification code input with auto-focus navigation, paste support, spring-physics glow on active input, and glass-morphic styling.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/otp-input.tsx",
        target: "components/flexui/otp-input.tsx",
      },
    ],
  },
  {
    name: "morphing-dialog",
    type: "registry:ui",
    title: "Morphing Dialog",
    description:
      "A dialog that morphs from its trigger element using shared layout animation with spring physics, backdrop blur, and glassmorphic styling.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/morphing-dialog.tsx",
        target: "components/flexui/morphing-dialog.tsx",
      },
    ],
  },
  {
    name: "morphing-card",
    type: "registry:ui",
    title: "Morphing Card",
    description:
      "A card that smoothly morphs between collapsed and expanded states using layout animation with spring physics and content crossfade.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/morphing-card.tsx",
        target: "components/flexui/morphing-card.tsx",
      },
    ],
  },
  {
    name: "floating-navbar",
    type: "registry:ui",
    title: "Floating Navbar",
    description: "A scroll-aware navbar that shrinks into a floating glassmorphic pill on scroll.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [{ path: "components/flexui/floating-navbar.tsx", target: "components/flexui/floating-navbar.tsx" }],
  },
  {
    name: "animated-input",
    type: "registry:ui",
    title: "Animated Input",
    description: "Text input with animated floating label and expanding underline on focus.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [{ path: "components/flexui/animated-input.tsx", target: "components/flexui/animated-input.tsx" }],
  },
  {
    name: "parallax-scroll",
    type: "registry:ui",
    title: "Parallax Scroll",
    description: "Wrapper that adds parallax scrolling to any content with configurable speed and direction.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [{ path: "components/flexui/parallax-scroll.tsx", target: "components/flexui/parallax-scroll.tsx" }],
  },
  {
    name: "sticky-scroll-reveal",
    type: "registry:ui",
    title: "Sticky Scroll Reveal",
    description: "Two-column layout with scrolling text sections and a sticky content panel.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [{ path: "components/flexui/sticky-scroll-reveal.tsx", target: "components/flexui/sticky-scroll-reveal.tsx" }],
  },
  {
    name: "cta-block",
    type: "registry:ui",
    title: "CTA Block",
    description: "A call-to-action section with animated gradient borders, radial glow background, and staggered entrance animation.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [{ path: "components/flexui/cta-block.tsx", target: "components/flexui/cta-block.tsx" }],
  },
  {
    name: "search-spotlight",
    type: "registry:ui",
    title: "Search Spotlight",
    description: "A macOS Spotlight / Raycast-style search dialog with keyboard navigation, category grouping, and spring animations.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: [],
    files: [{ path: "components/flexui/search-spotlight.tsx", target: "components/flexui/search-spotlight.tsx" }],
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
        url: `${BASE_URL}/r/${component.name}.json`,
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
