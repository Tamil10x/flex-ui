import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { StatCardExamples } from "./examples";
import { Scan, Sparkles, TrendingUp, LayoutGrid } from "lucide-react";

export const metadata: Metadata = {
  title: "Stat Card — FlexUI",
  description: "An animated statistics card with value, label, optional change indicator, and icon.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Stat Card</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">An animated statistics card that fades in on scroll. Displays a label, large value, optional percentage change indicator, and an icon slot.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <StatCardExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add stat-card`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { StatCard } from "@/components/flexui/stat-card";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`<StatCard
  label="Revenue"
  value="$48.2k"
  change={12.5}
/>`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "label", type: "string", default: "—", description: "Descriptive label displayed above the value.", required: true },
          { name: "value", type: "string | number", default: "—", description: "The primary statistic value to display.", required: true },
          { name: "change", type: "number", default: "—", description: "Percentage change from last period. Positive values are green, negative are red." },
          { name: "icon", type: "React.ReactNode", default: "—", description: "Optional icon displayed in the top-right corner." },
          { name: "className", type: "string", default: "—", description: "Additional CSS classes for the card." },
        ]} />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Scan className="h-4 w-4" />, label: "Scroll-Triggered Entry", desc: "The card fades in with a spring animation when it enters the viewport using useInView." },
            { icon: <Sparkles className="h-4 w-4" />, label: "Animated Value Display", desc: "The primary statistic value scales in with a spring bounce for visual impact." },
            { icon: <TrendingUp className="h-4 w-4" />, label: "Change Indicator", desc: "Optional percentage change with automatic green/red coloring for positive/negative values." },
            { icon: <LayoutGrid className="h-4 w-4" />, label: "Icon Slot", desc: "Supports an optional icon in the top-right corner for contextual visual cues." },
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
        <DocSubSection id="with-icon" title="With Icon">
          <CodeBlock code={`<StatCard
  label="Users"
  value="12,847"
  change={8.3}
  icon={<UsersIcon className="h-5 w-5" />}
/>`} filename="variant.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="negative-change" title="Negative Change">
          <CodeBlock code={`<StatCard
  label="Bounce Rate"
  value="34.2%"
  change={-5.1}
  className="max-w-xs"
/>`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The label, value, and change text are all readable by screen readers in natural order.", "Color is not the only indicator for positive/negative changes — a plus or minus sign prefix is always included.", "The entry animation triggers only once per viewport intersection, avoiding repeated motion for users scrolling back and forth."].map((note, i) => (
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
