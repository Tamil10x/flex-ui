import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { ImageCompareExamples } from "./examples";
import { GripVertical, Scissors, Tag, Sparkle } from "lucide-react";

export const metadata: Metadata = {
  title: "ImageCompare — FlexUI",
  description:
    "A before/after image comparison slider with a draggable divider handle.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
          Component
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          ImageCompare
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A before/after image comparison slider with a draggable divider.
          Drag the handle to reveal the before and after images using CSS
          clip-path. Ideal for photo editing showcases, design comparisons, and
          visual diffs.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <ImageCompareExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock
          code={`npx flexui add image-compare`}
          filename="Terminal"
        />
        <div className="mt-4">
          <CodeBlock
            code={`import { ImageCompare } from "@/components/flexui/image-compare";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<ImageCompare
  before="/images/before.jpg"
  after="/images/after.jpg"
  className="max-w-lg"
/>`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "before",
              type: "string",
              default: "\u2014",
              description: "URL of the before (left) image.",
              required: true,
            },
            {
              name: "after",
              type: "string",
              default: "\u2014",
              description: "URL of the after (right) image.",
              required: true,
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description:
                "Additional CSS classes for the comparison container.",
            },
          ]}
        />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <GripVertical className="h-4 w-4 text-blue-400" />, label: "Draggable Divider", desc: "Pointer-capture-based slider handle that works with mouse, touch, and pen input." },
            { icon: <Scissors className="h-4 w-4 text-blue-400" />, label: "CSS Clip-Path Reveal", desc: "Before image clips using CSS inset() for smooth, GPU-accelerated masking." },
            { icon: <Tag className="h-4 w-4 text-blue-400" />, label: "Before/After Labels", desc: "Built-in corner labels indicate which side is before and which is after." },
            { icon: <Sparkle className="h-4 w-4 text-blue-400" />, label: "Glowing Handle", desc: "A centered drag handle with SVG arrows and a white glow line for clear affordance." },
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
        <DocSubSection id="constrained-width" title="Constrained Width">
          <CodeBlock code={`<ImageCompare
  before="/images/original.jpg"
  after="/images/edited.jpg"
  className="max-w-md mx-auto rounded-2xl"
/>`} filename="constrained.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="full-width" title="Full-Width Comparison">
          <CodeBlock code={`<ImageCompare
  before="/images/before.jpg"
  after="/images/after.jpg"
  className="w-full"
/>`} filename="full-width.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Images include alt text attributes (\"Before\" and \"After\") for screen reader context.", "The ew-resize cursor communicates the drag interaction affordance visually.", "Pointer capture ensures the slider continues tracking even if the cursor moves outside the container.", "Consider adding aria-label and aria-valuenow attributes to the slider for full ARIA compliance."].map((note, i) => (
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
