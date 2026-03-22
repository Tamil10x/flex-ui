import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Timeline — FlexUI",
  description:
    "A vertical timeline for displaying chronological events or steps.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
          Component
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Timeline
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A vertical timeline for displaying chronological events, milestones,
          or steps. Each item animates into view as the user scrolls.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add timeline`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { Timeline } from "@/components/flexui/timeline";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`const items = [
  {
    title: "Project Started",
    description: "Initial commit and project setup.",
    date: "Jan 2026",
  },
  {
    title: "First Release",
    description: "Shipped v1.0 to production.",
    date: "Mar 2026",
    icon: <span>&#x1f680;</span>,
  },
];

<Timeline items={items} />`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "items",
              type: "TimelineItem[]",
              default: "\u2014",
              description:
                "Array of timeline items with title (string), description (string), optional date (string), and optional icon (ReactNode).",
              required: true,
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the wrapper element.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
