import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "CodeInline — FlexUI",
  description:
    "A styled inline code snippet element for embedding code references within text.",
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
          CodeInline
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A styled inline code snippet for embedding code references, variable
          names, or commands within body text. Renders a monospace code element
          with subtle borders and background.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add code-inline`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { CodeInline } from "@/components/flexui/code-inline";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<p>
  Run <CodeInline>npm install</CodeInline> to install dependencies.
</p>

<p>
  The <CodeInline>onClick</CodeInline> handler fires on click events.
</p>`}
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
              type: "ReactNode",
              default: "—",
              description: "The inline code content to display.",
              required: true,
            },
            {
              name: "className",
              type: "string",
              default: "—",
              description: "Additional CSS classes for the code element.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
