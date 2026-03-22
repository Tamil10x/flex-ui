import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

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
    </div>
  );
}
