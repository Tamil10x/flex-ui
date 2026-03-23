import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { SwitchExamples } from "./examples";
import { Waypoints, Ruler, Ban, Sliders } from "lucide-react";

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

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <SwitchExamples />
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Waypoints className="h-4 w-4" />, label: "Spring-Animated Thumb", desc: "The toggle thumb slides with Framer Motion spring physics for a satisfying, bouncy feel." },
            { icon: <Ruler className="h-4 w-4" />, label: "Three Size Variants", desc: "Choose from sm, md, or lg sizes to fit different UI contexts and density requirements." },
            { icon: <Ban className="h-4 w-4" />, label: "Disabled State", desc: "Supports a disabled prop that reduces opacity and changes the cursor to not-allowed." },
            { icon: <Sliders className="h-4 w-4" />, label: "Controlled Component", desc: "Fully controlled via checked and onChange props for seamless integration with form state." },
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
        <DocSubSection id="size-variants" title="Size Variants">
          <CodeBlock code={`<Switch checked={on} onChange={setOn} size="sm" />
<Switch checked={on} onChange={setOn} size="md" />
<Switch checked={on} onChange={setOn} size="lg" />`} filename="variant.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="with-label" title="With Label">
          <CodeBlock code={`<label className="flex items-center gap-3">
  <Switch checked={enabled} onChange={setEnabled} />
  <span className="text-sm text-white">Enable notifications</span>
</label>`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Uses role=\"switch\" and aria-checked for proper screen reader announcement of toggle state.", "The button element is natively focusable and can be toggled with Enter or Space keys.", "Disabled state is communicated via the native disabled attribute, preventing interaction and announcing the state.", "Pair with a visible label or aria-label for context when used standalone."].map((note, i) => (
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
