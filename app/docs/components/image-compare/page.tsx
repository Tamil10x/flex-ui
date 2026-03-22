import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

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
    </div>
  );
}
