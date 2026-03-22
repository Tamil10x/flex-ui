import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "OrbitAnimation — FlexUI",
  description:
    "Animated orbital dots revolving around a center point with configurable count, speed, and color.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
          Component
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          OrbitAnimation
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Animated orbital dots that revolve around a glowing center point at
          different radii and speeds. Each dot orbits on its own ring with a
          staggered delay. Great for loading states, hero sections, and
          decorative backgrounds.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock
          code={`npx flexui add orbit-animation`}
          filename="Terminal"
        />
        <div className="mt-4">
          <CodeBlock
            code={`import { OrbitAnimation } from "@/components/flexui/orbit-animation";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`{/* Default orbit */}
<OrbitAnimation />

{/* Custom configuration */}
<OrbitAnimation
  dotCount={4}
  speed={5}
  color="rgb(168,85,247)"
/>`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the orbit container.",
            },
            {
              name: "dotCount",
              type: "number",
              default: "6",
              description:
                "Number of orbiting dots. Each dot gets its own ring at an increasing radius.",
            },
            {
              name: "speed",
              type: "number",
              default: "8",
              description:
                "Base animation duration in seconds for the innermost orbit. Outer orbits are progressively slower.",
            },
            {
              name: "color",
              type: "string",
              default: '"rgb(56,189,248)"',
              description:
                "CSS color for the orbiting dots and their glow effect.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
