import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "CounterUp — FlexUI",
  description: "An animated number counter that counts up when scrolled into view.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">CounterUp</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">An animated number counter that counts up from zero when scrolled into view, with eased timing.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add counter-up`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { CounterUp } from "@/components/flexui/counter-up";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`<CounterUp end={1248} />

// With custom duration (in milliseconds)
<CounterUp end={500} duration={3000} className="text-5xl" />`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "end", type: "number", default: "-", description: "The target number to count up to.", required: true },
          { name: "duration", type: "number", default: "2000", description: "Animation duration in milliseconds." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the span element." },
        ]} />
      </DocSection>
    </div>
  );
}
