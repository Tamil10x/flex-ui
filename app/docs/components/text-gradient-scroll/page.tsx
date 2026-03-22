import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { TextGradientScrollExamples } from "./examples";
import { ScrollText, Layers, Palette, Feather } from "lucide-react";

export const metadata: Metadata = {
  title: "Text Gradient Scroll — FlexUI",
  description:
    "Text that reveals a gradient fill as the user scrolls down the page.",
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
          Text Gradient Scroll
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Text that progressively reveals a vibrant gradient fill as the user
          scrolls down the page. Great for hero sections and landing pages.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <TextGradientScrollExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add text-gradient-scroll`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { TextGradientScroll } from "@/components/flexui/text-gradient-scroll";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<TextGradientScroll text="Build beautiful interfaces" />

{/* With custom className */}
<TextGradientScroll
  text="Scroll to reveal the gradient"
  className="text-center"
/>`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "text",
              type: "string",
              default: "\u2014",
              description: "The text content to display with the gradient reveal effect.",
              required: true,
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the wrapper element.",
            },
          ]}
        />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <ScrollText className="h-4 w-4" />, label: "Scroll-Driven Reveal", desc: "The gradient fill sweeps left-to-right as the user scrolls, driven by useScroll progress." },
            { icon: <Layers className="h-4 w-4" />, label: "Layered Text Technique", desc: "A dimmed base layer sits behind a clipped gradient layer, creating a smooth progressive reveal." },
            { icon: <Palette className="h-4 w-4" />, label: "Vibrant Gradient", desc: "Ships with a cyan-to-blue-to-purple gradient that makes text pop against dark backgrounds." },
            { icon: <Feather className="h-4 w-4" />, label: "Lightweight", desc: "No JavaScript animation loop — the clip-path is driven reactively by Framer Motion transforms." },
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
        <DocSubSection id="hero-headline" title="Hero Headline">
          <CodeBlock code={`<TextGradientScroll
  text="Build something beautiful"
  className="text-5xl font-black text-center"
/>`} filename="variant.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="custom-styling" title="Custom Font Size">
          <CodeBlock code={`<TextGradientScroll
  text="Scroll to reveal the magic"
  className="text-2xl md:text-4xl font-semibold"
/>`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The text content is rendered twice in the DOM, but both layers contain the same text so screen readers announce it once.", "The gradient effect is purely visual and does not affect the semantic meaning of the content.", "The base text layer in zinc-700 ensures content is readable even before the gradient reveals."].map((note, i) => (
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
