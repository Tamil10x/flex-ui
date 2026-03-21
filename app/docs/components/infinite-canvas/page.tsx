import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { InfiniteCanvasPlayground } from "./playground";
import { InfiniteCanvasExamples } from "./examples";

export const metadata: Metadata = {
  title: "Infinite Canvas — FlexUI",
  description:
    "A pannable, zoomable canvas where child elements float freely in 2D space with grid background, pinch-to-zoom, and mouse wheel zoom.",
};

export default function InfiniteCanvasDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 2
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Infinite Canvas
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A pannable, zoomable canvas where child elements float freely in 2D
          space. Drag to pan, scroll to zoom, pinch on touch devices, and
          double-click to reset the view.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Drag to pan and scroll to zoom. Double-click to reset the view.
        </p>
        <InfiniteCanvasPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Different configurations: default, no-grid, and custom zoom range.
        </p>
        <InfiniteCanvasExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/infinite-canvas"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">framer-motion</code>.
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
                  code="npm install framer-motion"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component file
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/infinite-canvas.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Requires{" "}
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
        <DocSubSection id="infinite-canvas-props" title="InfiniteCanvas">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Content rendered on the canvas.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the container.",
              },
              {
                name: "initialZoom",
                type: "number",
                default: "1",
                description: "Initial zoom level.",
              },
              {
                name: "minZoom",
                type: "number",
                default: "0.3",
                description: "Minimum zoom level.",
              },
              {
                name: "maxZoom",
                type: "number",
                default: "3",
                description: "Maximum zoom level.",
              },
              {
                name: "showGrid",
                type: "boolean",
                default: "true",
                description: "Show the grid background.",
              },
              {
                name: "gridSize",
                type: "number",
                default: "40",
                description: "Grid cell size in pixels.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="zoom-range" title="Custom Zoom Range">
          <CodeBlock
            code={`{/* Wide zoom range */}
<InfiniteCanvas minZoom={0.1} maxZoom={5}>
  <YourContent />
</InfiniteCanvas>

{/* No grid */}
<InfiniteCanvas showGrid={false}>
  <YourContent />
</InfiniteCanvas>

{/* Larger grid cells */}
<InfiniteCanvas gridSize={80}>
  <YourContent />
</InfiniteCanvas>`}
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
              q: "Canvas does not pan on mobile",
              a: "Use two fingers to pan on touch devices. Single-finger drag is reserved for scrolling the page.",
            },
            {
              q: "Zoom feels too fast or too slow",
              a: "Adjust the wheel delta multiplier in the source or change minZoom/maxZoom range.",
            },
            {
              q: "Double-click to reset not working",
              a: "Ensure no child element is intercepting the double-click event with stopPropagation.",
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
