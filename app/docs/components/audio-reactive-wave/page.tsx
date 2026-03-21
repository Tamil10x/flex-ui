import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { AudioReactiveWavePlayground } from "./playground";
import { AudioReactiveWaveExamples } from "./examples";

export const metadata: Metadata = {
  title: "Audio Reactive Wave — FlexUI",
  description:
    "A 3D waveform mesh that reacts to audio input or generated demo data with gradient bars and glow effects.",
};

export default function AudioReactiveWaveDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 2
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Web Audio API
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Audio Reactive Wave
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A waveform visualizer with gradient-colored bars that react to audio
          input or generate animated demo data. Each bar has rounded tops, glow
          effects, and smooth 50ms transitions.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Demo mode generates overlapping sine waves via requestAnimationFrame.
        </p>
        <AudioReactiveWavePlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Default, colored, and dense bar configurations.
        </p>
        <AudioReactiveWaveExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/audio-reactive-wave"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                No additional dependencies required.
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
                    components/flexui/audio-reactive-wave.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Requires{" "}
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
        <DocSubSection id="audio-reactive-wave-props" title="AudioReactiveWave">
          <ApiTable
            rows={[
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the container.",
              },
              {
                name: "color",
                type: "string",
                default: '"#8B5CF6"',
                description: "Primary bar color (hex).",
              },
              {
                name: "accentColor",
                type: "string",
                default: '"#389CFD"',
                description: "Accent color for tall bars (hex).",
              },
              {
                name: "mode",
                type: '"mic" | "demo"',
                default: '"demo"',
                description:
                  "Use microphone input or generate animated demo data.",
              },
              {
                name: "bars",
                type: "number",
                default: "64",
                description: "Number of wave bars to render.",
              },
              {
                name: "gap",
                type: "number",
                default: "2",
                description: "Gap between bars in pixels.",
              },
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Content rendered on top of the wave (z-10).",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="configurations" title="Configurations">
          <CodeBlock
            code={`{/* Default — purple demo wave */}
<AudioReactiveWave />

{/* Cyan accent with wider gaps */}
<AudioReactiveWave color="#06B6D4" accentColor="#22D3EE" bars={48} gap={3} />

{/* Microphone input */}
<AudioReactiveWave mode="mic" bars={128} gap={1} />`}
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
              q: "Microphone mode falls back to demo",
              a: "The browser requires microphone permission. If denied, the component automatically falls back to demo mode.",
            },
            {
              q: "Bars are not animating",
              a: "Ensure the component is mounted client-side. The component uses a mounted guard for hydration safety.",
            },
            {
              q: "Performance issues with many bars",
              a: "Keep bars under 128 for smooth performance. Each bar is a simple div with CSS transitions.",
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
