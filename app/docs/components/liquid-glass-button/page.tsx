import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { LiquidGlassButtonPlayground } from "./playground";
import { LiquidGlassButtonExamples } from "./examples";

export const metadata: Metadata = {
  title: "Liquid Glass Button — FlexUI",
  description:
    "A glassmorphic button with liquid refraction distortion on hover. Cursor-tracked caustic light, subtle skew deformation, and spring-based tap feedback.",
};

export default function LiquidGlassButtonDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
            Tier 2
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            New
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Liquid Glass Button
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A premium glassmorphic button with liquid refraction distortion.
          Cursor-tracked white light refraction, colored caustic glow, subtle
          surface deformation via skew transforms, and spring-based tap
          feedback. Feels like pressing a real glass surface.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <LiquidGlassButtonPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <LiquidGlassButtonExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/liquid-glass-button"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>
                . No external CSS needed.
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Install dependencies
                </p>
                <CodeBlock
                  code="npm install framer-motion"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/liquid-glass-button.tsx
                  </code>
                </div>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="LiquidGlassButton Props">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "ReactNode",
                default: "—",
                description: "Button label content.",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional classes on the button element.",
              },
              {
                name: "tintColor",
                type: "string",
                default: '"139,92,246"',
                description: 'Caustic tint color as CSS RGB values, e.g. "59,130,246" for blue.',
              },
              {
                name: "refractionIntensity",
                type: "number",
                default: "0.8",
                description: "Refraction glow intensity from 0 to 1.",
              },
              {
                name: "size",
                type: '"sm" | "md" | "lg"',
                default: '"md"',
                description: "Button size variant.",
              },
              {
                name: "onClick",
                type: "() => void",
                default: "—",
                description: "Click handler.",
              },
              {
                name: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables the button and removes hover effects.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Liquid Refraction", desc: "A white light spot tracks the cursor like light refracting through glass, with a secondary colored caustic layer." },
            { icon: "o", label: "Surface Deformation", desc: "Subtle skew transforms shift the button surface based on cursor position — feels like pressing real glass." },
            { icon: "#", label: "Spring Tap Feedback", desc: "whileTap scales down to 0.97 with spring physics for tactile click feedback." },
            { icon: "+", label: "Glass Edge Highlights", desc: "Top and bottom edge highlights create the illusion of light catching a glass surface." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 text-sm font-bold text-purple-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="blue-glass" title="Blue Glass">
          <CodeBlock code={`<LiquidGlassButton tintColor="59,130,246">
  Blue Glass
</LiquidGlassButton>`} filename="blue-variant.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="sizes" title="Size Variants">
          <CodeBlock code={`<LiquidGlassButton size="sm">Small</LiquidGlassButton>
<LiquidGlassButton size="md">Medium</LiquidGlassButton>
<LiquidGlassButton size="lg">Large</LiquidGlassButton>`} filename="sizes.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Renders as a native <button> element with full keyboard support.",
              "Supports disabled state with aria-disabled attribute and pointer-events-none.",
              "All visual overlays use pointer-events-none — button remains fully clickable.",
              "Focus ring inherits browser defaults for keyboard navigation.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      <DocSection id="how-it-works" title="How It Works">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Mouse position is normalized to 0-1 range (percentage across the button surface) and stored in motion values.",
              "Spring-smoothed coordinates drive a radial-gradient refraction highlight — a bright white spot that follows the cursor.",
              "A second caustic layer uses the tintColor to create colored light refraction, blended with mix-blend-overlay.",
              "Skew transforms (±1.5° X, ±0.8° Y) derived from cursor position create the liquid surface distortion effect.",
              "Background position shifts ±20px based on cursor to simulate depth through the glass surface.",
              "Top and bottom edge highlights (1px gradients) create the glass edge catching light effect.",
              "whileTap={{ scale: 0.97 }} provides spring-based tactile feedback on click.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-purple-500/10 text-[10px] font-bold text-purple-400">
                  {i + 1}
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>
    </div>
  );
}
