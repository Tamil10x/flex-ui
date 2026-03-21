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
    name: "cosmic-eye",
    type: "registry:ui",
    title: "Cosmic Eye",
    description:
      "A WebGL shader-based animated eye effect with cosmic nebula colors, mouse-tracking pupil, and organic noise textures.",
    dependencies: ["ogl"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/cosmic-eye.tsx",
        target: "components/flexui/cosmic-eye.tsx",
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
  {
    name: "holographic-card",
    type: "registry:ui",
    title: "Holographic Card",
    description:
      "A card with a real-time rainbow holographic foil effect that shifts with viewing angle, like a Pokemon holographic card.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/holographic-card.tsx",
        target: "components/flexui/holographic-card.tsx",
      },
    ],
  },
  {
    name: "handwritten-annotation",
    type: "registry:ui",
    title: "Handwritten Annotation",
    description:
      "SVG annotations (circles, underlines, highlights, arrows, brackets, strikethroughs) that animate as if being drawn by hand in real-time.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/handwritten-annotation.tsx",
        target: "components/flexui/handwritten-annotation.tsx",
      },
    ],
  },
  {
    name: "moving-border",
    type: "registry:ui",
    title: "Moving Border",
    description:
      "An animated gradient light that travels along the border of an element using CSS keyframe rotation of a conic-gradient.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/moving-border.tsx",
        target: "components/flexui/moving-border.tsx",
      },
    ],
  },
  {
    name: "shader-blob",
    type: "registry:ui",
    title: "Shader Blob",
    description:
      "A real-time GLSL metaball/blob that morphs organically using FBM noise, reacts to cursor, and emits a soft emissive glow with two-tone color gradients.",
    dependencies: ["ogl"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/shader-blob.tsx",
        target: "components/flexui/shader-blob.tsx",
      },
    ],
  },
  {
    name: "liquid-button",
    type: "registry:ui",
    title: "Liquid Button",
    description:
      "A button whose surface ripples like liquid mercury when hovered and clicked, with organic spring-physics ripple waves from cursor position.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/liquid-button.tsx",
        target: "components/flexui/liquid-button.tsx",
      },
    ],
  },
  {
    name: "morphing-blob",
    type: "registry:ui",
    title: "Morphing Blob",
    description:
      "An SVG blob that continuously morphs between organic shapes using requestAnimationFrame interpolation with configurable gradient fill, speed, and size.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/morphing-blob.tsx",
        target: "components/flexui/morphing-blob.tsx",
      },
    ],
  },
  {
    name: "chromatic-text",
    type: "registry:ui",
    title: "Chromatic Text",
    description:
      "Text with chromatic aberration -- RGB channels split on hover or always active with configurable offset and colors.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/chromatic-text.tsx",
        target: "components/flexui/chromatic-text.tsx",
      },
    ],
  },
  { name: "disintegration-effect", type: "registry:ui", title: "Disintegration Effect", description: "Thanos-snap particle dissolve effect wrapper.", dependencies: ["framer-motion"], registryDependencies: [], files: [{ path: "components/flexui/disintegration-effect.tsx", target: "components/flexui/disintegration-effect.tsx" }] },
  { name: "liquid-button", type: "registry:ui", title: "Liquid Button", description: "Button with liquid mercury ripple effect on click.", dependencies: ["framer-motion"], registryDependencies: [], files: [{ path: "components/flexui/liquid-button.tsx", target: "components/flexui/liquid-button.tsx" }] },
  { name: "morphing-blob", type: "registry:ui", title: "Morphing Blob", description: "SVG blob that continuously morphs between organic shapes.", dependencies: [], registryDependencies: [], files: [{ path: "components/flexui/morphing-blob.tsx", target: "components/flexui/morphing-blob.tsx" }] },
  { name: "neural-network", type: "registry:ui", title: "Neural Network", description: "Canvas-based animated network graph with firing synapses.", dependencies: [], registryDependencies: [], files: [{ path: "components/flexui/neural-network.tsx", target: "components/flexui/neural-network.tsx" }] },
  { name: "gravity-grid", type: "registry:ui", title: "Gravity Grid", description: "Grid of dots that attract or repel from cursor.", dependencies: [], registryDependencies: [], files: [{ path: "components/flexui/gravity-grid.tsx", target: "components/flexui/gravity-grid.tsx" }] },
  { name: "typewriter-terminal", type: "registry:ui", title: "Typewriter Terminal", description: "Realistic terminal emulator with typing animation.", dependencies: [], registryDependencies: [], files: [{ path: "components/flexui/typewriter-terminal.tsx", target: "components/flexui/typewriter-terminal.tsx" }] },
  { name: "browser-frame", type: "registry:ui", title: "Browser Frame", description: "Browser window mockup for showcasing content.", dependencies: [], registryDependencies: [], files: [{ path: "components/flexui/browser-frame.tsx", target: "components/flexui/browser-frame.tsx" }] },
  { name: "phone-frame", type: "registry:ui", title: "Phone Frame", description: "Mobile phone device mockup frame.", dependencies: [], registryDependencies: [], files: [{ path: "components/flexui/phone-frame.tsx", target: "components/flexui/phone-frame.tsx" }] },
  { name: "animated-beam", type: "registry:ui", title: "Animated Beam", description: "Light beam that travels along SVG paths for integration diagrams.", dependencies: [], registryDependencies: [], files: [{ path: "components/flexui/animated-beam.tsx", target: "components/flexui/animated-beam.tsx" }] },
  { name: "data-orbit", type: "registry:ui", title: "Data Orbit", description: "Icons orbiting in concentric rings around a center element.", dependencies: [], registryDependencies: [], files: [{ path: "components/flexui/data-orbit.tsx", target: "components/flexui/data-orbit.tsx" }] },
  {
    name: "audio-reactive-wave",
    type: "registry:ui",
    title: "Audio Reactive Wave",
    description:
      "A waveform visualizer with gradient-colored bars that react to audio input or generate animated demo sine waves with glow effects.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/audio-reactive-wave.tsx",
        target: "components/flexui/audio-reactive-wave.tsx",
      },
    ],
  },
  {
    name: "portal-transition",
    type: "registry:ui",
    title: "Portal Transition",
    description:
      "A circular portal/wormhole transition effect that reveals content with expanding clip-path, glow ring, and particle effects.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/portal-transition.tsx",
        target: "components/flexui/portal-transition.tsx",
      },
    ],
  },
  { name: "split-screen-reveal", type: "registry:ui", title: "Split Screen Reveal", description: "Two glassmorphic panels that split apart on click to reveal content underneath with spring-physics animation.", dependencies: ["framer-motion"], registryDependencies: [], files: [{ path: "components/flexui/split-screen-reveal.tsx", target: "components/flexui/split-screen-reveal.tsx" }] },
  { name: "smoke-divider", type: "registry:ui", title: "Smoke Divider", description: "A section divider with animated smoke/fog particles drifting across. Pure CSS animation with hydration-safe seeded randomization.", dependencies: [], registryDependencies: [], files: [{ path: "components/flexui/smoke-divider.tsx", target: "components/flexui/smoke-divider.tsx" }] },
  { name: "glitch-transition", type: "registry:ui", title: "Glitch Transition", description: "A CRT TV glitch effect with RGB split, scanlines, block displacement, and flicker that wraps any content.", dependencies: ["framer-motion"], registryDependencies: [], files: [{ path: "components/flexui/glitch-transition.tsx", target: "components/flexui/glitch-transition.tsx" }] },
  { name: "ambient-tilt", type: "registry:ui", title: "Ambient Tilt", description: "A wrapper that adds subtle 3D tilt based on cursor position or device gyroscope with spring-animated transforms.", dependencies: ["framer-motion"], registryDependencies: [], files: [{ path: "components/flexui/ambient-tilt.tsx", target: "components/flexui/ambient-tilt.tsx" }] },
  { name: "icon-cloud", type: "registry:ui", title: "Icon Cloud", description: "A 3D tag cloud of floating icons that rotate as a sphere with drag interaction and depth-based scaling.", dependencies: [], registryDependencies: [], files: [{ path: "components/flexui/icon-cloud.tsx", target: "components/flexui/icon-cloud.tsx" }] },
  { name: "retro-grid", type: "registry:ui", title: "Retro Grid", description: "A perspective grid that vanishes to a horizon point with a retro synthwave aesthetic and optional scroll animation.", dependencies: [], registryDependencies: [], files: [{ path: "components/flexui/retro-grid.tsx", target: "components/flexui/retro-grid.tsx" }] },
  { name: "evolution-hero", type: "registry:ui", title: "Evolution Hero", description: "Cinematic hero section with AI-generated evolution scene background, mouse parallax, holographic code overlays, and scanning effects.", dependencies: ["framer-motion"], registryDependencies: [], files: [{ path: "components/flexui/evolution-hero.tsx", target: "components/flexui/evolution-hero.tsx" }] },
  { name: "water-ripple", type: "registry:ui", title: "Water Ripple", description: "WebGL water ripple displacement effect on any image with interactive cursor-driven waves.", dependencies: [], registryDependencies: [], files: [{ path: "components/flexui/water-ripple.tsx", target: "components/flexui/water-ripple.tsx" }] },
  { name: "kpi-card", type: "registry:ui", title: "KPI Card", description: "Dashboard KPI card with animated number counter, change indicator, and optional sparkline.", dependencies: ["framer-motion"], registryDependencies: [], files: [{ path: "components/flexui/kpi-card.tsx", target: "components/flexui/kpi-card.tsx" }] },
  { name: "sparkline-chart", type: "registry:ui", title: "Sparkline Chart", description: "Pure SVG sparkline with smooth bezier curves and optional animated drawing.", dependencies: ["framer-motion"], registryDependencies: [], files: [{ path: "components/flexui/sparkline-chart.tsx", target: "components/flexui/sparkline-chart.tsx" }] },
  { name: "progress-ring", type: "registry:ui", title: "Progress Ring", description: "SVG progress ring with animated stroke and configurable gradient.", dependencies: ["framer-motion"], registryDependencies: [], files: [{ path: "components/flexui/progress-ring.tsx", target: "components/flexui/progress-ring.tsx" }] },
  {
    name: "splash-cursor",
    type: "registry:ui",
    title: "Splash Cursor",
    description:
      "A fluid ink splash effect that follows the cursor with colorful blobs, blur trails, and velocity-based motion using Canvas 2D.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/splash-cursor.tsx",
        target: "components/flexui/splash-cursor.tsx",
      },
    ],
  },
  {
    name: "flickering-grid",
    type: "registry:ui",
    title: "Flickering Grid",
    description:
      "A canvas-rendered grid of cells that randomly flicker on and off with smooth opacity transitions and a radial fade mask.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/flickering-grid.tsx",
        target: "components/flexui/flickering-grid.tsx",
      },
    ],
  },
  {
    name: "border-beam",
    type: "registry:ui",
    title: "Border Beam",
    description:
      "A continuous animated light beam that travels around the border of an element using CSS conic-gradient rotation with a glow trail.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/border-beam.tsx",
        target: "components/flexui/border-beam.tsx",
      },
    ],
  },
  {
    name: "neon-glow-card",
    type: "registry:ui",
    title: "Neon Glow Card",
    description:
      "A card with animated neon border glow that pulses and reacts to cursor position with multiple box-shadow layers and spring-scale hover.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/neon-glow-card.tsx",
        target: "components/flexui/neon-glow-card.tsx",
      },
    ],
  },
  {
    name: "infinite-canvas",
    type: "registry:ui",
    title: "Infinite Canvas",
    description:
      "A pannable, zoomable canvas where child elements float in 2D space with grid background, mouse wheel zoom, and touch pinch support.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/flexui/infinite-canvas.tsx",
        target: "components/flexui/infinite-canvas.tsx",
      },
    ],
  },
  {
    name: "cinematic-hero",
    type: "registry:ui",
    title: "Cinematic Hero",
    description:
      "A full-screen cinematic hero section with multiple background variants, staggered word blur-reveal headline, animated CTAs, and badge.",
    dependencies: ["framer-motion"],
    registryDependencies: ["particle-field", "grid-pattern", "stars-background", "aurora-background"],
    files: [
      {
        path: "components/flexui/cinematic-hero.tsx",
        target: "components/flexui/cinematic-hero.tsx",
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
