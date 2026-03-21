import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { HolographicCardPlayground } from "./playground";
import { HolographicCardExamples } from "./examples";

export const metadata: Metadata = {
  title: "Holographic Card — FlexUI",
  description:
    "A card with a real-time rainbow holographic foil effect that shifts with viewing angle, like a Pokemon holographic card.",
};

export default function HolographicCardDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            CSS + Framer Motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Holographic Card
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A card with a real-time rainbow holographic foil effect that shifts
          with the cursor angle, like a Pokemon holographic card. Built with
          CSS conic-gradient and custom properties updated on mouse move.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <HolographicCardPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <HolographicCardExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/holographic-card"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>
                . No external CSS needed.
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
                  2. Copy component
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/holographic-card.tsx
                  </code>
                </div>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="HolographicCard Props">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "ReactNode",
                default: "\u2014",
                description: "Card content.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description:
                  "Additional classes on the outer container (width, padding, etc.).",
              },
              {
                name: "intensity",
                type: "number",
                default: "0.6",
                description:
                  "Intensity of the holographic effect, from 0 (off) to 1 (full).",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* How it works */}
      <DocSection id="how-it-works" title="How It Works">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Mouse position is tracked relative to the card center on every move, computing both the percentage position and the angle from center.",
              "CSS custom properties (--holo-x, --holo-y, --holo-angle) are updated via onMouseMove, driving a conic-gradient with rainbow color stops.",
              "The holographic overlay uses mix-blend-mode: color-dodge so the rainbow only tints the card without washing out the content.",
              "A secondary radial-gradient with mix-blend-mode: overlay adds a bright specular highlight near the cursor.",
              "filter: brightness() is dynamically boosted as the cursor nears the card center for a realistic foil catch-light.",
              "A fine SVG noise texture is composited on top for the micro-grain authentic holographic foil look.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-[10px] font-bold text-emerald-400">
                  {i + 1}
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>
    </div>
  );
}
