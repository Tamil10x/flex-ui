import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { PulseButtonExamples } from "./examples";
import { Waves, Palette, Hash, MousePointerClick } from "lucide-react";

export const metadata: Metadata = {
  title: "Pulse Button — FlexUI",
  description: "A call-to-action button with animated radiating pulse rings.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Pulse Button</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A call-to-action button with animated radiating pulse rings that draw attention. Customize the ring color and count.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <PulseButtonExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add pulse-button`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { PulseButton } from "@/components/flexui/pulse-button";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`<PulseButton color="rgba(139,92,246,0.5)" pulseCount={2}>
  Subscribe
</PulseButton>`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "children", type: "React.ReactNode", default: "—", description: "Button label content.", required: true },
          { name: "className", type: "string", default: "—", description: "Additional CSS classes for the button." },
          { name: "color", type: "string", default: '"rgba(56,189,248,0.5)"', description: "Color of the pulse rings (any CSS color)." },
          { name: "pulseCount", type: "number", default: "3", description: "Number of animated pulse rings." },
          { name: "onClick", type: "() => void", default: "—", description: "Click handler for the button." },
        ]} />
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Waves className="h-4 w-4" />, label: "Radiating Rings", desc: "Multiple pulse rings expand outward from the button with staggered delays." },
            { icon: <Palette className="h-4 w-4" />, label: "Custom Ring Color", desc: "Set any CSS color for the pulse rings to match your brand or action type." },
            { icon: <Hash className="h-4 w-4" />, label: "Configurable Count", desc: "Control the number of simultaneous pulse rings with the pulseCount prop." },
            { icon: <MousePointerClick className="h-4 w-4" />, label: "Press Feedback", desc: "Built-in hover scale-up and active scale-down for tactile interaction feel." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Customization Patterns */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="ring-colors" title="Color Variants">
          <CodeBlock code={`<PulseButton color="rgba(139,92,246,0.5)">Purple Pulse</PulseButton>
<PulseButton color="rgba(16,185,129,0.5)">Green Pulse</PulseButton>
<PulseButton color="rgba(239,68,68,0.5)" pulseCount={2}>Alert</PulseButton>`} filename="colors.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="custom-button" title="Custom Button Styling">
          <CodeBlock code={`<PulseButton
  className="rounded-full bg-blue-600 px-6 py-3 text-white border-none"
  color="rgba(59,130,246,0.4)"
  pulseCount={4}
>
  Get Started
</PulseButton>`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Pulse rings are purely decorative and do not affect button semantics.", "Standard button element supports keyboard focus, Enter, and Space activation.", "Content is rendered above the pulse effect via z-index for reliable click targets."].map((note, i) => (
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
