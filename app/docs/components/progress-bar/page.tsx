import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Progress Bar — FlexUI",
  description: "A customizable progress bar with optional animation and percentage label.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Progress Bar</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A sleek progress bar with customizable color, optional pulse animation, and an inline percentage label.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add progress-bar`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { ProgressBar } from "@/components/flexui/progress-bar";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`<ProgressBar value={75} color="#8b5cf6" animated showLabel />`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "value", type: "number", default: "—", description: "Progress value from 0 to 100.", required: true },
          { name: "className", type: "string", default: "—", description: "Additional CSS classes for the wrapper." },
          { name: "color", type: "string", default: '"#fff"', description: "Background color of the filled bar." },
          { name: "animated", type: "boolean", default: "false", description: "Adds a pulse animation to the bar." },
          { name: "showLabel", type: "boolean", default: "false", description: "Shows the percentage label below the bar." },
        ]} />
      </DocSection>
    </div>
  );
}
