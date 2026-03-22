import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

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
    </div>
  );
}
