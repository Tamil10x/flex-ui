import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { StarsBackgroundPlayground } from "./playground";
import { StarsBackgroundExamples } from "./examples";

export const metadata: Metadata = {
  title: "Stars Background — FlexUI",
  description:
    "Twinkling star field background with configurable density, color, and animation speed.",
};

export default function StarsBackgroundDoc() {
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
          Stars Background
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A twinkling star field background with randomly scattered stars that
          pulse in and out at varying speeds. Pure CSS keyframes — no canvas, no
          WebGL, no JavaScript animation loop.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <StarsBackgroundPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <StarsBackgroundExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/stars-background"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                No external dependencies required. Uses CSS keyframe animations
                defined in{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  globals.css
                </code>
                .
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Copy component
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/stars-background.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Add keyframes to globals.css
                </p>
                <CodeBlock
                  code={`@keyframes star-twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@utility animate-star-twinkle {
  animation: star-twinkle 3s ease-in-out infinite;
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
        <DocSubSection id="props" title="StarsBackground Props">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "ReactNode",
                default: "—",
                description: "Content rendered above the star field.",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description:
                  "Additional classes on the outer container.",
              },
              {
                name: "count",
                type: "number",
                default: "80",
                description: "Number of stars to generate.",
              },
              {
                name: "color",
                type: "string",
                default: '"white"',
                description:
                  "Star color as any valid CSS color value.",
              },
              {
                name: "twinkle",
                type: "boolean",
                default: "true",
                description: "Enable or disable the twinkle animation.",
              },
              {
                name: "twinkleSpeed",
                type: "[number, number]",
                default: "[1.5, 4]",
                description:
                  "Min and max animation duration range in seconds for the twinkle effect.",
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
              "Star positions, sizes (1-3px), and animation parameters are generated deterministically with useMemo using a seeded random function — no hydration mismatches.",
              "Each star is a tiny absolute-positioned div with rounded-full to create a circular point of light.",
              "The star-twinkle CSS keyframe pulses opacity between 0.3 and 1.0, creating a natural twinkling effect.",
              "Each star gets a random animation-duration within the twinkleSpeed range, so stars twinkle at different rates for organic variety.",
              "Random animation-delay values ensure stars don't all pulse in sync.",
              "Content is rendered in a relative z-10 layer above the stars, maintaining full interactivity.",
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
