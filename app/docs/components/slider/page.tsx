import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

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
    </div>
  );
}
