import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { InteractiveGlobePlayground } from "./playground";
import { InteractiveGlobeExamples } from "./examples";

export const metadata: Metadata = {
  title: "Interactive Globe — FlexUI",
  description:
    "A three-globe powered interactive world globe with animated arc connections, ring pulses, and 5 built-in color themes.",
};

const interactiveGlobeSource = `"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import type { GlobeConfig } from "@/components/ui/globe";
import { cn } from "@/lib/utils";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

export type GlobeTheme = "ocean" | "nebula" | "forest" | "sunset" | "custom";

const THEMES = {
  ocean: {
    globeColor: "#062056",
    emissive: "#062056",
    atmosphereColor: "#38bdf8",
    arcColors: ["#06b6d4", "#3b82f6", "#6366f1"],
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
  },
  nebula: {
    globeColor: "#1a0530",
    emissive: "#2d0a52",
    atmosphereColor: "#c084fc",
    arcColors: ["#e879f9", "#a855f7", "#ec4899"],
    polygonColor: "rgba(232,194,255,0.6)",
    ambientLight: "#c084fc",
  },
  // ... more themes
};

export function InteractiveGlobe({
  theme = "ocean",
  heading = "Connected Worldwide",
  subtitle = "Real-time data flows across the globe with live animated arcs.",
  showLabel = true,
  arcTime = 1000,
  autoRotateSpeed = 0.5,
  atmosphereAltitude = 0.1,
}) {
  const themeValues = THEMES[theme];
  // ... arc data and globe config setup

  return (
    <div className="relative flex flex-col items-center justify-center w-full overflow-hidden">
      {showLabel && (
        <div className="relative z-20 mb-2 text-center">
          <h3 className="text-xl font-bold text-white md:text-3xl">{heading}</h3>
          <p className="mt-1 text-sm text-zinc-400 max-w-xs mx-auto">{subtitle}</p>
        </div>
      )}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-black z-10 pointer-events-none" />
      <div className="relative z-0 w-full" style={{ height: 380 }}>
        <World data={arcs} globeConfig={globeConfig} />
      </div>
    </div>
  );
}`;

