import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { BadgeExamples } from "./examples";
import { Palette, Radio, Sparkles, Puzzle } from "lucide-react";

export const metadata: Metadata = {
  title: "Badge — FlexUI",
  description:
    "A small status indicator with multiple color variants and an optional animated pulse dot.",
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
          Badge
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A small status indicator with multiple color variants and an optional
          animated pulse dot. Ideal for labeling statuses, categories, or
          notifications.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <BadgeExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add badge`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { Badge } from "@/components/flexui/badge";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`{/* Basic variants */}
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="info">Beta</Badge>

{/* With pulse indicator */}
<Badge variant="success" pulse>Online</Badge>`}
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
              description: "The content displayed inside the badge.",
              required: true,
            },
            {
              name: "variant",
              type: '"default" | "success" | "warning" | "error" | "info"',
              default: '"default"',
              description: "Color variant that determines the badge styling.",
            },
            {
              name: "pulse",
              type: "boolean",
              default: "—",
              description:
                "When true, shows an animated pulsing dot before the label.",
            },
            {
              name: "className",
              type: "string",
              default: "—",
              description: "Additional CSS classes for the badge element.",
            },
          ]}
        />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Palette className="h-4 w-4" />, label: "Five Color Variants", desc: "Default, success, warning, error, and info — each with coordinated background, text, and border colors." },
            { icon: <Radio className="h-4 w-4" />, label: "Pulse Indicator", desc: "Optional animated pulsing dot for live status indicators like online or recording states." },
            { icon: <Sparkles className="h-4 w-4" />, label: "Entrance Animation", desc: "Fades in with a subtle upward slide powered by Framer Motion viewport detection." },
            { icon: <Puzzle className="h-4 w-4" />, label: "Composable Content", desc: "Accepts any ReactNode as children — text, icons, or nested elements." },
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
        <DocSubSection id="pulse-badges" title="Live Status Badges">
          <CodeBlock code={`<Badge variant="success" pulse>Online</Badge>
<Badge variant="error" pulse>Recording</Badge>
<Badge variant="warning" pulse>Pending Review</Badge>`} filename="pulse.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="custom-style" title="Custom Styled Badge">
          <CodeBlock code={`<Badge
  variant="info"
  className="rounded-md px-3 py-1 text-sm"
>
  v2.0 Beta
</Badge>`} filename="custom.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Badge text content is directly readable by screen readers as inline text.", "The pulse dot animation is decorative — screen readers announce only the text label.", "Color variants use sufficient contrast ratios against the dark background for readability.", "Consider adding aria-label when the badge conveys status information not obvious from text alone."].map((note, i) => (
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
