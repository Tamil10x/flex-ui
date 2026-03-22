import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { GravityGridPlayground } from "./playground";
import { GravityGridExamples } from "./examples";

export const metadata: Metadata = {
  title: "Gravity Grid — FlexUI",
  description:
    "A grid of dots that respond to cursor with gravity or repulsion effects. No state updates — uses direct DOM transforms for performance.",
};

export default function GravityGridDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            DOM Refs
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Gravity Grid
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A grid of dots that respond to your cursor with gravity or repulsion.
          Uses direct DOM transforms via refs for silky-smooth performance with
          no React state updates.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Move your cursor over the grid to see the dots react.
        </p>
        <GravityGridPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Default repel, attract mode, and dense pink configurations.
        </p>
        <GravityGridExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/gravity-grid"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                No additional dependencies required — pure React refs and DOM
                transforms.
              </p>
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
                    components/flexui/gravity-grid.tsx
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
        <DocSubSection id="gravity-grid-props" title="GravityGrid">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Content rendered centered on top of the grid.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the container.",
              },
              {
                name: "cols",
                type: "number",
                default: "10",
                description: "Number of grid columns.",
              },
              {
                name: "rows",
                type: "number",
                default: "10",
                description: "Number of grid rows.",
              },
              {
                name: "dotSize",
                type: "number",
                default: "4",
                description: "Dot diameter in pixels.",
              },
              {
                name: "color",
                type: "string",
                default: '"rgba(139,92,246,0.4)"',
                description: "CSS color for the dots.",
              },
              {
                name: "radius",
                type: "number",
                default: "100",
                description:
                  "Effect radius in pixels. Dots within this distance react.",
              },
              {
                name: "effect",
                type: '"attract" | "repel"',
                default: '"repel"',
                description:
                  "Whether dots are pushed away from or pulled toward the cursor.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="configurations" title="Configurations">
          <CodeBlock
            code={`{/* Default — 10x10 violet repel */}
<GravityGrid className="min-h-[400px] bg-black" />

{/* Attract mode with cyan dots */}
<GravityGrid
  effect="attract"
  color="rgba(56,189,248,0.5)"
  radius={120}
  cols={14}
  rows={10}
/>

{/* Dense small dots */}
<GravityGrid cols={20} rows={14} dotSize={3} radius={80} />`}
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
              q: "Dots do not react to cursor",
              a: "Make sure the container has a visible area and the cursor is within the effect radius. Also check that the container is not blocked by an overlay.",
            },
            {
              q: "Performance is choppy",
              a: "The component uses direct DOM transforms via refs and requestAnimationFrame, so it should be smooth. Reduce cols/rows if you have an extremely dense grid (e.g., 30x30+).",
            },
            {
              q: "Dots don't return to position",
              a: "On mouseleave, all transforms reset to translate(0,0). Ensure onMouseLeave fires on the container (avoid pointer-events-none on the outer wrapper).",
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
            { icon: "~", label: "Direct DOM Transforms", desc: "Manipulates dot positions via refs and requestAnimationFrame — zero React state updates for silky performance." },
            { icon: "o", label: "Attract or Repel", desc: "Toggle between gravity (attract) and repulsion (repel) modes for different interactive behaviors." },
            { icon: "#", label: "Configurable Grid", desc: "Control columns, rows, dot size, color, and effect radius to match any layout." },
            { icon: "+", label: "Content Overlay", desc: "Render children centered on top of the grid for interactive backgrounds with foreground content." },
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
        <DocSubSection id="attract-mode" title="Attract Mode with Cyan Dots">
          <CodeBlock code={`<GravityGrid
  effect="attract"
  color="rgba(56,189,248,0.5)"
  radius={120}
  cols={14}
  rows={10}
  className="min-h-[400px] bg-black"
/>`} filename="attract.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="dense-repel" title="Dense Small Dots">
          <CodeBlock code={`<GravityGrid
  cols={20}
  rows={14}
  dotSize={3}
  radius={80}
  color="rgba(236,72,153,0.4)"
  className="min-h-[400px] bg-zinc-950"
>
  <h2 className="text-3xl font-bold text-white">Interactive</h2>
</GravityGrid>`} filename="dense.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The dot grid is purely decorative with pointer-events-none, so it never interferes with user interactions.", "Children content is rendered above the grid with proper z-indexing for full accessibility.", "The interactive effect is mouse-only; on touch devices, the grid displays statically without cursor tracking."].map((note, i) => (
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
