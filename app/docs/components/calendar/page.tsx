import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { CalendarExamples } from "./examples";
import { ArrowLeftRight, CalendarDays, CheckSquare, Gem } from "lucide-react";

export const metadata: Metadata = {
  title: "Calendar — FlexUI",
  description:
    "A compact date picker calendar with month navigation, today highlighting, and selected date styling.",
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
          Calendar
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A compact date picker calendar with month navigation, today
          highlighting, and selected date styling. Built with a glassmorphic
          dark design.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <CalendarExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add calendar`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { Calendar } from "@/components/flexui/calendar";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`const [selected, setSelected] = useState<Date>(new Date());

<Calendar
  selected={selected}
  onChange={setSelected}
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
              name: "onChange",
              type: "(date: Date) => void",
              default: "—",
              description: "Callback fired when a date is selected.",
              required: true,
            },
            {
              name: "selected",
              type: "Date",
              default: "—",
              description:
                "The currently selected date. Highlighted in the calendar grid.",
            },
            {
              name: "className",
              type: "string",
              default: "—",
              description: "Additional CSS classes for the calendar container.",
            },
          ]}
        />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <ArrowLeftRight className="h-4 w-4" />, label: "Month Navigation", desc: "Arrow buttons to navigate between months with automatic day grid recalculation." },
            { icon: <CalendarDays className="h-4 w-4" />, label: "Today Highlighting", desc: "The current date is highlighted with a cyan accent color for quick orientation." },
            { icon: <CheckSquare className="h-4 w-4" />, label: "Selected Date Styling", desc: "Selected dates get a bold white-on-black treatment that clearly stands out." },
            { icon: <Gem className="h-4 w-4" />, label: "Glassmorphic Design", desc: "Dark backdrop blur with subtle hover glow for a premium, modern feel." },
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
        <DocSubSection id="embedded-calendar" title="Embedded in a Form">
          <CodeBlock code={`<div className="space-y-4">
  <label className="text-sm text-zinc-400">Pick a date</label>
  <Calendar
    selected={date}
    onChange={setDate}
    className="w-full"
  />
</div>`} filename="form.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="styled-calendar" title="Custom Border Style">
          <CodeBlock code={`<Calendar
  selected={date}
  onChange={setDate}
  className="border-purple-500/20 hover:border-purple-500/40"
/>`} filename="styled.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Each day cell is a focusable button element, enabling full keyboard navigation through the grid.", "Navigation arrows allow month traversal without requiring a mouse.", "Consider adding aria-label to day buttons (e.g., \"March 15, 2026\") for richer screen reader context.", "The selected date can be announced via aria-pressed or aria-selected for assistive technologies."].map((note, i) => (
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
