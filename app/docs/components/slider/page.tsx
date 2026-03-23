import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { SliderExamples } from "./examples";
import { Move, Keyboard, GitCommitHorizontal, Palette } from "lucide-react";

export const metadata: Metadata = {
  title: "Slider — FlexUI",
  description: "A custom range slider with pointer and keyboard support.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Slider</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A custom range slider with smooth pointer tracking, keyboard navigation, and customizable color. Fully accessible with ARIA attributes.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <SliderExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add slider`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { Slider } from "@/components/flexui/slider";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`const [value, setValue] = useState(50);

<Slider
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  step={5}
  color="#8b5cf6"
/>`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "value", type: "number", default: "—", description: "Current slider value.", required: true },
          { name: "onChange", type: "(value: number) => void", default: "—", description: "Callback fired when the value changes.", required: true },
          { name: "min", type: "number", default: "0", description: "Minimum allowed value." },
          { name: "max", type: "number", default: "100", description: "Maximum allowed value." },
          { name: "step", type: "number", default: "1", description: "Step increment between values." },
          { name: "className", type: "string", default: "—", description: "Additional CSS classes for the track." },
          { name: "color", type: "string", default: '"#fff"', description: "Fill and thumb color." },
        ]} />
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Move className="h-4 w-4" />, label: "Pointer Tracking", desc: "Smooth drag interaction using pointer capture for reliable cross-device tracking." },
            { icon: <Keyboard className="h-4 w-4" />, label: "Keyboard Navigation", desc: "Arrow keys, Home, and End keys for precise value control without a mouse." },
            { icon: <GitCommitHorizontal className="h-4 w-4" />, label: "Step Snapping", desc: "Values snap to configurable step increments for controlled precision." },
            { icon: <Palette className="h-4 w-4" />, label: "Custom Color", desc: "Fill bar and thumb color are customizable via a single color prop." },
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
        <DocSubSection id="colored-sliders" title="Color Variants">
          <CodeBlock code={`<Slider value={value} onChange={setValue} color="#8b5cf6" />
<Slider value={value} onChange={setValue} color="#10b981" />
<Slider value={value} onChange={setValue} color="#f59e0b" />`} filename="colors.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="stepped" title="Custom Range & Step">
          <CodeBlock code={`<Slider
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  step={10}
  color="#3b82f6"
/>`} filename="stepped.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Uses role=\"slider\" with aria-valuemin, aria-valuemax, and aria-valuenow for screen readers.", "Keyboard support includes ArrowLeft/Right for step changes and Home/End for min/max jumps.", "The track element is focusable with tabIndex={0} and has a descriptive aria-label."].map((note, i) => (
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
