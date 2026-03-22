import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Skeleton — FlexUI",
  description: "A lightweight skeleton placeholder for loading states with pulse animation.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Skeleton</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A lightweight placeholder with a pulse animation, used to represent loading content. Supports rectangular and circular shapes.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add skeleton`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { Skeleton } from "@/components/flexui/skeleton";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`{/* Avatar placeholder */}
<Skeleton width={48} height={48} rounded />

{/* Text line placeholders */}
<Skeleton width={180} height={14} />
<Skeleton width={240} height={14} />
<Skeleton width={120} height={14} />`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "width", type: "string | number", default: "—", description: "Width of the skeleton. Numbers are treated as pixels." },
          { name: "height", type: "string | number", default: "—", description: "Height of the skeleton. Numbers are treated as pixels." },
          { name: "className", type: "string", default: "—", description: "Additional CSS classes." },
          { name: "rounded", type: "boolean", default: "false", description: "Uses rounded-full instead of rounded-md for circular shapes." },
        ]} />
      </DocSection>
    </div>
  );
}
