import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { RetroGridPlayground } from "./playground";
import { RetroGridExamples } from "./examples";

export const metadata: Metadata = {
  title: "Retro Grid — FlexUI",
  description:
    "A perspective grid that vanishes to a horizon point — retro synthwave/Tron aesthetic.",
};

export default function RetroGridDoc() {
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
          Retro Grid
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A perspective grid that vanishes to a horizon point with a retro
          synthwave/Tron aesthetic. Pure CSS with optional scroll animation
          toward the viewer. No canvas or JS animation needed.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          A vanishing-point grid with animated scroll and content overlay.
        </p>
        <RetroGridPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Default violet, cyan fast-scroll, and static gold grid variants.
        </p>
        <RetroGridExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/retro-grid"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">No external dependencies. Add the keyframe to your globals.css.</p>
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
                    components/flexui/retro-grid.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Add keyframe to globals.css
                </p>
                <CodeBlock
                  code={`@keyframes retro-grid-scroll {
  0% { background-position: 0 0; }
  100% { background-position: 0 40px; }
}`}
                  filename="globals.css"
                  language="css"
                />
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
        <DocSubSection id="retro-grid-props" title="RetroGrid">
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
                name: "color",
                type: "string",
                default: '"rgba(139,92,246,0.15)"',
                description: "CSS color value for the grid lines.",
              },
              {
                name: "cellSize",
                type: "number",
                default: "40",
                description: "Grid cell size in pixels.",
              },
              {
                name: "angle",
                type: "number",
                default: "65",
                description: "X-axis rotation angle in degrees for perspective.",
              },
              {
                name: "animate",
                type: "boolean",
                default: "true",
                description: "Animate the grid scrolling toward the viewer.",
              },
              {
                name: "speed",
                type: "number",
                default: "1",
                description: "Animation speed multiplier.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="retro-grid-variants" title="Grid Variants">
          <CodeBlock
            code={`{/* Default synthwave grid */}
<RetroGrid className="h-64 bg-zinc-950" />

{/* Cyan grid, faster */}
<RetroGrid color="rgba(56,189,248,0.2)" speed={2} />

{/* Static gold grid */}
<RetroGrid color="rgba(234,179,8,0.12)" animate={false} />

{/* Steeper angle, small cells */}
<RetroGrid angle={75} cellSize={20} />`}
            filename="Examples"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Perspective Grid", desc: "CSS rotateX creates a vanishing-point grid with realistic depth and horizon." },
            { icon: "o", label: "Scroll Animation", desc: "Optional infinite scroll animation makes the grid move toward the viewer." },
            { icon: "#", label: "Pure CSS", desc: "No JavaScript animation or canvas -- uses repeating-linear-gradient and CSS transforms." },
            { icon: "+", label: "Content Overlay", desc: "Children render on top of the grid with proper z-index stacking." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Grid plane is pointer-events-none and purely decorative background.", "Children content renders above the grid and remains fully interactive.", "Animation uses prefers-reduced-motion-safe CSS if the keyframe is wrapped in a media query."].map((note, i) => (
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
              q: "Grid not visible",
              a: "Ensure the container has a dark background (e.g., bg-zinc-950). The grid lines use transparency and may not show on light backgrounds.",
            },
            {
              q: "Animation not working",
              a: "Make sure the retro-grid-scroll keyframe is added to your globals.css. The component references it by name in the inline style.",
            },
            {
              q: "Grid looks flat / no perspective",
              a: "Increase the angle prop (e.g., 70-80) for a more dramatic vanishing point. The default 65 degrees provides a balanced look.",
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
