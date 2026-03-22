import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { ColorPickerExamples } from "./examples";
import { Palette, Type, Eye, Sparkles } from "lucide-react";

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
      <DocSection id="examples" title="Examples">
        <ColorPickerExamples />
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Palette className="h-4 w-4" />, label: "Preset Swatches", desc: "A grid of clickable color swatches for quick selection from a configurable palette." },
            { icon: <Type className="h-4 w-4" />, label: "Hex Input", desc: "Manual hex color entry with real-time validation — only fires onChange on valid 6-digit hex values." },
            { icon: <Eye className="h-4 w-4" />, label: "Live Preview", desc: "A color swatch preview updates instantly as you select or type a new color." },
            { icon: <Sparkles className="h-4 w-4" />, label: "Glassmorphic UI", desc: "Dark backdrop blur with subtle hover glow for a premium, integrated appearance." },
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
        <DocSubSection id="brand-colors" title="Brand Color Palette">
          <CodeBlock code={`<ColorPicker
  value={color}
  onChange={setColor}
  presets={["#1a1a2e", "#16213e", "#0f3460", "#533483", "#e94560"]}
/>`} filename="brand.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="minimal-picker" title="Minimal Picker">
          <CodeBlock code={`<ColorPicker
  value={color}
  onChange={setColor}
  presets={["#000000", "#ffffff", "#ef4444", "#3b82f6", "#22c55e"]}
  className="w-48"
/>`} filename="minimal.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The container uses role=\"group\" with aria-label=\"Color picker\" for screen reader identification.", "Each preset swatch button has an aria-label describing its hex color value.", "The hex input has aria-label=\"Hex color value\" for screen reader context.", "Color swatches show a visible border change when selected, providing non-color-dependent feedback."].map((note, i) => (
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
