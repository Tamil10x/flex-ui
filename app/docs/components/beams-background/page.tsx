import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { BeamsBackgroundPlayground } from "./playground";
import { BeamsBackgroundExamples } from "./examples";

export const metadata: Metadata = {
  title: "Beams Background — FlexUI",
  description:
    "Animated light beams that sweep across the background with staggered delays and random angles.",
};

export default function BeamsBackgroundDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Pure CSS
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Beams Background
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Animated light beams that sweep across the background with staggered
          delays and randomized angles. Built with pure CSS keyframes — no
          JavaScript animation loop, no external dependencies.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <BeamsBackgroundPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <BeamsBackgroundExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/beams-background"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                No external dependencies required. Uses CSS keyframe animations
                defined in{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  globals.css
                </code>
                .
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Copy component
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/beams-background.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Add keyframes to globals.css
                </p>
                <CodeBlock
                  code={`@keyframes beam-sweep {
  0% { transform: translateX(-100%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateX(200%); opacity: 0; }
}

@utility animate-beam-sweep {
  animation: beam-sweep 8s linear infinite;
}`}
                  filename="globals.css"
                />
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="BeamsBackground Props">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "ReactNode",
                default: "—",
                description: "Content rendered above the beams.",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description:
                  "Additional classes on the outer container.",
              },
              {
                name: "beamCount",
                type: "number",
                default: "6",
                description: "Number of animated beams.",
              },
              {
                name: "color",
                type: "string",
                default: '"rgba(255,255,255,0.5)"',
                description:
                  "Beam color as any valid CSS color value.",
              },
              {
                name: "speed",
                type: "number",
                default: "8",
                description:
                  "Animation cycle duration in seconds.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* How it works */}
      <DocSection id="how-it-works" title="How It Works">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Beam positions, angles (30-150 degrees), widths, and animation delays are generated deterministically with useMemo using a seeded random function — no hydration mismatches.",
              "Each beam is an absolute-positioned div with a narrow linear-gradient (transparent to color to transparent) rotated at its random angle.",
              "The beam-sweep CSS keyframe translates each beam from -100% to 200% on the X axis, creating a sweeping motion across the container.",
              "Staggered animation delays give each beam a different start time, creating an organic, layered effect.",
              "Low opacity values (0.03-0.08) keep the effect subtle and suitable as an ambient background.",
              "Content is rendered in a relative z-10 layer above the beams, so text and interactive elements remain fully accessible.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-[10px] font-bold text-emerald-400">
                  {i + 1}
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Pure CSS Animation", desc: "Beams sweep using CSS keyframes — no JavaScript animation loop or requestAnimationFrame." },
            { icon: "o", label: "Deterministic Randomness", desc: "Seeded random function ensures identical beam layout between server and client renders." },
            { icon: "#", label: "Configurable Density", desc: "Control beam count, color, and speed with simple props for any visual intensity." },
            { icon: "+", label: "Content Layer", desc: "Children render in a z-10 layer above beams, keeping interactive elements fully accessible." },
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
        <DocSubSection id="colored-beams" title="Colored Beams">
          <CodeBlock code={`<BeamsBackground
  beamCount={10}
  color="rgba(139, 92, 246, 0.4)"
  speed={6}
  className="min-h-[400px] rounded-2xl bg-zinc-950"
>
  <h1 className="text-white">Purple Beams</h1>
</BeamsBackground>`} filename="colored.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="subtle-beams" title="Subtle Background">
          <CodeBlock code={`<BeamsBackground beamCount={3} speed={12} color="rgba(255,255,255,0.2)">
  <div className="py-20 text-center text-zinc-300">Minimal beams</div>
</BeamsBackground>`} filename="subtle.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Beams are decorative and use pointer-events-none, so they never block user interactions.", "Content renders in a z-10 layer above the beam layer for full accessibility.", "The low opacity values (0.03-0.08) prevent the beams from creating distracting visual noise.", "Consider using prefers-reduced-motion media query to disable beam animations for sensitive users."].map((note, i) => (
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
