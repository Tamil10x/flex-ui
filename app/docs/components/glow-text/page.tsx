import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { GlowTextExamples } from "./examples";
import { Sparkles, Palette, Package, AlignLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "GlowText — FlexUI",
  description:
    "Animated glowing text with customizable color and intensity using CSS text-shadow keyframes.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
          Component
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          GlowText
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Animated glowing text with a pulsating text-shadow effect. The glow
          color is fully customizable, making it ideal for headings, hero text,
          and attention-grabbing labels.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <GlowTextExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add glow-text`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { GlowText } from "@/components/flexui/glow-text";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<GlowText className="text-4xl">Hello World</GlowText>

{/* Custom color */}
<GlowText color="rgb(168,85,247)">Purple Glow</GlowText>`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "children",
              type: "ReactNode",
              default: "\u2014",
              description: "The text content to render with a glow effect.",
              required: true,
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the text element.",
            },
            {
              name: "color",
              type: "string",
              default: '"rgb(56,189,248)"',
              description:
                "CSS color value for the glow. Applied via a CSS custom property.",
            },
          ]}
        />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Sparkles className="h-4 w-4 text-blue-400" />, label: "Pulsating Glow", desc: "CSS text-shadow keyframe alternates between soft and intense glow for a living, breathing text effect." },
            { icon: <Palette className="h-4 w-4 text-blue-400" />, label: "Custom Color", desc: "Pass any CSS color value to control the glow hue via a CSS custom property." },
            { icon: <Package className="h-4 w-4 text-blue-400" />, label: "Zero Dependencies", desc: "Built with pure CSS keyframes and styled-jsx — no external animation libraries needed." },
            { icon: <AlignLeft className="h-4 w-4 text-blue-400" />, label: "Inline Display", desc: "Renders as an inline-block span so it flows naturally within paragraphs and headings." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="purple-glow" title="Purple Accent Glow">
          <CodeBlock code={`<GlowText color="rgb(168,85,247)" className="text-5xl">
  Premium
</GlowText>`} filename="purple.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="inline-glow" title="Inline with Regular Text">
          <CodeBlock code={`<p className="text-lg text-zinc-400">
  Introducing <GlowText color="rgb(34,211,238)">FlexUI</GlowText> — the next-gen component library.
</p>`} filename="inline.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The glow is purely decorative text-shadow — screen readers announce the text content normally.", "Text remains fully readable at all glow intensities since the base color is white.", "Consider pairing with prefers-reduced-motion media query in your global CSS to disable the animation for motion-sensitive users."].map((note, i) => (
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
