import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Tilt Card — FlexUI",
  description:
    "A card that applies a 3D tilt effect following the cursor position.",
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
          Tilt Card
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A card that applies a smooth 3D perspective tilt effect that follows
          the cursor. Resets gracefully when the mouse leaves.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add tilt-card`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { TiltCard } from "@/components/flexui/tilt-card";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<TiltCard>
  <h3 className="text-lg font-semibold text-white">Card Title</h3>
  <p className="text-sm text-zinc-400">Card content goes here.</p>
</TiltCard>

{/* Custom tilt and perspective */}
<TiltCard maxTilt={20} perspective={800}>
  <p className="text-white">More dramatic tilt effect</p>
</TiltCard>`}
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
              type: "React.ReactNode",
              default: "\u2014",
              description: "The content rendered inside the card.",
              required: true,
            },
            {
              name: "maxTilt",
              type: "number",
              default: "15",
              description:
                "Maximum tilt angle in degrees on both axes.",
            },
            {
              name: "perspective",
              type: "number",
              default: "1000",
              description:
                "CSS perspective value in pixels for the 3D transform.",
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the card element.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
