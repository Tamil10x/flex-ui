import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Reveal Card — FlexUI",
  description: "A card that reveals hidden content on hover with a smooth spring animation.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Reveal Card</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A card that shows a title at rest and reveals its children content on hover with a smooth spring-powered slide animation.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add reveal-card`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { RevealCard } from "@/components/flexui/reveal-card";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`<RevealCard title="Performance" className="w-64 h-40">
  Built for speed with zero-config optimizations
  and edge-first architecture.
</RevealCard>`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "title", type: "React.ReactNode", default: "—", description: "Content displayed on the card at rest.", required: true },
          { name: "children", type: "React.ReactNode", default: "—", description: "Hidden content revealed on hover.", required: true },
          { name: "className", type: "string", default: "—", description: "Additional CSS classes for the card." },
        ]} />
      </DocSection>
    </div>
  );
}
