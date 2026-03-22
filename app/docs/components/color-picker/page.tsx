import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "ColorPicker — FlexUI",
  description: "An interactive color picker with preset swatches and hex input.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">ColorPicker</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">An interactive color picker with preset swatches and hex input field.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add color-picker`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { ColorPicker } from "@/components/flexui/color-picker";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`const [color, setColor] = useState("#8b5cf6");

<ColorPicker
  value={color}
  onChange={setColor}
  presets={["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"]}
/>`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "value", type: "string", default: "-", description: "The current hex color value.", required: true },
          { name: "onChange", type: "(color: string) => void", default: "-", description: "Callback fired when the color changes.", required: true },
          { name: "presets", type: "string[]", default: "Default palette", description: "Array of hex color strings for the preset swatches." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the container." },
        ]} />
      </DocSection>
    </div>
  );
}
