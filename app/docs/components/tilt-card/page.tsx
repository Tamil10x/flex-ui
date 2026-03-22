import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { TiltCardExamples } from "./examples";
import { Box, SlidersHorizontal, RotateCcw, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Tilt Card — FlexUI",
  description:
    "A card that applies a 3D tilt effect following the cursor position.",
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
          Tilt Card
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A card that applies a smooth 3D perspective tilt effect that follows
          the cursor. Resets gracefully when the mouse leaves.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <TiltCardExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add tilt-card`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { TiltCard } from "@/components/flexui/tilt-card";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<TiltCard>
  <h3 className="text-lg font-semibold text-white">Card Title</h3>
  <p className="text-sm text-zinc-400">Card content goes here.</p>
</TiltCard>

{/* Custom tilt and perspective */}
<TiltCard maxTilt={20} perspective={800}>
  <p className="text-white">More dramatic tilt effect</p>
</TiltCard>`}
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
              name: "maxTilt",
              type: "number",
              default: "15",
              description:
                "Maximum tilt angle in degrees on both axes.",
            },
            {
              name: "perspective",
              type: "number",
              default: "1000",
              description:
                "CSS perspective value in pixels for the 3D transform.",
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
            { icon: <Box className="h-4 w-4" />, label: "3D Perspective Tilt", desc: "The card rotates on both X and Y axes following the cursor, creating a realistic 3D effect." },
            { icon: <SlidersHorizontal className="h-4 w-4" />, label: "Configurable Intensity", desc: "Control the maximum tilt angle and CSS perspective distance to dial in subtle or dramatic effects." },
            { icon: <RotateCcw className="h-4 w-4" />, label: "Smooth Reset", desc: "The card gracefully returns to its flat position when the mouse leaves, using motion values." },
            { icon: <Package className="h-4 w-4" />, label: "Zero Dependencies Beyond FM", desc: "Only requires Framer Motion — no Three.js or additional 3D libraries needed." },
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
        <DocSubSection id="dramatic-tilt" title="Dramatic Tilt">
          <CodeBlock code={`<TiltCard maxTilt={25} perspective={600}>
  <h3 className="text-lg font-bold text-white">Dramatic</h3>
  <p className="text-sm text-zinc-400">Higher tilt angle with closer perspective.</p>
</TiltCard>`} filename="variant.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="subtle-tilt" title="Subtle Tilt">
          <CodeBlock code={`<TiltCard maxTilt={5} perspective={1500}>
  <p className="text-sm text-zinc-400">Gentle, barely noticeable tilt effect.</p>
</TiltCard>`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The 3D tilt is a purely visual effect that does not affect content readability or interaction.", "All child content remains fully accessible to keyboard navigation and screen readers.", "The transform resets on mouse leave, so the card is always in a neutral position for non-mouse users."].map((note, i) => (
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
