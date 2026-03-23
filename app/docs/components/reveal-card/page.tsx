import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { RevealCardExamples } from "./examples";
import { MousePointer, Magnet, Layers, Puzzle } from "lucide-react";

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
      <DocSection id="examples" title="Examples">
        <RevealCardExamples />
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

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <MousePointer className="h-4 w-4" />, label: "Hover Reveal", desc: "Hidden content slides up from below on hover with Framer Motion spring animation." },
            { icon: <Magnet className="h-4 w-4" />, label: "Spring Physics", desc: "Uses spring stiffness and damping for a natural, bouncy slide transition." },
            { icon: <Layers className="h-4 w-4" />, label: "Glassmorphic Styling", desc: "Frosted glass backdrop with border opacity and blur for a modern card look." },
            { icon: <Puzzle className="h-4 w-4" />, label: "Flexible Content", desc: "Both title and hidden content accept any ReactNode for full customization." },
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
        <DocSubSection id="sized-card" title="Custom Dimensions">
          <CodeBlock code={`<RevealCard title="Analytics" className="h-48 w-80">
  <p>View detailed analytics and insights for your project.</p>
</RevealCard>`} filename="dimensions.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="rich-content" title="Rich Title Content">
          <CodeBlock code={`<RevealCard
  title={
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-emerald-400" />
      <span>Live Status</span>
    </div>
  }
  className="w-64 h-40"
>
  All systems operational. Last checked 2 minutes ago.
</RevealCard>`} filename="rich.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Hidden content is always present in the DOM and accessible to screen readers regardless of hover state.", "The reveal animation is purely visual -- content is not conditionally rendered.", "Card uses standard div elements without trapping focus or requiring keyboard interaction."].map((note, i) => (
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
