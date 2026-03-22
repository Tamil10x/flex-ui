import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { FlickeringGridPlayground } from "./playground";
import { FlickeringGridExamples } from "./examples";

export const metadata: Metadata = {
  title: "Flickering Grid — FlexUI",
  description:
    "A canvas-rendered grid of cells that randomly flicker on and off with smooth opacity transitions.",
};

export default function FlickeringGridDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Canvas
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Flickering Grid
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A grid of cells that randomly flicker on and off, creating a
          digital/matrix rain feel. Canvas-based for performance with smooth
          per-cell opacity transitions and a radial fade mask.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <FlickeringGridPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Default grid, dense cyan, and large slow cells.
        </p>
        <FlickeringGridExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/flickering-grid"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">No external dependencies.</p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Copy component file
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/flickering-grid.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Requires{" "}
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

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="flickering-grid-props" title="FlickeringGrid">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Content rendered on top of the grid.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the container.",
              },
              {
                name: "cellSize",
                type: "number",
                default: "8",
                description: "Grid cell size in pixels.",
              },
              {
                name: "color",
                type: "string",
                default: '"rgba(139,92,246,0.3)"',
                description: "CSS color value for the flickering cells.",
              },
              {
                name: "speed",
                type: "number",
                default: "3",
                description:
                  "Flicker speed — higher values toggle more cells per frame.",
              },
              {
                name: "gap",
                type: "number",
                default: "2",
                description: "Gap between cells in pixels.",
              },
              {
                name: "density",
                type: "number",
                default: "0.15",
                description:
                  "Fraction of cells active at once (0-1).",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="grid-variants" title="Grid Variants">
          <CodeBlock
            code={`{/* Default grid */}
<FlickeringGrid className="h-64 bg-zinc-950" />

{/* Dense cyan */}
<FlickeringGrid color="rgba(34,211,238,0.35)" cellSize={6} density={0.25} speed={5} />

{/* Large slow cells */}
<FlickeringGrid cellSize={14} gap={4} density={0.1} speed={1} />

{/* Custom color with children */}
<FlickeringGrid color="rgba(249,115,22,0.25)">
  <h1 className="text-white text-3xl">Hello</h1>
</FlickeringGrid>`}
            filename="Examples"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Troubleshooting */}
      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-3">
          {[
            {
              q: "Grid not visible",
              a: "Ensure the container has explicit height (e.g. h-64 or min-h-[300px]). The canvas needs a measurable container to render.",
            },
            {
              q: "Performance issues",
              a: "Reduce density and speed, or increase cellSize and gap. The component uses canvas for optimal performance but very large grids with high density may still be expensive.",
            },
            {
              q: "Hydration mismatch",
              a: "The component uses a mounted guard and seeded PRNG for initial state. If you see hydration warnings, ensure you're using the latest version.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-white/[0.06] bg-zinc-950/50 transition-all duration-200 hover:border-white/[0.1]"
            >
              <div className="p-5 text-sm font-semibold text-white">
                {item.q}
              </div>
              <div className="border-t border-white/[0.04] px-5 py-4 text-sm text-zinc-500">
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Canvas Rendering", desc: "Uses HTML Canvas for high-performance rendering of hundreds of cells with smooth opacity transitions." },
            { icon: "o", label: "Smooth Transitions", desc: "Each cell lerps between on/off states for a fluid flicker instead of harsh binary toggling." },
            { icon: "#", label: "Radial Fade Mask", desc: "Built-in CSS mask fades the grid at the edges for seamless integration with backgrounds." },
            { icon: "+", label: "Auto-Resize", desc: "ResizeObserver automatically redraws the canvas when the container dimensions change." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization-patterns" title="Customization Patterns">
        <DocSubSection id="dense-grid" title="Dense Fast Grid">
          <CodeBlock code={`<FlickeringGrid
  cellSize={6}
  gap={1}
  density={0.25}
  speed={5}
  color="rgba(34,211,238,0.35)"
  className="h-64 bg-zinc-950"
/>`} filename="dense.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="content-overlay" title="Grid with Content Overlay">
          <CodeBlock code={`<FlickeringGrid color="rgba(249,115,22,0.25)" className="h-80 bg-zinc-950">
  <div className="flex h-full items-center justify-center">
    <h1 className="text-4xl font-bold text-white">Welcome</h1>
  </div>
</FlickeringGrid>`} filename="overlay.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The flickering canvas is purely decorative with pointer-events-none, ensuring it never blocks user interactions.", "Children content renders above the canvas with proper z-indexing for full accessibility.", "Consider adding a prefers-reduced-motion check to pause the animation for motion-sensitive users."].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>
    </div>
  );
}
