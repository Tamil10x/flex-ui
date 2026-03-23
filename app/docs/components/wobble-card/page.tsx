import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { WobbleCardExamples } from "./examples";
import { Wind, Move, RotateCcw, Gem } from "lucide-react";

export const metadata: Metadata = {
  title: "Wobble Card — FlexUI",
  description:
    "A card that wobbles with a spring animation on hover interaction.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
          Component
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Wobble Card
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A card that wobbles with a bouncy spring animation following the
          cursor. The spring physics create a playful, organic feel on hover.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <WobbleCardExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add wobble-card`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { WobbleCard } from "@/components/flexui/wobble-card";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<WobbleCard>
  <h3 className="text-lg font-semibold text-white">Card Title</h3>
  <p className="text-sm text-zinc-400">
    Hover to see the wobble effect.
  </p>
</WobbleCard>`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              default: "\u2014",
              description: "The content rendered inside the card.",
              required: true,
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the card element.",
            },
          ]}
        />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Wind className="h-4 w-4" />, label: "Bouncy Spring Physics", desc: "Low damping and stiffness create an exaggerated, playful wobble that overshoots and settles." },
            { icon: <Move className="h-4 w-4" />, label: "Cursor-Following Rotation", desc: "The card tilts on both X and Y axes based on mouse position relative to the card center." },
            { icon: <RotateCcw className="h-4 w-4" />, label: "Smooth Reset", desc: "When the mouse leaves, the card smoothly springs back to its neutral flat position." },
            { icon: <Gem className="h-4 w-4" />, label: "Glassmorphic Design", desc: "Ships with backdrop-blur, translucent background, and a subtle border for a premium dark-mode look." },
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
        <DocSubSection id="custom-content" title="Feature Card">
          <CodeBlock code={`<WobbleCard className="max-w-sm">
  <h3 className="text-lg font-bold text-white">Analytics</h3>
  <p className="mt-2 text-sm text-zinc-400">Track your metrics in real time.</p>
</WobbleCard>`} filename="variant.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="grid-layout" title="Card Grid">
          <CodeBlock code={`<div className="grid gap-4 sm:grid-cols-2">
  <WobbleCard>
    <p className="text-white font-semibold">Card One</p>
  </WobbleCard>
  <WobbleCard>
    <p className="text-white font-semibold">Card Two</p>
  </WobbleCard>
</div>`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The wobble effect is purely visual and does not affect content readability or interaction.", "All child content remains fully accessible to keyboard navigation and screen readers.", "The 3D transform resets on mouse leave, so the card is always in a neutral position for non-mouse users."].map((note, i) => (
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
