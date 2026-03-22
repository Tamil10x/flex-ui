import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Kbd — FlexUI",
  description:
    "A keyboard key indicator component styled to resemble physical keys, with a subtle entrance animation.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
          Component
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Kbd
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A keyboard key indicator component styled to resemble physical
          keycaps. Features a subtle entrance animation and monospace font for
          documenting keyboard shortcuts and hotkeys.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add kbd`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { Kbd } from "@/components/flexui/kbd";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<div className="flex items-center gap-2">
  <Kbd>Ctrl</Kbd>
  <span>+</span>
  <Kbd>S</Kbd>
  <span className="ml-2 text-sm text-zinc-500">Save</span>
</div>`}
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
              description:
                "The key label text to display inside the keycap.",
              required: true,
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the kbd element.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
