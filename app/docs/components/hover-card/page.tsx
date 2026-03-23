import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { HoverCardExamples } from "./examples";
import { ArrowUp, Cloudy, SunDim, LayoutGrid } from "lucide-react";

export const metadata: Metadata = {
  title: "HoverCard — FlexUI",
  description:
    "A card component that lifts and scales on hover with a spring animation and enhanced shadow.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
          Component
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          HoverCard
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A card component that lifts upward and scales slightly on hover using
          Framer Motion spring physics. The shadow deepens and the border
          brightens for a tactile, interactive feel.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <HoverCardExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add hover-card`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { HoverCard } from "@/components/flexui/hover-card";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<HoverCard>
  <h3 className="text-lg font-semibold text-white">Card Title</h3>
  <p className="mt-2 text-sm text-zinc-400">
    Card content goes here.
  </p>
</HoverCard>`}
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
              description: "Content rendered inside the card.",
              required: true,
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the card container.",
            },
          ]}
        />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <ArrowUp className="h-4 w-4 text-blue-400" />, label: "Spring Lift Animation", desc: "Card lifts 6px upward with 1.02x scale using Framer Motion spring physics on hover." },
            { icon: <Cloudy className="h-4 w-4 text-blue-400" />, label: "Enhanced Shadow", desc: "Shadow deepens from 20px to 40px blur on hover for a tactile floating effect." },
            { icon: <SunDim className="h-4 w-4 text-blue-400" />, label: "Border Brightening", desc: "Border opacity increases from 8% to 15% white on hover for subtle visual feedback." },
            { icon: <LayoutGrid className="h-4 w-4 text-blue-400" />, label: "Drop-in Wrapper", desc: "Wrap any content to instantly add interactive hover behavior with zero configuration." },
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
        <DocSubSection id="custom-styling" title="Custom Styling">
          <CodeBlock code={`<HoverCard className="bg-blue-950/50 border-blue-500/20 p-8">
  <h3 className="text-blue-400 font-bold">Blue Theme</h3>
  <p className="text-zinc-400 text-sm mt-2">Override default styles with className.</p>
</HoverCard>`} filename="custom-style.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="card-grid" title="Card Grid Layout">
          <CodeBlock code={`<div className="grid grid-cols-3 gap-4">
  <HoverCard><p className="text-white">Card 1</p></HoverCard>
  <HoverCard><p className="text-white">Card 2</p></HoverCard>
  <HoverCard><p className="text-white">Card 3</p></HoverCard>
</div>`} filename="grid.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Hover animations are purely visual and do not affect content readability or interaction targets.", "The component uses a standard div wrapper, preserving semantic meaning of child content.", "Spring animation uses GPU-accelerated transform properties, avoiding layout thrashing for users with assistive technology."].map((note, i) => (
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
