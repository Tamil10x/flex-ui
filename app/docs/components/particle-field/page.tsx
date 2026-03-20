import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ParticleFieldPlayground } from "./playground";
import { ParticleFieldExamples } from "./examples";

export const metadata: Metadata = {
  title: "Particle Field — FlexUI",
  description:
    "Floating particle dots that drift slowly across the background with CSS keyframe animations.",
};

export default function ParticleFieldDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            CSS Keyframes
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Particle Field
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Floating particle dots that drift slowly across the background. Each
          particle has a randomized position, size, and animation timing for an
          organic, ambient feel.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Particles are generated with useMemo and animated with CSS keyframes.
        </p>
        <ParticleFieldPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Default, colored, and dense particle configurations.
        </p>
        <ParticleFieldExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/particle-field"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                No additional dependencies required — CSS keyframe animations.
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Copy component file
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/particle-field.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Add keyframes to your globals.css
                </p>
                <CodeBlock
                  code={`@keyframes particle-drift {
  0%   { transform: translateY(0px) translateX(0px); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(-60px) translateX(20px); opacity: 0; }
}

@utility animate-particle-drift {
  animation: particle-drift 6s ease-in-out infinite;
}`}
                  filename="globals.css"
                  language="css"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Requires{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    cn()
                  </code>{" "}
                  at{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    @/lib/utils
                  </code>
                </p>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="particle-field-props" title="ParticleField">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Content rendered on top of the particle field.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the container.",
              },
              {
                name: "count",
                type: "number",
                default: "40",
                description: "Number of particles to render.",
              },
              {
                name: "color",
                type: "string",
                default: '"rgba(255,255,255,0.6)"',
                description: "CSS color value for the particles.",
              },
              {
                name: "maxSize",
                type: "number",
                default: "4",
                description: "Maximum particle diameter in pixels.",
              },
              {
                name: "speed",
                type: "number",
                default: "1",
                description:
                  "Animation speed multiplier. Higher values = faster drift.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="configurations" title="Configurations">
          <CodeBlock
            code={`{/* Default — 40 white particles */}
<ParticleField />

{/* Colored particles */}
<ParticleField count={60} color="rgba(56, 189, 248, 0.7)" />

{/* Dense & slow */}
<ParticleField count={100} speed={0.5} maxSize={3} />`}
            filename="Examples"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Troubleshooting */}
      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-3">
          {[
            {
              q: "Particles are not visible",
              a: "Make sure you have added the particle-drift keyframe and animate-particle-drift utility to your globals.css.",
            },
            {
              q: "Too many particles cause jank",
              a: "Keep count under 100 for smooth performance. Each particle is a simple CSS-animated div with no JS runtime cost.",
            },
            {
              q: "Particles appear outside the container",
              a: "The container uses overflow-hidden. Make sure you haven't overridden this with a className.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-white/[0.06] bg-zinc-950/50 transition-all duration-200 hover:border-white/[0.1]"
            >
              <div className="p-5 text-sm font-semibold text-white">
                {item.q}
              </div>
              <div className="border-t border-white/[0.04] px-5 py-4 text-sm text-zinc-500">
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </DocSection>
    </div>
  );
}
