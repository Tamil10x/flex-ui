import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { BreadcrumbExamples } from "./examples";
import { Accessibility, SeparatorHorizontal, Sparkles, MapPin } from "lucide-react";

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

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <BreadcrumbExamples />
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Accessibility className="h-4 w-4" />, label: "Accessible Navigation", desc: "Uses a semantic nav element with aria-label and aria-current for proper screen reader support." },
            { icon: <SeparatorHorizontal className="h-4 w-4" />, label: "Custom Separators", desc: "Pass any ReactNode as a separator — text characters, icons, or custom SVG elements." },
            { icon: <Sparkles className="h-4 w-4" />, label: "Entrance Animation", desc: "Fades in with a subtle upward slide when entering the viewport via Framer Motion." },
            { icon: <MapPin className="h-4 w-4" />, label: "Auto Current Page", desc: "The last item is automatically styled as the current page with bold white text." },
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
        <DocSubSection id="arrow-separator" title="Arrow Separator">
          <CodeBlock code={`<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Widget" },
  ]}
  separator={<span className="text-zinc-600">&rsaquo;</span>}
/>`} filename="arrow.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="icon-separator" title="Dot Separator">
          <CodeBlock code={`<Breadcrumb
  items={[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Settings" },
  ]}
  separator={<span className="h-1 w-1 rounded-full bg-zinc-600" />}
/>`} filename="dot.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Renders as a nav element with aria-label=\"Breadcrumb\" for landmark navigation.", "The last item includes aria-current=\"page\" so screen readers announce it as the current page.", "Intermediate items with href render as anchor links, enabling standard keyboard navigation.", "Separators are decorative and ignored by assistive technologies."].map((note, i) => (
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
