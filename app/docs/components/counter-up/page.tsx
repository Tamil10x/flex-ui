import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { CounterUpExamples } from "./examples";
import { Eye, TrendingUp, Hash, Timer } from "lucide-react";

export const metadata: Metadata = {
  title: "CounterUp — FlexUI",
  description: "An animated number counter that counts up when scrolled into view.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">CounterUp</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">An animated number counter that counts up from zero when scrolled into view, with eased timing.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <CounterUpExamples />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add counter-up`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { CounterUp } from "@/components/flexui/counter-up";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`<CounterUp end={1248} />

// With custom duration (in milliseconds)
<CounterUp end={500} duration={3000} className="text-5xl" />`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "end", type: "number", default: "-", description: "The target number to count up to.", required: true },
          { name: "duration", type: "number", default: "2000", description: "Animation duration in milliseconds." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the span element." },
        ]} />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Eye className="h-4 w-4" />, label: "Scroll-Triggered", desc: "Animation starts automatically when the element scrolls into view using IntersectionObserver." },
            { icon: <TrendingUp className="h-4 w-4" />, label: "Eased Timing", desc: "Cubic ease-out curve for a natural deceleration effect as the number approaches its target." },
            { icon: <Hash className="h-4 w-4" />, label: "Tabular Numerals", desc: "Uses tabular-nums font feature so digits don't shift layout as they change." },
            { icon: <Timer className="h-4 w-4" />, label: "Configurable Duration", desc: "Control how fast the counter animates with a simple duration prop in milliseconds." },
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
        <DocSubSection id="slow-counter" title="Slow Dramatic Counter">
          <CodeBlock code={`<CounterUp end={9999} duration={5000} className="text-6xl text-cyan-400" />`} filename="slow.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="stat-row" title="Stats Row">
          <CodeBlock code={`<div className="flex gap-12">
  <div className="text-center">
    <CounterUp end={120} className="text-3xl" />
    <p className="text-sm text-zinc-400">Customers</p>
  </div>
  <div className="text-center">
    <CounterUp end={4500} duration={3000} className="text-3xl" />
    <p className="text-sm text-zinc-400">Downloads</p>
  </div>
</div>`} filename="stats.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The component renders a plain <span> element, which is accessible to screen readers by default.", "Screen readers will announce the final number value once the animation completes.", "Consider adding an aria-label with the target value if the surrounding context does not describe what the number represents."].map((note, i) => (
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
