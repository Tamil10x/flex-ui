import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { MorphingBorderCardPlayground } from "./playground";
import { MorphingBorderCardExamples } from "./examples";

export const metadata: Metadata = {
  title: "Morphing Border Card — FlexUI",
  description:
    "A card with an animated conic gradient border that continuously rotates. Cursor-reactive glow intensity, inner spotlight, and customizable multi-color gradient.",
};

export default function MorphingBorderCardDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
            Tier 2
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            CSS + Framer Motion
          </span>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            New
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Morphing Border Card
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A card with an animated conic gradient border that continuously
          rotates with configurable speed. On hover, glow intensity increases
          and an inner spotlight tracks the cursor. Supports up to 8 gradient
          colors for rainbow, brand, or monochrome effects.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <MorphingBorderCardPlayground />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <MorphingBorderCardExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/morphing-border-card"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and the{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  border-rotate
                </code>{" "}
                animation from globals.css.
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
                  2. Add the border-rotate animation to your CSS
                </p>
                <CodeBlock
                  code={`@keyframes border-rotate {
  to { --border-angle: 360deg; }
}

@property --border-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}`}
                  filename="globals.css"
                  language="css"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Copy component
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/morphing-border-card.tsx
                  </code>
                </div>
              </div>
            </div>
          }
        />
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="MorphingBorderCard Props">
          <ApiTable
            rows={[
              { name: "children", type: "ReactNode", default: "—", description: "Card content." },
              { name: "className", type: "string", default: "—", description: "Additional classes on the outer container." },
              { name: "colors", type: "string[]", default: '["139,92,246", "59,130,246", "16,185,129", "245,158,11"]', description: "Array of CSS RGB color strings for the gradient border." },
              { name: "borderWidth", type: "number", default: "1.5", description: "Border thickness in pixels." },
              { name: "speed", type: "number", default: "4", description: "Full rotation duration in seconds." },
              { name: "glowIntensity", type: "number", default: "0.6", description: "Glow opacity on hover from 0 to 1." },
            ]}
          />
        </DocSubSection>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Animated Conic Border", desc: "A conic gradient with up to 8 colors continuously rotates using @property CSS animation — smooth and GPU-accelerated." },
            { icon: "o", label: "Cursor-Reactive Glow", desc: "On hover, a blurred outer glow layer fades in using spring physics. The glow matches the border gradient." },
            { icon: "#", label: "Inner Spotlight", desc: "A cursor-tracked radial gradient lights up the card interior near the mouse position." },
            { icon: "+", label: "CSS Mask Border Trick", desc: "Uses webkit-mask-composite: xor to show the gradient only on the border — the card body stays solid." },
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
        <DocSubSection id="rainbow" title="Rainbow Border">
          <CodeBlock code={`<MorphingBorderCard
  colors={["239,68,68", "245,158,11", "234,179,8", "16,185,129", "59,130,246", "139,92,246", "236,72,153"]}
  speed={6}
  className="max-w-sm p-6"
>
  <h3 className="text-white">Rainbow Border</h3>
</MorphingBorderCard>`} filename="rainbow.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="fast-spin" title="Fast Spin + Thick Border">
          <CodeBlock code={`<MorphingBorderCard speed={1.5} borderWidth={3} glowIntensity={0.9}>
  <div className="p-6">Fast, thick, glowing border</div>
</MorphingBorderCard>`} filename="fast-spin.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "The animated border is purely decorative — content remains fully accessible.",
              "All glow overlays use pointer-events-none, keeping card content interactive.",
              "For prefers-reduced-motion, consider pausing the border animation via CSS media query.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      <DocSection id="how-it-works" title="How It Works">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "A conic-gradient is built from the colors array, evenly spaced around 360 degrees, and applied to a full-bleed overlay.",
              "webkit-mask-composite: xor with two linear-gradient masks creates the border-only effect — gradient shows on the border, card body stays opaque.",
              "The @property --border-angle CSS animation rotates the conic gradient origin smoothly (GPU-accelerated, no JS).",
              "On hover, a spring-animated glowOpacity fades in a blurred copy of the same conic gradient behind the card for outer glow.",
              "Mouse position is normalized to 0-1 and fed through springs. useTransform derives an inner spotlight radial-gradient.",
              "A top-edge 1px gradient highlight fades in on hover for glass-like depth perception.",
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
