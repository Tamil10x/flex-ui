import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { CodeInlineExamples } from "./examples";
import { CodeXml, Minus, AlignHorizontalJustifyCenter, Puzzle } from "lucide-react";

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

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <CodeInlineExamples />
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <CodeXml className="h-4 w-4" />, label: "Monospace Font", desc: "Renders in a monospace typeface to visually distinguish code from surrounding body text." },
            { icon: <Minus className="h-4 w-4" />, label: "Subtle Styling", desc: "Light border and background create a gentle code chip without overwhelming the text flow." },
            { icon: <AlignHorizontalJustifyCenter className="h-4 w-4" />, label: "Inline Flow", desc: "Stays perfectly inline with surrounding text — no layout disruption or line breaks." },
            { icon: <Puzzle className="h-4 w-4" />, label: "Composable Content", desc: "Accepts any ReactNode, so you can wrap text, variables, or even small icons." },
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
        <DocSubSection id="colored-code" title="Colored Code Inline">
          <CodeBlock code={`<CodeInline className="text-emerald-400 border-emerald-500/20 bg-emerald-500/10">
  npm install
</CodeInline>`} filename="colored.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="larger-code" title="Larger Code Snippet">
          <CodeBlock code={`<CodeInline className="text-base px-2 py-1">
  console.log()
</CodeInline>`} filename="larger.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Renders as a semantic code element, which screen readers can identify as code content.", "Text content is directly readable — no aria attributes needed for basic usage.", "The monospace font and visual styling help sighted users distinguish code from prose."].map((note, i) => (
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
