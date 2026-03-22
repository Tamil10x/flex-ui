import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { BlurFadeExamples } from "./examples";
import { Eye, Droplets, ListOrdered, CircleCheckBig } from "lucide-react";

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

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <BlurFadeExamples />
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Eye className="h-4 w-4" />, label: "Viewport Detection", desc: "Automatically triggers when the element scrolls into view using IntersectionObserver." },
            { icon: <Droplets className="h-4 w-4" />, label: "Blur-to-Clear Reveal", desc: "Combines opacity fade with a 12px blur that clears, creating an elegant entrance effect." },
            { icon: <ListOrdered className="h-4 w-4" />, label: "Staggered Delays", desc: "Use incremental delay values to create sequential reveal animations for lists and grids." },
            { icon: <CircleCheckBig className="h-4 w-4" />, label: "One-Time Trigger", desc: "Animations play once and stick — no jarring re-animations when scrolling back up." },
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
        <DocSubSection id="staggered-list" title="Staggered Card List">
          <CodeBlock code={`{cards.map((card, i) => (
  <BlurFade key={card.id} delay={i * 0.1} duration={0.5}>
    <Card>{card.title}</Card>
  </BlurFade>
))}`} filename="staggered.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="slow-reveal" title="Slow Cinematic Reveal">
          <CodeBlock code={`<BlurFade delay={0.3} duration={1.2} className="max-w-2xl">
  <h1 className="text-5xl font-bold">Welcome</h1>
</BlurFade>`} filename="cinematic.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Content is always present in the DOM — screen readers can access it even before the animation triggers.", "The animation is purely visual (opacity and filter) and does not affect document structure or focus order.", "Users who prefer reduced motion can be accommodated by setting duration to 0 or wrapping in a motion preference check."].map((note, i) => (
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
