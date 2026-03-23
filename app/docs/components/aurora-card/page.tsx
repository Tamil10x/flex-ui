import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { AuroraCardPlayground } from "./playground";
import { AuroraCardExamples } from "./examples";

export const metadata: Metadata = {
  title: "Aurora Card — FlexUI",
  description:
    "A cinematic card with multi-layered aurora borealis light effect that follows cursor position. Three independent color layers with staggered spring physics.",
};

export default function AuroraCardDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
            Tier 2
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            New
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Aurora Card
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A cinematic dark card with a multi-layered aurora borealis effect that
          follows your cursor. Three independent color layers with staggered
          spring physics create organic, flowing light that feels alive. Pure
          Framer Motion — no canvas, no WebGL.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <AuroraCardPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <AuroraCardExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/aurora-card"
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
                    components/flexui/aurora-card.tsx
                  </code>
                </div>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="AuroraCard Props">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "ReactNode",
                default: "—",
                description: "Card content.",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description:
                  "Additional classes on the outer container (width, padding, etc.).",
              },
              {
                name: "primaryColor",
                type: "string",
                default: '"139,92,246"',
                description:
                  'Primary aurora color as CSS RGB values, e.g. "139,92,246" for purple.',
              },
              {
                name: "secondaryColor",
                type: "string",
                default: '"59,130,246"',
                description:
                  'Secondary aurora color as CSS RGB values, e.g. "59,130,246" for blue.',
              },
              {
                name: "tertiaryColor",
                type: "string",
                default: '"16,185,129"',
                description:
                  'Tertiary aurora color as CSS RGB values, e.g. "16,185,129" for emerald.',
              },
              {
                name: "intensity",
                type: "number",
                default: "0.7",
                description: "Aurora glow intensity from 0 to 1.",
              },
              {
                name: "spread",
                type: "number",
                default: "400",
                description: "Aurora spread radius in pixels.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Triple Aurora Layers", desc: "Three independent color gradients track the cursor with staggered spring physics, creating organic depth and flow." },
            { icon: "o", label: "Zero Re-Renders", desc: "All cursor tracking runs through Framer Motion values — the React tree stays completely static during mouse movement." },
            { icon: "#", label: "Fully Customizable", desc: "Adjust three color channels, intensity, and spread to match any brand or design system." },
            { icon: "+", label: "Mix-Blend Magic", desc: "Secondary and tertiary layers use mix-blend-screen for additive light blending — colors merge like real aurora light." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 text-sm font-bold text-purple-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="warm-aurora" title="Warm Aurora (Sunset)">
          <CodeBlock code={`<AuroraCard
  primaryColor="245,158,11"
  secondaryColor="239,68,68"
  tertiaryColor="217,70,239"
  className="max-w-sm p-8"
>
  <h3 className="text-lg font-bold text-white">Sunset Aurora</h3>
  <p className="mt-2 text-sm text-zinc-400">Warm amber, red, and pink tones.</p>
</AuroraCard>`} filename="warm-variant.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="intense-aurora" title="High Intensity">
          <CodeBlock code={`<AuroraCard intensity={1} spread={600} className="max-w-sm p-8">
  <h3 className="text-lg font-bold text-white">High Intensity</h3>
  <p className="mt-2 text-sm text-zinc-400">Maximum glow with wider spread.</p>
</AuroraCard>`} filename="intense-variant.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "All aurora overlays use pointer-events-none so card content remains fully interactive.",
              "Content is rendered at a higher z-index and remains accessible to screen readers.",
              "The aurora effect is purely decorative and does not convey information — degrades gracefully without a mouse.",
              "Supports prefers-reduced-motion — disable the effect by passing intensity={0}.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      {/* How it works */}
      <DocSection id="how-it-works" title="How It Works">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Mouse position is captured and stored in Framer Motion useMotionValue — bypassing React state entirely.",
              "Two spring configurations are used: a fast spring (stiffness 100) for the primary layer and a slow spring (stiffness 50) for secondary/tertiary layers.",
              "useTransform derives three independent radial-gradient CSS strings from the spring values, each with different offsets and spread radii.",
              "Secondary and tertiary layers use mix-blend-screen — this creates additive color blending where overlapping colors brighten like real light.",
              "On mouse enter, a spring-animated opacity fades all three aurora layers in simultaneously. On leave, they fade out.",
              "An ambient shimmer layer using CSS gradients provides a subtle static glow on hover as a base layer.",
              "The staggered spring physics mean the three aurora layers separate as you move fast and merge as you slow down — creating organic, flowing motion.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-purple-500/10 text-[10px] font-bold text-purple-400">
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
