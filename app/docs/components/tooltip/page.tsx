import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Tooltip — FlexUI",
  description:
    "A small animated popup that displays additional information on hover.",
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
          Tooltip
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A small animated popup that displays additional information on hover
          or focus. Supports four placement sides with spring-based enter/exit
          transitions.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add tooltip`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { Tooltip } from "@/components/flexui/tooltip";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<Tooltip content="Save changes">
  <button>Save</button>
</Tooltip>

{/* Different positions */}
<Tooltip content="Info" side="bottom">
  <span>Hover me</span>
</Tooltip>

<Tooltip content="Settings" side="right">
  <button>Gear icon</button>
</Tooltip>`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              default: "\u2014",
              description: "The trigger element that the tooltip wraps.",
              required: true,
            },
            {
              name: "content",
              type: "React.ReactNode",
              default: "\u2014",
              description: "The content displayed inside the tooltip popup.",
              required: true,
            },
            {
              name: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"top"',
              description: "The preferred placement side of the tooltip.",
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the tooltip popup.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
