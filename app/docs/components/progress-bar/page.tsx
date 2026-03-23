import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { ProgressBarExamples } from "./examples";
import { MoveRight, Zap, Palette, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Progress Bar — FlexUI",
  description: "A customizable progress bar with optional animation and percentage label.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Progress Bar</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A sleek progress bar with customizable color, optional pulse animation, and an inline percentage label.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <ProgressBarExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add progress-bar`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { ProgressBar } from "@/components/flexui/progress-bar";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`<ProgressBar value={75} color="#8b5cf6" animated showLabel />`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "value", type: "number", default: "—", description: "Progress value from 0 to 100.", required: true },
          { name: "className", type: "string", default: "—", description: "Additional CSS classes for the wrapper." },
          { name: "color", type: "string", default: '"#fff"', description: "Background color of the filled bar." },
          { name: "animated", type: "boolean", default: "false", description: "Adds a pulse animation to the bar." },
          { name: "showLabel", type: "boolean", default: "false", description: "Shows the percentage label below the bar." },
        ]} />
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <MoveRight className="h-4 w-4" />, label: "Smooth Transitions", desc: "Width changes animate with a 500ms ease-out transition for fluid progress updates." },
            { icon: <Zap className="h-4 w-4" />, label: "Pulse Animation", desc: "Optional animated prop adds a pulse effect to draw attention to active progress." },
            { icon: <Palette className="h-4 w-4" />, label: "Custom Color", desc: "Set any CSS color value for the filled bar to match your brand or theme." },
            { icon: <Tag className="h-4 w-4" />, label: "Percentage Label", desc: "Optional inline label displays the current progress percentage below the bar." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Customization Patterns */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="colored-bars" title="Colored Variants">
          <CodeBlock code={`<ProgressBar value={60} color="#8b5cf6" />
<ProgressBar value={80} color="#10b981" animated />
<ProgressBar value={45} color="#f59e0b" showLabel />`} filename="colors.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="custom-height" title="Custom Height">
          <CodeBlock code={`<ProgressBar value={70} className="h-1" color="#3b82f6" />
<ProgressBar value={70} className="h-4 rounded-lg" color="#ec4899" showLabel />`} filename="height.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Uses role=\"progressbar\" with aria-valuenow, aria-valuemin, and aria-valuemax for screen readers.", "Values are automatically clamped between 0 and 100 to prevent invalid states.", "Descriptive aria-label provides context about the progress indicator purpose."].map((note, i) => (
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
