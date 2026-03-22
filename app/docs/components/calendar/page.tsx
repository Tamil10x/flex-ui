import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

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
    </div>
  );
}
