import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { TooltipExamples } from "./examples";
import { Compass, Sparkles, SquareAsterisk, Focus } from "lucide-react";

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

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <TooltipExamples />
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Compass className="h-4 w-4" />, label: "Four Placement Sides", desc: "Position the tooltip on top, bottom, left, or right of the trigger element." },
            { icon: <Sparkles className="h-4 w-4" />, label: "Spring Transitions", desc: "Enter and exit animations use Framer Motion springs with directional slide matching the placement side." },
            { icon: <SquareAsterisk className="h-4 w-4" />, label: "Rich Content Support", desc: "The content prop accepts any ReactNode, not just strings — render icons, formatted text, or small components." },
            { icon: <Focus className="h-4 w-4" />, label: "Focus & Hover Trigger", desc: "Shows on both mouse hover and keyboard focus, ensuring accessibility for all input methods." },
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
        <DocSubSection id="placement-variants" title="Placement Variants">
          <CodeBlock code={`<Tooltip content="Above" side="top"><button>Top</button></Tooltip>
<Tooltip content="Below" side="bottom"><button>Bottom</button></Tooltip>
<Tooltip content="Left side" side="left"><button>Left</button></Tooltip>
<Tooltip content="Right side" side="right"><button>Right</button></Tooltip>`} filename="variant.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="rich-content" title="Rich Content">
          <CodeBlock code={`<Tooltip content={<span className="flex items-center gap-1"><InfoIcon className="h-3 w-3" /> More details here</span>}>
  <button>Hover me</button>
</Tooltip>`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The tooltip popup uses role=\"tooltip\" for proper screen reader identification.", "Tooltip appears on both hover and focus events, supporting keyboard-only navigation.", "The tooltip content is rendered in the DOM only when visible, keeping the accessibility tree clean."].map((note, i) => (
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
