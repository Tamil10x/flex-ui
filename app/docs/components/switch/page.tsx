import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Switch — FlexUI",
  description:
    "A toggle switch component with smooth spring animations and multiple sizes.",
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
          Switch
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A toggle switch with smooth spring-based thumb animations. Available
          in three sizes with full accessibility support.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add switch`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { Switch } from "@/components/flexui/switch";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`const [enabled, setEnabled] = useState(false);

<Switch checked={enabled} onChange={setEnabled} />

{/* Different sizes */}
<Switch checked={enabled} onChange={setEnabled} size="sm" />
<Switch checked={enabled} onChange={setEnabled} size="lg" />

{/* Disabled state */}
<Switch checked={false} onChange={() => {}} disabled />`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "checked",
              type: "boolean",
              default: "\u2014",
              description: "Whether the switch is toggled on.",
              required: true,
            },
            {
              name: "onChange",
              type: "(checked: boolean) => void",
              default: "\u2014",
              description: "Callback fired when the switch is toggled.",
              required: true,
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables the switch when true.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Controls the size of the switch track and thumb.",
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the switch button.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
