import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "MagneticCard — FlexUI",
  description:
    "A card that follows the cursor with a magnetic spring animation for an interactive hover experience.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
          Component
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          MagneticCard
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A card that follows the cursor with a magnetic spring animation. The
          card subtly shifts toward the mouse position and springs back when the
          cursor leaves. Configurable attraction strength for different
          interaction intensities.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock
          code={`npx flexui add magnetic-card`}
          filename="Terminal"
        />
        <div className="mt-4">
          <CodeBlock
            code={`import { MagneticCard } from "@/components/flexui/magnetic-card";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<MagneticCard strength={30}>
  <h3 className="text-lg font-semibold text-white">Card Title</h3>
  <p className="mt-2 text-sm text-zinc-400">
    Hover to see the magnetic effect.
  </p>
</MagneticCard>`}
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
            {
              name: "strength",
              type: "number",
              default: "30",
              description:
                "Magnetic attraction strength in pixels. Higher values increase how far the card moves toward the cursor.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
