import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { SpotlightCardPlayground } from "./playground";
import { SpotlightCardExamples } from "./examples";

export const metadata: Metadata = {
  title: "Spotlight Card — FlexUI",
  description:
    "A lightweight card with a cursor-following radial spotlight effect. Pure CSS + Framer Motion — no WebGL.",
};

export default function SpotlightCardDoc() {
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
          Spotlight Card
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A lightweight dark card with a cursor-following radial spotlight
          effect. Built with Framer Motion springs and CSS radial gradients —
          no Three.js, no WebGL. The spotlight tracks the mouse via motion
          values so the React tree never re-renders on move.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <SpotlightCardPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <SpotlightCardExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/spotlight-card"
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
                    components/flexui/spotlight-card.tsx
                  </code>
                </div>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="SpotlightCard Props">
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
                name: "spotlightColor",
                type: "string",
                default: '"56,189,248"',
                description:
                  'Spotlight color as CSS RGB values, e.g. "168,85,247" for purple.',
              },
              {
                name: "spotlightSize",
                type: "number",
                default: "350",
                description: "Spotlight radius in px.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Dual Gradient Layers", desc: "A spotlight fill gradient plus a separate border glow gradient track the cursor independently for depth." },
            { icon: "o", label: "Zero Re-Renders", desc: "All mouse tracking runs through Framer Motion values, keeping the React tree completely static." },
            { icon: "#", label: "Configurable Spotlight", desc: "Adjust spotlightColor and spotlightSize props to match any brand or design system." },
            { icon: "+", label: "Glassmorphic Styling", desc: "Ships with backdrop-blur, translucent background, and subtle border that brightens on hover." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="custom-color" title="Purple Spotlight">
          <CodeBlock code={`<SpotlightCard spotlightColor="168,85,247" spotlightSize={400}>
  <div className="p-6">
    <h3 className="text-lg font-bold text-white">Purple Card</h3>
  </div>
</SpotlightCard>`} filename="variant.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="compact-card" title="Compact Card">
          <CodeBlock code={`<SpotlightCard spotlightSize={200} className="max-w-xs">
  <div className="p-4 text-center">
    <p className="text-sm text-zinc-400">Small spotlight card</p>
  </div>
</SpotlightCard>`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The spotlight overlay uses pointer-events-none so all card content remains fully interactive.", "Content inside the card is rendered at a higher z-index and remains accessible to screen readers.", "The hover effect is visual-only and does not convey information, so it degrades gracefully without a mouse."].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
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
              "Mouse position is captured on move and stored in Framer Motion useMotionValue — this bypasses React state entirely.",
              "useSpring smooths the raw coordinates with configurable stiffness/damping for a fluid, non-jittery follow.",
              "useTransform derives a radial-gradient CSS string from the spring values. The gradient is applied directly to a motion.div style prop.",
              "On mouse enter, a spring-animated opacity fades the spotlight in. On leave, it fades out.",
              "A second, larger, dimmer radial gradient provides a subtle border glow effect near the cursor.",
              "The card itself uses Tailwind glassmorphic styling: bg-zinc-950/80, backdrop-blur-xl, and a thin white/[0.08] border that brightens on hover.",
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
