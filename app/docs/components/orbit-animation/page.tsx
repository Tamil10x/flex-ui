import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { OrbitAnimationExamples } from "./examples";
import { Circle, Timer, Sun, Cpu } from "lucide-react";

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

      <DocSection id="examples" title="Examples">
        <OrbitAnimationExamples />
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Circle className="h-4 w-4 text-blue-400" />, label: "Concentric Orbits", desc: "Each dot revolves on its own ring at increasing radii (50px + 15px per ring)." },
            { icon: <Timer className="h-4 w-4 text-blue-400" />, label: "Staggered Timing", desc: "Progressive animation delays and durations create a natural, layered orbital motion." },
            { icon: <Sun className="h-4 w-4 text-blue-400" />, label: "Glowing Center", desc: "A white center dot with 12px glow shadow serves as the focal point of the orbit." },
            { icon: <Cpu className="h-4 w-4 text-blue-400" />, label: "CSS-Only Animation", desc: "Pure CSS keyframes with style jsx for self-contained animation without external dependencies." },
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
        <DocSubSection id="purple-orbit" title="Purple Fast Orbit">
          <CodeBlock code={`<OrbitAnimation dotCount={4} speed={5} color="rgb(168,85,247)" />`} filename="purple.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="many-dots" title="Dense Orbit">
          <CodeBlock code={`<OrbitAnimation dotCount={10} speed={12} color="rgb(52,211,153)" />`} filename="dense.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The animation is purely decorative and should be accompanied by meaningful content for screen readers.", "CSS-only animation respects the prefers-reduced-motion media query when applied via Tailwind utilities.", "Consider wrapping the component with an aria-hidden attribute when used as a decorative background element."].map((note, i) => (
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