export default function InteractiveGlobeDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-400">
            Tier 3
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            three-globe
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            React Three Fiber
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Interactive Globe
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A WebGL-powered interactive world globe that renders animated arc
          connections between cities, pulsing ring effects, and glowing hex
          polygons. Ships with 5 built-in color themes and full prop-level
          customization.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <InteractiveGlobePlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples — Color Themes">
        <InteractiveGlobeExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/interactive-globe"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Auto-installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  three-globe
                </code>
                ,{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  @react-three/fiber
                </code>
                , and{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  @react-three/drei
                </code>
                .
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Install dependencies
                </p>
                <CodeBlock
                  code="npm install three-globe three @react-three/fiber @react-three/drei"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Download countries GeoJSON data
                </p>
                <CodeBlock
                  code={`# Copy from three-globe node_modules
cp node_modules/three-globe/example/country-polygons/ne_110m_admin_0_countries.geojson data/globe.json`}
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Copy both component files
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-orange-400" />
                      <code className="text-xs text-zinc-400">
                        components/ui/
                      </code>
                    </div>
                    <p className="mt-1 text-sm font-medium text-white">
                      globe.tsx
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-600">
                      Core WebGL renderer
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-rose-400" />
                      <code className="text-xs text-zinc-400">
                        components/flexui/
                      </code>
                    </div>
                    <p className="mt-1 text-sm font-medium text-white">
                      interactive-globe.tsx
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-600">
                      Themed wrapper with arc data
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  4. Requires{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    cn()
                  </code>{" "}
                  at{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    @/lib/utils
                  </code>
                </p>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              icon: "🌐",
              label: "5 Color Themes",
              desc: "Ocean, Nebula, Forest, Sunset, and Custom — switch with a single prop.",
            },
            {
              icon: "~",
              label: "Animated Arc Connections",
              desc: "Dashed arcs animate between 30+ world cities in sequence, looping continuously.",
            },
            {
              icon: "o",
              label: "Pulsing Ring Effects",
              desc: "Randomly selected arc endpoints emit ring pulses every 2 seconds.",
            },
            {
              icon: "#",
              label: "Hex Polygon Map",
              desc: "Country outlines rendered as hexagonal polygons from NaturalEarth GeoJSON.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/10 to-rose-500/10 text-sm font-bold text-orange-400">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="exports" title="Exports">
          <CodeBlock
            code={`import { InteractiveGlobe } from "@/components/flexui/interactive-globe";
import type { GlobeTheme, GlobeArc, InteractiveGlobeProps } from "@/components/flexui/interactive-globe";

// Internal primitives (used for custom globe configs)
import { World, Globe, hexToRgb, genRandomNumbers } from "@/components/ui/globe";
import type { GlobeConfig } from "@/components/ui/globe";`}
            filename="Exports"
          />
        </DocSubSection>

        <DocSubSection id="props" title="InteractiveGlobe Props">
          <ApiTable
            rows={[
              {
                name: "theme",
                type: '"ocean" | "nebula" | "forest" | "sunset" | "custom"',
                default: '"ocean"',
                description: "Pre-built color theme for the globe.",
              },
              {
                name: "globeColor",
                type: "string",
                default: "— (from theme)",
                description: "Override the globe body color (hex).",
              },
              {
                name: "atmosphereColor",
                type: "string",
                default: "— (from theme)",
                description: "Override the atmosphere glow color (hex).",
              },
              {
                name: "atmosphereAltitude",
                type: "number",
                default: "0.1",
                description: "Globe atmosphere height (0–0.5).",
              },
              {
                name: "arcColors",
                type: "string[]",
                default: "— (from theme)",
                description:
                  "Override arc colors. Array of hex strings — arcs cycle through them.",
              },
              {
                name: "data",
                type: "GlobeArc[]",
                default: "— (30 world city arcs)",
                description:
                  "Custom arc data. Uses built-in world city connections when omitted.",
              },
              {
                name: "arcTime",
                type: "number",
                default: "1000",
                description: "Duration of each arc dash animation in ms.",
              },
              {
                name: "autoRotateSpeed",
                type: "number",
                default: "0.5",
                description: "Globe auto-rotation speed (0 = no rotation).",
              },
              {
                name: "showLabel",
                type: "boolean",
                default: "true",
                description: "Show the heading and subtitle above the globe.",
              },
              {
                name: "heading",
                type: "string",
                default: '"Connected Worldwide"',
                description: "Heading text shown above the globe.",
              },
              {
                name: "subtitle",
                type: "string",
                default: '"Real-time data flows..."',
                description: "Subtitle text below the heading.",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description:
                  "Additional Tailwind classes on the container div.",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="globe-arc-type" title="GlobeArc Type">
          <CodeBlock
            code={`type GlobeArc = {
  order: number;       // animation sequence order
  startLat: number;   // start latitude
  startLng: number;   // start longitude
  endLat: number;     // end latitude
  endLng: number;     // end longitude
  arcAlt: number;     // arc height (0–1)
  color: string;      // hex color for this arc
};`}
            filename="types"
            language="typescript"
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="switch-theme" title="Switch Themes">
          <CodeBlock
            code={`<InteractiveGlobe theme="nebula" />
<InteractiveGlobe theme="forest" />
<InteractiveGlobe theme="sunset" />`}
            filename="Themes"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-colors" title="Custom Globe Color">
          <CodeBlock
            code={`<InteractiveGlobe
  theme="custom"
  globeColor="#0d1117"
  atmosphereColor="#58a6ff"
  arcColors={["#58a6ff", "#1f6feb", "#388bfd"]}
/>`}
            filename="Custom colors"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-arcs" title="Custom Arc Data">
          <CodeBlock
            code={`import type { GlobeArc } from "@/components/flexui/interactive-globe";

const myArcs: GlobeArc[] = [
  {
    order: 1,
    startLat: 37.7749,   // San Francisco
    startLng: -122.4194,
    endLat: 51.5072,     // London
    endLng: -0.1276,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  // ... more arcs
];

<InteractiveGlobe data={myArcs} />`}
            filename="Custom arcs"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="no-label" title="Globe Without Label">
          <CodeBlock
            code={`{/* Perfect for embedding in a card or hero section */}
<InteractiveGlobe theme="ocean" showLabel={false} className="h-[350px]" />`}
            filename="No label"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Performance */}
      <DocSection id="performance" title="Performance Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "World component is dynamically imported via next/dynamic with ssr: false — no server-side WebGL.",
              "Globe geometry and arc data are only rebuilt when data changes — stable refs prevent thrash.",
              "Ring animations run on a 2s setInterval with cleanup on unmount — no memory leaks.",
              "Atom-style hex polygons use resolution=3 for efficient geometry count.",
              "Canvas pixels match devicePixelRatio for crisp rendering on retina screens.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-green-500/10 text-[10px] font-bold text-green-400">
                  {i + 1}
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "<canvas> is decorative — no meaningful screen reader content.",
              "Add aria-label='World map visualization' to the container if contextually important.",
              "Heading and subtitle are real DOM text — fully accessible.",
              "Orbit controls support mouse and touch drag — keyboard users need a custom tabIndex workaround.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      {/* Troubleshooting */}
      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-3">
          {[
            {
              q: "Globe renders blank / black screen",
              a: "Ensure data/globe.json exists by copying the GeoJSON from node_modules. The globe won't render country polygons without it.",
            },
            {
              q: "TypeScript error on countries import",
              a: 'Add "resolveJsonModule": true to tsconfig.json. Next.js projects have this enabled by default.',
            },
            {
              q: "Canvas renders off-screen or sized incorrectly",
              a: "Wrap <InteractiveGlobe> in a container with an explicit height. The internal canvas sizes to its parent.",
            },
            {
              q: '"Cannot use import statement in a module" from three-globe',
              a: "Add three-globe to transpilePackages in next.config.ts: transpilePackages: ['three-globe']",
            },
            {
              q: "Arcs don't animate / freeze on first render",
              a: "This is normal — arcs animate in sequentially based on their order number. Wait 1-2 seconds for all orders to complete.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="group/faq rounded-xl border border-white/[0.06] bg-zinc-950/50 transition-all duration-200 hover:border-white/[0.1] open:border-white/[0.1]"
            >
              <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-white list-none">
                {item.q}
                <span className="ml-4 text-zinc-600 transition-transform duration-200 group-open/faq:rotate-45">
                  +
                </span>
              </summary>
              <div className="border-t border-white/[0.04] px-5 py-4 text-sm text-zinc-500">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </DocSection>
    </div>
  );
}
