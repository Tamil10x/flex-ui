import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { DividerExamples } from "./examples";
import { ArrowLeftRight, Type, Blend, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Divider — FlexUI",
  description: "A versatile divider component with horizontal/vertical orientation, labels, and gradient support.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Divider</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A versatile divider supporting horizontal and vertical orientations, optional labels, and gradient styling.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <DividerExamples />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add divider`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { Divider } from "@/components/flexui/divider";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`{/* Simple horizontal divider */}
<Divider />

{/* Gradient divider with label */}
<Divider label="OR" gradient />

{/* Vertical divider */}
<div className="flex h-12 items-center gap-4">
  <span>Left</span>
  <Divider orientation="vertical" gradient />
  <span>Right</span>
</div>`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "label", type: "string", default: "-", description: "Optional text label displayed in the center of a horizontal divider." },
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "The orientation of the divider." },
          { name: "gradient", type: "boolean", default: "false", description: "Whether to use a gradient style instead of a solid line." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the divider." },
        ]} />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <ArrowLeftRight className="h-4 w-4" />, label: "Dual Orientation", desc: "Supports both horizontal and vertical orientations for flexible layout separation." },
            { icon: <Type className="h-4 w-4" />, label: "Optional Labels", desc: "Add centered text labels like 'OR' or 'Section' within horizontal dividers." },
            { icon: <Blend className="h-4 w-4" />, label: "Gradient Mode", desc: "Enable gradient styling that fades from transparent to visible for a polished look." },
            { icon: <Sparkles className="h-4 w-4" />, label: "Entrance Animation", desc: "Horizontal dividers animate into view with a subtle fade-up transition on scroll." },
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
        <DocSubSection id="gradient-label" title="Gradient Divider with Label">
          <CodeBlock code={`<Divider label="OR" gradient className="my-8" />`} filename="labeled.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="vertical-separator" title="Vertical Separator in Toolbar">
          <CodeBlock code={`<div className="flex h-10 items-center gap-4">
  <button>Bold</button>
  <Divider orientation="vertical" gradient />
  <button>Italic</button>
  <Divider orientation="vertical" gradient />
  <button>Underline</button>
</div>`} filename="toolbar.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Consider adding role=\"separator\" for screen readers when using the divider as a semantic boundary.", "Labeled dividers use visible text that screen readers can announce for context.", "Gradient and animation styles are purely decorative and do not affect content accessibility."].map((note, i) => (
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
