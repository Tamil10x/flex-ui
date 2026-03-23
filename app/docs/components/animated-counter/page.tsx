import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { AnimatedCounterExamples } from "./examples";
import { Hash, TableProperties, Zap, Paintbrush } from "lucide-react";

export const metadata: Metadata = {
  title: "AnimatedCounter — FlexUI",
  description:
    "A number counter with smooth per-digit spring animations on value changes.",
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
          AnimatedCounter
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A number counter with smooth per-digit spring animations. Each digit
          slides independently when the value changes, creating a polished
          ticker effect.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <AnimatedCounterExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock
          code={`npx flexui add animated-counter`}
          filename="Terminal"
        />
        <div className="mt-4">
          <CodeBlock
            code={`import { AnimatedCounter } from "@/components/flexui/animated-counter";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`const [count, setCount] = useState(1284);

<AnimatedCounter value={count} />

{/* With custom styling */}
<AnimatedCounter value={count} className="text-5xl" />

{/* Update the value to trigger animation */}
<button onClick={() => setCount(c => c + 1)}>
  Increment
</button>`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "value",
              type: "number",
              default: "—",
              description: "The numeric value to display.",
              required: true,
            },
            {
              name: "className",
              type: "string",
              default: "—",
              description:
                "Additional CSS classes for the wrapper span element.",
            },
          ]}
        />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Hash className="h-4 w-4" />, label: "Per-Digit Animation", desc: "Each digit slides independently with spring physics for a polished ticker effect." },
            { icon: <TableProperties className="h-4 w-4" />, label: "Tabular Numbers", desc: "Uses tabular-nums to prevent layout shift as digits change width." },
            { icon: <Zap className="h-4 w-4" />, label: "Zero Re-renders", desc: "Framer Motion AnimatePresence handles transitions without extra React re-renders." },
            { icon: <Paintbrush className="h-4 w-4" />, label: "Flexible Styling", desc: "Apply any font size, color, or weight via the className prop." },
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
        <DocSubSection id="large-counter" title="Large Display Counter">
          <CodeBlock code={`<AnimatedCounter value={9842} className="text-6xl text-emerald-400" />`} filename="large.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="compact-counter" title="Compact Inline Counter">
          <CodeBlock code={`<p className="text-zinc-400">
  You have <AnimatedCounter value={notifications} className="text-lg text-white" /> unread messages.
</p>`} filename="inline.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The component renders as inline span elements, preserving reading order for screen readers.", "Digit values are always present in the DOM as text content, so assistive technologies read the full number.", "Spring animations are purely visual and do not interfere with screen reader output."].map((note, i) => (
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
