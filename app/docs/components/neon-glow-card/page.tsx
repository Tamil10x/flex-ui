import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { NeonGlowCardPlayground } from "./playground";
import { NeonGlowCardExamples } from "./examples";

export const metadata: Metadata = {
  title: "Neon Glow Card — FlexUI",
  description:
    "A card with animated neon border glow that pulses and reacts to cursor position.",
};

export default function NeonGlowCardDoc() {
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
          Neon Glow Card
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A card with animated neon border glow that pulses and reacts to your
          cursor. Multiple box-shadow layers create a realistic neon tube
          lighting effect. Spring-scale on hover and cursor-tracking radial
          glow overlay.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <NeonGlowCardPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <NeonGlowCardExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/neon-glow-card"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>
                . Add{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  neon-pulse
                </code>{" "}
                keyframe to your globals.css.
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
                    components/flexui/neon-glow-card.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Add keyframe to globals.css
                </p>
                <CodeBlock
                  code={`@keyframes neon-pulse {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.15); }
}

.neon-pulse {
  animation: neon-pulse 3s ease-in-out infinite;
}`}
                  filename="globals.css"
                />
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="NeonGlowCard Props">
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
                description: "Additional classes on the card container.",
              },
              {
                name: "color",
                type: "string",
                default: '"#389CFD"',
                description: "Neon glow color as a CSS hex/rgb string.",
              },
              {
                name: "intensity",
                type: "number",
                default: "1",
                description:
                  "Multiplier for glow radius and brightness (0.5 = subtle, 2 = intense).",
              },
              {
                name: "pulse",
                type: "boolean",
                default: "true",
                description:
                  "Whether the glow continuously pulses via CSS animation.",
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
              "Multiple box-shadow layers at increasing blur radii (15px, 30px, 60px) simulate the diffuse glow of a neon tube.",
              "An inset box-shadow adds a subtle inner glow for depth.",
              "On hover, the glow opacity increases and the border brightens via dynamic inline styles.",
              "Cursor position is tracked to create a radial gradient overlay that concentrates the glow near the mouse.",
              "If pulse is enabled, a CSS keyframe animation slowly oscillates the brightness filter for a breathing effect.",
              "Framer Motion provides a spring-physics scale (1.01) on hover for a tactile interaction feel.",
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
