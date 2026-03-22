import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Divider — FlexUI",
  description: "A versatile divider component with horizontal/vertical orientation, labels, and gradient support.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Divider</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A versatile divider supporting horizontal and vertical orientations, optional labels, and gradient styling.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add divider`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { Divider } from "@/components/flexui/divider";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`{/* Simple horizontal divider */}
<Divider />

{/* Gradient divider with label */}
<Divider label="OR" gradient />

{/* Vertical divider */}
<div className="flex h-12 items-center gap-4">
  <span>Left</span>
  <Divider orientation="vertical" gradient />
  <span>Right</span>
</div>`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "label", type: "string", default: "-", description: "Optional text label displayed in the center of a horizontal divider." },
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "The orientation of the divider." },
          { name: "gradient", type: "boolean", default: "false", description: "Whether to use a gradient style instead of a solid line." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the divider." },
        ]} />
      </DocSection>
    </div>
  );
}
