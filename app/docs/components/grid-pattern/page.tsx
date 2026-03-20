import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { GridPatternPlayground } from "./playground";
import { GridPatternExamples } from "./examples";

export const metadata: Metadata = {
  title: "Grid Pattern — FlexUI",
  description:
    "A subtle CSS grid background pattern with optional animated fade mask.",
};

export default function GridPatternDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Pure CSS
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Grid Pattern
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A subtle CSS grid background pattern with optional radial fade mask.
          Perfect for hero sections, landing page backgrounds, and decorative
          containers.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          A grid background with a faded radial mask and content overlay.
        </p>
        <GridPatternPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Default grid, faded grid, and custom color grid.
        </p>
        <GridPatternExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/grid-pattern"
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
                    components/flexui/grid-pattern.tsx
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
        <DocSubSection id="grid-pattern-props" title="GridPattern">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Content rendered on top of the grid pattern.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the container.",
              },
              {
                name: "size",
                type: "number",
                default: "40",
                description: "Grid cell size in pixels.",
              },
              {
                name: "color",
                type: "string",
                default: '"rgb(255 255 255)"',
                description: "CSS color value for the grid lines.",
              },
              {
                name: "opacity",
                type: "number",
                default: "0.06",
                description: "Line opacity from 0 to 1.",
              },
              {
                name: "fade",
                type: "boolean",
                default: "false",
                description:
                  "Adds a radial gradient mask that fades the grid at the edges.",
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
<GridPattern size={40} className="h-64 bg-zinc-950" />

{/* Faded edges */}
<GridPattern size={32} fade className="h-64 bg-zinc-950" />

{/* Colored grid */}
<GridPattern size={36} color="rgb(59 130 246)" opacity={0.12} fade />

{/* Larger cells */}
<GridPattern size={80} opacity={0.1} />`}
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
              q: "Grid lines not visible",
              a: "Ensure the container has a dark background (e.g., bg-zinc-950). The default line color is white with low opacity, so it won't be visible on light backgrounds.",
            },
            {
              q: "Fade mask not working",
              a: "The fade prop uses CSS mask-image with radial-gradient. Make sure your browser supports CSS masks. All modern browsers do.",
            },
            {
              q: "Grid looks blurry on retina",
              a: "The grid uses 1px lines which render crisply. If it looks blurry, check for parent CSS transforms or scaling that may affect subpixel rendering.",
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
    </div>
  );
}
