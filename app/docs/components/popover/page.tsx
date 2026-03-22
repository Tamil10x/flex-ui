import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Popover — FlexUI",
  description:
    "A floating content panel that appears next to a trigger element with spring animation and portal rendering.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
          Component
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Popover
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A floating content panel that appears next to a trigger element.
          Renders via a portal for correct stacking, supports four placement
          sides, and dismisses on outside click or Escape key. Animated with
          Framer Motion spring physics.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add popover`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { Popover } from "@/components/flexui/popover";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<Popover
  trigger={<button>Open Popover</button>}
  side="bottom"
>
  <div className="w-48">
    <p className="font-medium text-white">Title</p>
    <p className="mt-1 text-xs text-zinc-400">
      Popover body content here.
    </p>
  </div>
</Popover>`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "trigger",
              type: "ReactNode",
              default: "\u2014",
              description:
                "The element that toggles the popover on click.",
              required: true,
            },
            {
              name: "children",
              type: "ReactNode",
              default: "\u2014",
              description: "Content rendered inside the floating panel.",
              required: true,
            },
            {
              name: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"bottom"',
              description:
                "Which side of the trigger the popover appears on.",
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description:
                "Additional CSS classes for the popover panel.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
