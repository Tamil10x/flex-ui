<p align="center">
  <img src="public/logo.png" alt="FlexUI Logo" width="120" />
</p>

<h1 align="center">FlexUI</h1>

<p align="center">
  <strong>Flexible. Intuitive. Responsive.</strong><br/>
  A cinematic component registry for modern React apps.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-blue" alt="Version" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
  <img src="https://img.shields.io/badge/Next.js-16-black" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61dafb" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6" alt="TypeScript" />
</p>

---

## What is FlexUI?

FlexUI is a **premium, open-source component registry** built on the [shadcn/ui](https://ui.shadcn.com) protocol. It provides production-ready UI components with cinematic animations, spring physics, and interactive WebGL experiences — all designed for copy-paste ownership.

**FlexUI is NOT an npm package.** You add components directly into your project using the shadcn CLI, giving you full ownership and customization control over every line of code.

```bash
npx shadcn@latest add "https://your-domain.com/r/magnetic-button.json"
```

## Why FlexUI?

| Problem | FlexUI Solution |
|---------|----------------|
| Component libraries are opaque and hard to customize | You own every line — components live in your codebase |
| Animations feel basic or require heavy libraries | Spring physics, WebGL, and cinematic transitions built-in |
| 3D/WebGL is complex to integrate | Drop-in Three.js components with lazy loading and performance optimization |
| Design systems feel generic | Glassmorphic styling, mouse-tracking effects, and interactive depth |
| Dependency lock-in | No npm package — copy, paste, and customize freely |

## Key Benefits

- **Zero Lock-in** — Components are copied into your project. No version conflicts, no breaking updates.
- **Cinematic Quality** — Spring physics, glassmorphic blur, mouse-tracking glow, and 3D WebGL scenes out of the box.
- **Performance First** — Lazy-loaded Three.js canvases, GPU-accelerated transforms, and context-based state to minimize re-renders.
- **Accessible** — ARIA roles, keyboard navigation (ESC to close), focus management, and click-outside detection.
- **Fully Typed** — Complete TypeScript definitions with detailed prop interfaces.
- **Composable** — Headless sub-component patterns (e.g., FloatingPanel has 12 composable parts).

## Components

FlexUI organizes components into three tiers:

### Tier 1 — Enhanced Primitives

| Component | Description |
|-----------|-------------|
| **Magnetic Button** | Framer Motion spring-physics button with cursor tracking and spotlight glow border |

### Tier 2 — Cinematic Blocks

| Component | Description |
|-----------|-------------|
| **Floating Panel** | Headless, composable floating panel with spring-morphing animations, glassmorphic styling, and built-in form support (12 sub-components) |

### Tier 3 — WebGL Experiences

| Component | Description |
|-----------|-------------|
| **3D Hover Card** | Lazy-loaded Three.js scene with rotating icosahedron, orbiting ring, particle field, and mouse-reactive tilt |

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 (App Router) | SSR, routing, static generation |
| **UI** | React 19 | Component architecture |
| **Language** | TypeScript 5 | Type safety |
| **Styling** | Tailwind CSS v4 | Utility-first styling with custom theme |
| **Animation** | Framer Motion 12 | Spring physics, gestures, layout transitions |
| **3D / WebGL** | Three.js + React Three Fiber + Drei | 3D scenes, geometry, lighting, environment maps |
| **Icons** | Lucide React | Consistent icon set |
| **Utilities** | clsx + tailwind-merge | Conditional class merging without conflicts |
| **Registry** | shadcn Protocol | CLI-based component distribution |
| **Fonts** | Geist Sans & Geist Mono | Modern typography via `next/font` |

## Getting Started

### Prerequisites

- Node.js 18+
- A Next.js project with Tailwind CSS v4
- `framer-motion` installed

### Installation

**1. Add a component via CLI:**

```bash
npx shadcn@latest add "https://your-domain.com/r/magnetic-button.json"
```

**2. Dependencies are installed automatically.** Each component declares its own dependencies (e.g., `framer-motion`, `three`, `@react-three/fiber`).

**3. Use it:**

```tsx
import { MagneticButton } from "@/components/flexui/magnetic-button";

export default function Page() {
  return <MagneticButton>Get Started</MagneticButton>;
}
```

### Run the Documentation Site Locally

```bash
git clone https://github.com/your-username/flexui.git
cd flexui
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to browse components, live playgrounds, and API references.

## Project Structure

```
flexui/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Landing page
│   ├── layout.tsx              # Root layout with fonts & metadata
│   ├── globals.css             # Tailwind v4 theme & styles
│   └── docs/                   # Documentation pages
│       ├── introduction/       # Getting started guide
│       ├── installation/       # Setup instructions
│       ├── changelog/          # Version history
│       ├── mcp-server/         # AI integration (coming soon)
│       └── components/         # Per-component docs & playgrounds
├── components/
│   ├── flexui/                 # Core UI components (the registry)
│   │   ├── magnetic-button.tsx
│   │   ├── floating-panel.tsx
│   │   ├── three-hover-card.tsx
│   │   └── three-hover-card-scene.tsx
│   ├── marketing/              # Landing page sections
│   ├── docs/                   # Documentation UI (sidebar, API tables, etc.)
│   └── ui/                     # Shared utilities (code block, syntax highlight)
├── public/r/                   # Component registry JSON files
├── scripts/
│   └── build-registry.ts       # Compiles components into registry format
├── lib/utils.ts                # cn() utility (clsx + tailwind-merge)
└── package.json
```

## Documentation

The docs site includes for each component:

- **Live Preview** — Interactive demos with real components
- **Playground** — Adjust props in real-time and see results
- **API Reference** — Full prop tables with types, defaults, and descriptions
- **Installation** — CLI and manual setup instructions
- **Examples** — Multiple usage patterns (basic, styled, advanced)
- **Performance Notes** — Optimization guidance
- **Accessibility Notes** — ARIA support and keyboard behavior
- **Troubleshooting** — Common issues and solutions

## Roadmap

- [x] Magnetic Button
- [x] Floating Panel
- [x] 3D Hover Card
- [x] Documentation site with live playgrounds
- [x] shadcn registry architecture
- [ ] MCP Server integration for AI-assisted development
- [ ] More Tier 1 primitives (Toggle, Input, Card)
- [ ] More Tier 2 blocks (Modal, Drawer, Command Palette)
- [ ] More Tier 3 WebGL experiences
- [ ] Dark/Light theme toggle
- [ ] Figma design tokens

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT License. See [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with Next.js, React, Framer Motion, and Three.js<br/>
  <strong>FlexUI</strong> — Build Cinematic Interfaces.
</p>
