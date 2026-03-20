import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { WavyBackgroundPlayground } from "./playground";
import { WavyBackgroundExamples } from "./examples";

export const metadata: Metadata = {
  title: "Wavy Background — FlexUI",
  description:
    "SVG-based animated wavy lines in the background for atmospheric depth.",
};

export default function WavyBackgroundDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            CSS Only
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Wavy Background
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          SVG-based animated wavy lines that drift horizontally in the
          background. Multiple sine-wave paths stacked with decreasing opacity
          create a sense of depth and motion.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Subtle wave lines drifting horizontally behind content.
        </p>
        <WavyBackgroundPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Different wave counts, colors, and amplitudes.
        </p>
        <WavyBackgroundExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/wavy-background"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                No external dependencies required.
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
                    components/flexui/wavy-background.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Add keyframe to globals.css
                </p>
                <CodeBlock
                  code={`@keyframes wave-drift {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
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
        <DocSubSection id="wavy-background-props" title="WavyBackground">
          <ApiTable
            rows={[
              {
                name: "waveCount",
                type: "number",
                default: "5",
                description: "Number of wave lines to render.",
              },
              {
                name: "color",
                type: "string",
                default: '"rgba(255, 255, 255, 0.1)"',
                description: "Stroke color for the wave lines.",
              },
              {
                name: "speed",
                type: "number",
                default: "15",
                description:
                  "Base animation duration in seconds for the horizontal drift.",
              },
              {
                name: "amplitude",
                type: "number",
                default: "30",
                description: "Wave amplitude in SVG units.",
              },
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description:
                  "Content to render above the wavy background.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description:
                  "Additional CSS classes for the container element.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="wave-variations" title="Wave Variations">
          <CodeBlock
            code={`{/* Default subtle white waves */}
<WavyBackground className="h-[400px] rounded-2xl" />

{/* Cyan colored waves with more lines */}
<WavyBackground
  waveCount={8}
  color="rgba(6, 182, 212, 0.15)"
  className="h-[400px] rounded-2xl"
/>

{/* Large amplitude, slow drift */}
<WavyBackground amplitude={50} speed={25} className="h-[400px] rounded-2xl" />`}
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
              q: "Waves are not visible",
              a: "The wave strokes are very subtle by design (low opacity). Try increasing the alpha in the color prop or use a darker background on the container.",
            },
            {
              q: "Animation is not looping smoothly",
              a: "The SVG viewBox is wider than the container to allow seamless looping. Ensure overflow-hidden is applied to the container (included by default).",
            },
            {
              q: "Too many waves cause jank",
              a: "Each wave is an animated SVG path. Keep waveCount under 10 for best performance. Reduce amplitude for simpler paths.",
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
