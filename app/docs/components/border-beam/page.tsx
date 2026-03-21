import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { BorderBeamPlayground } from "./playground";
import { BorderBeamExamples } from "./examples";

export const metadata: Metadata = {
  title: "Border Beam — FlexUI",
  description:
    "A continuous animated light beam that travels around the border of an element.",
};

export default function BorderBeamDoc() {
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
          Border Beam
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A continuous animated light beam that travels around the border of an
          element. Uses a conic-gradient with CSS keyframes for smooth,
          GPU-accelerated rotation and a glow trail effect.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <BorderBeamPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <BorderBeamExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/border-beam"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                No external dependencies. Uses the{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  border-rotate
                </code>{" "}
                keyframe from globals.css.
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
                    components/flexui/border-beam.tsx
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
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Ensure your globals.css contains the border-rotate keyframe
                </p>
                <CodeBlock
                  code={`@keyframes border-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
        <DocSubSection id="props" title="BorderBeam Props">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "ReactNode",
                default: "\u2014",
                description: "Content rendered inside the bordered element.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional classes on the outer wrapper.",
              },
              {
                name: "color",
                type: "string",
                default: '"#389CFD"',
                description: "CSS color for the beam.",
              },
              {
                name: "speed",
                type: "number",
                default: "4",
                description: "Duration in seconds for one full revolution.",
              },
              {
                name: "beamSize",
                type: "number",
                default: "80",
                description:
                  "Beam length in pixels (controls the gradient spread).",
              },
              {
                name: "borderRadius",
                type: "string",
                default: '"12px"',
                description: "CSS border-radius for the element.",
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
              "A conic-gradient with a single bright spot (the beam) and the rest transparent rotates continuously via the border-rotate CSS keyframe.",
              "The gradient element is sized at 200% (inset-[-50%]) so the rotation covers the full circle around the border.",
              "An inner solid bg-zinc-950 div masks the center, leaving only the thin border ring of rotating beam visible.",
              "A second blurred copy of the same rotating gradient creates the glow trail effect behind the beam.",
              "The color, speed, and borderRadius props give full control over the beam appearance.",
              "Pure CSS animation — no JavaScript requestAnimationFrame or timers needed.",
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
    </div>
  );
}
