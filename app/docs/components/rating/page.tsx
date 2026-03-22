import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Rating — FlexUI",
  description: "An interactive star rating component with hover effects and animation.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Rating</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">An interactive star rating component with hover previews and spring animations. Supports both read-only display and interactive selection.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add rating`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { Rating } from "@/components/flexui/rating";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`const [value, setValue] = useState(3);

// Interactive
<Rating value={value} onChange={setValue} />

// Read-only
<Rating value={4} />`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "value", type: "number", default: "—", description: "Current rating value.", required: true },
          { name: "onChange", type: "(value: number) => void", default: "—", description: "Callback when a star is clicked. Omit for read-only mode." },
          { name: "max", type: "number", default: "5", description: "Maximum number of stars." },
          { name: "size", type: "number", default: "24", description: "Size of each star in pixels." },
          { name: "className", type: "string", default: "—", description: "Additional CSS classes for the wrapper." },
        ]} />
      </DocSection>
    </div>
  );
}
