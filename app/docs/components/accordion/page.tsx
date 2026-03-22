import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Accordion — FlexUI",
  description:
    "A collapsible content panel for organizing information into expandable sections with smooth animations.",
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
          Accordion
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A collapsible content panel for organizing information into expandable
          sections. Supports single or multiple open panels with smooth
          spring-based animations.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add accordion`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { Accordion } from "@/components/flexui/accordion";`}
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
    title: "What is FlexUI?",
    content: "FlexUI is a modern React component library.",
  },
  {
    title: "Is it free?",
    content: "Yes, FlexUI is completely free and open source.",
  },
];

<Accordion items={items} />

{/* Allow multiple panels open at once */}
<Accordion items={items} allowMultiple />`}
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
              type: "AccordionItem[]",
              default: "—",
              description:
                "Array of items with title (string) and content (ReactNode).",
              required: true,
            },
            {
              name: "className",
              type: "string",
              default: "—",
              description: "Additional CSS classes for the wrapper element.",
            },
            {
              name: "allowMultiple",
              type: "boolean",
              default: "false",
              description:
                "When true, multiple panels can be open simultaneously.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
