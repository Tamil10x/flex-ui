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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Pan & Zoom", desc: "Click-drag to pan and scroll-wheel to zoom toward the cursor position with smooth interpolation." },
            { icon: "o", label: "Pinch-to-Zoom", desc: "Full multi-touch support for pinch zoom and two-finger pan on mobile and trackpads." },
            { icon: "#", label: "Scaling Grid", desc: "Background grid lines scale with zoom level and translate with pan for spatial context." },
            { icon: "+", label: "Double-Click Reset", desc: "Double-click anywhere to instantly reset pan and zoom to the initial state." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="what-you-get-customization" title="Customization Patterns">
        <DocSubSection id="no-grid-canvas" title="Canvas Without Grid">
          <CodeBlock code={`<InfiniteCanvas showGrid={false} className="h-[500px]">
  <div className="absolute left-40 top-40 p-4 bg-zinc-900 rounded-xl">
    Floating element
  </div>
</InfiniteCanvas>`} filename="no-grid.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="deep-zoom" title="Deep Zoom Range">
          <CodeBlock code={`<InfiniteCanvas minZoom={0.1} maxZoom={5} gridSize={80} className="h-[500px]">
  <img src="/diagram.png" alt="Diagram" />
</InfiniteCanvas>`} filename="deep-zoom.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Cursor changes to grab/grabbing to visually communicate the drag interaction.", "A zoom percentage indicator in the bottom-right provides orientation context.", "The grid background is pointer-events-none to avoid interfering with content interaction.", "Consider adding keyboard pan/zoom controls for users who cannot use a mouse or trackpad."].map((note, i) => (
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
