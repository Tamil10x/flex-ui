import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Breadcrumb — FlexUI",
  description:
    "A navigation breadcrumb trail with customizable separators and accessible markup.",
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
          Breadcrumb
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A navigation breadcrumb trail with customizable separators and
          accessible markup. The last item is automatically styled as the
          current page.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add breadcrumb`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { Breadcrumb } from "@/components/flexui/breadcrumb";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/docs/components" },
    { label: "Breadcrumb" },
  ]}
/>

{/* Custom separator */}
<Breadcrumb
  items={[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Settings" },
  ]}
  separator=">"
/>`}
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
              type: "BreadcrumbItem[]",
              default: "—",
              description:
                "Array of breadcrumb items with label (string) and optional href (string).",
              required: true,
            },
            {
              name: "separator",
              type: "ReactNode",
              default: '"/"',
              description:
                "Custom separator rendered between breadcrumb items.",
            },
            {
              name: "className",
              type: "string",
              default: "—",
              description: "Additional CSS classes for the nav element.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
