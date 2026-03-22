import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "BlurFade — FlexUI",
  description:
    "An entrance animation wrapper that fades content in with a blur-to-clear transition as it enters the viewport.",
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
          BlurFade
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          An entrance animation wrapper that fades content in with a
          blur-to-clear transition when it enters the viewport. Use staggered
          delays for elegant sequential reveals.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add blur-fade`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { BlurFade } from "@/components/flexui/blur-fade";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`{/* Basic usage */}
<BlurFade>
  <h1>Hello World</h1>
</BlurFade>

{/* Staggered entrance */}
<BlurFade delay={0}>
  <h2>Title</h2>
</BlurFade>
<BlurFade delay={0.15}>
  <p>Subtitle appears after the title.</p>
</BlurFade>
<BlurFade delay={0.3}>
  <button>Action</button>
</BlurFade>`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "children",
              type: "ReactNode",
              default: "—",
              description: "The content to animate into view.",
              required: true,
            },
            {
              name: "className",
              type: "string",
              default: "—",
              description: "Additional CSS classes for the wrapper div.",
            },
            {
              name: "delay",
              type: "number",
              default: "0",
              description:
                "Delay in seconds before the animation starts. Use for staggering.",
            },
            {
              name: "duration",
              type: "number",
              default: "0.6",
              description: "Duration of the fade animation in seconds.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
