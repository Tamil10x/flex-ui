import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { TimelineExamples } from "./examples";
import { Eye, ListOrdered, Shapes, CalendarDays } from "lucide-react";

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

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <TimelineExamples />
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Eye className="h-4 w-4" />, label: "Scroll-Triggered Entry", desc: "Each timeline item animates in with a spring slide when it enters the viewport." },
            { icon: <ListOrdered className="h-4 w-4" />, label: "Staggered Animation", desc: "Items appear sequentially with incremental delays for a cascading reveal effect." },
            { icon: <Shapes className="h-4 w-4" />, label: "Custom Icons", desc: "Each item supports an optional icon ReactNode, falling back to a simple dot indicator." },
            { icon: <CalendarDays className="h-4 w-4" />, label: "Date Labels", desc: "Optional date strings render above each item title for chronological context." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="with-icons" title="With Custom Icons">
          <CodeBlock code={`<Timeline items={[
  { title: "Deployed", description: "Shipped to production.", date: "Mar 2026", icon: <RocketIcon className="h-3 w-3" /> },
  { title: "Reviewed", description: "Code review completed.", date: "Feb 2026", icon: <CheckIcon className="h-3 w-3" /> },
]} />`} filename="variant.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="minimal-timeline" title="Minimal Timeline">
          <CodeBlock code={`<Timeline items={[
  { title: "Step 1", description: "First thing that happened." },
  { title: "Step 2", description: "Second thing that happened." },
]} className="max-w-md" />`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Timeline items use semantic heading elements (h4) for proper document outline structure.", "The vertical connecting line is purely decorative and does not interfere with screen reader content.", "Each item is announced in DOM order, matching the visual chronological flow."].map((note, i) => (
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
