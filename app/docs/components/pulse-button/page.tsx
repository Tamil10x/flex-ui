import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

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
    </div>
  );
}
