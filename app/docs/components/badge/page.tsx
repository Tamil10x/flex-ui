import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Badge — FlexUI",
  description:
    "A small status indicator with multiple color variants and an optional animated pulse dot.",
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
          Badge
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A small status indicator with multiple color variants and an optional
          animated pulse dot. Ideal for labeling statuses, categories, or
          notifications.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add badge`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { Badge } from "@/components/flexui/badge";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`{/* Basic variants */}
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="info">Beta</Badge>

{/* With pulse indicator */}
<Badge variant="success" pulse>Online</Badge>`}
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
              description: "The content displayed inside the badge.",
              required: true,
            },
            {
              name: "variant",
              type: '"default" | "success" | "warning" | "error" | "info"',
              default: '"default"',
              description: "Color variant that determines the badge styling.",
            },
            {
              name: "pulse",
              type: "boolean",
              default: "—",
              description:
                "When true, shows an animated pulsing dot before the label.",
            },
            {
              name: "className",
              type: "string",
              default: "—",
              description: "Additional CSS classes for the badge element.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
