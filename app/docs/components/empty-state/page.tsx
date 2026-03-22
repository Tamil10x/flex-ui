import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "EmptyState — FlexUI",
  description: "A placeholder component for empty views with icon, message, and optional action button.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">EmptyState</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A polished empty-state placeholder with an optional icon, descriptive text, and call-to-action button.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add empty-state`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { EmptyState } from "@/components/flexui/empty-state";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`<EmptyState
  icon={<InboxIcon className="h-12 w-12" />}
  title="No messages yet"
  description="When you receive messages, they will appear here."
  action={{
    label: "Compose Message",
    onClick: () => console.log("compose"),
  }}
/>`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "title", type: "string", default: "-", description: "The heading text for the empty state.", required: true },
          { name: "description", type: "string", default: "-", description: "A supporting description displayed below the title.", required: true },
          { name: "icon", type: "React.ReactNode", default: "-", description: "An optional icon rendered above the title." },
          { name: "action", type: "{ label: string; onClick: () => void }", default: "-", description: "Optional call-to-action button with label and click handler." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the container." },
        ]} />
      </DocSection>
    </div>
  );
}
