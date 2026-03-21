import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { MovingBorderPlayground } from "./playground";
import { MovingBorderExamples } from "./examples";

export const metadata: Metadata = {
  title: "Moving Border — FlexUI",
  description:
    "An animated gradient light that travels along the border of an element.",
};

export default function MovingBorderDoc() {
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
          Moving Border
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          An animated gradient light that continuously travels along the border
          of an element. Uses CSS keyframes for performant rotation of a
          conic-gradient, with a solid inner background that masks everything
          except the border.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <MovingBorderPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <MovingBorderExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/moving-border"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>
                . Uses the{" "}
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
                  1. Install dependencies
                </p>
                <CodeBlock
                  code="npm install framer-motion"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/moving-border.tsx
                  </code>
                </div>
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
        <DocSubSection id="props" title="MovingBorder Props">
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
                default: '"from-violet-500 via-cyan-500 to-violet-500"',
                description:
                  "Border gradient color. Accepts Tailwind gradient classes or raw CSS color stops.",
              },
              {
                name: "speed",
                type: "number",
                default: "3",
                description: "Duration in seconds for one full border revolution.",
              },
              {
                name: "borderRadius",
                type: "string",
                default: '"1rem"',
                description: "CSS border-radius value for the element.",
              },
              {
                name: "borderWidth",
                type: "number",
                default: "2",
                description: "Border width in pixels.",
              },
              {
                name: "animate",
                type: "boolean",
                default: "true",
                description: "Whether the gradient light rotates.",
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
              "An outer wrapper establishes the border region with overflow hidden and padding equal to the border width.",
              "Inside, a conic-gradient element is sized at 200% (inset-[-50%]) so the gradient covers the full rotation circle.",
              "The gradient rotates continuously via a CSS @keyframes animation (border-rotate) for GPU-accelerated performance.",
              "An inner solid bg-zinc-950 div masks the center, leaving only the thin border ring of rotating gradient visible.",
              "The color prop maps common Tailwind gradient classes to hex values for the conic-gradient stops.",
              "Setting animate={false} pauses the rotation, displaying a static gradient border.",
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
