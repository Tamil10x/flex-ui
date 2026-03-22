import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { AccordionExamples } from "./examples";
import { Sparkles, ToggleRight, Accessibility, Puzzle } from "lucide-react";

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

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <AccordionExamples />
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Sparkles className="h-4 w-4" />, label: "Spring Animations", desc: "Smooth expand and collapse transitions powered by Framer Motion spring physics." },
            { icon: <ToggleRight className="h-4 w-4" />, label: "Single or Multiple", desc: "Toggle between single-panel and multi-panel mode with the allowMultiple prop." },
            { icon: <Accessibility className="h-4 w-4" />, label: "Accessible Markup", desc: "Built-in aria-expanded, aria-controls, and role attributes for screen readers." },
            { icon: <Puzzle className="h-4 w-4" />, label: "Fully Composable", desc: "Pass any ReactNode as content — text, images, nested components, or forms." },
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
        <DocSubSection id="multiple-panels" title="Multiple Open Panels">
          <CodeBlock code={`<Accordion
  items={items}
  allowMultiple
  className="rounded-xl border border-white/10 px-4"
/>`} filename="multi-panel.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="custom-styling" title="Custom Styling">
          <CodeBlock code={`{/* Dark bordered variant */}
<Accordion
  items={items}
  className="divide-zinc-800 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6"
/>`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Each trigger button has aria-expanded reflecting its open state.", "Panels are linked to their triggers via aria-controls and aria-labelledby.", "The component uses semantic button elements for triggers, ensuring keyboard navigation works out of the box.", "AnimatePresence ensures collapsed content is removed from the DOM, keeping the accessibility tree clean."].map((note, i) => (
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
