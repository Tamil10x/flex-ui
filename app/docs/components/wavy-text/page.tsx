import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { WavyTextPlayground } from "./playground";
import { WavyTextExamples } from "./examples";

export const metadata: Metadata = {
  title: "Wavy Text — FlexUI",
  description:
    "Text where each character has a wave animation offset with spring physics and viewport detection.",
};

export default function WavyTextDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Wavy Text
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Text where each character animates in with a staggered wave pattern
          using spring physics. Triggered on scroll into viewport.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Scroll down or refresh to see the wave animation.
        </p>
        <WavyTextPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Hero headlines, subtle waves, and dramatic large-amplitude reveals.
        </p>
        <WavyTextExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/wavy-text"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>
                .
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
                  2. Copy component file
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/wavy-text.tsx
                  </code>
                </div>
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
        <DocSubSection id="wavy-text-props" title="WavyText">
          <ApiTable
            rows={[
              {
                name: "text",
                type: "string",
                default: "\u2014",
                description: "The text content to animate.",
                required: true,
              },
              {
                name: "amplitude",
                type: "number",
                default: "20",
                description: "Wave amplitude in pixels (initial y offset).",
              },
              {
                name: "speed",
                type: "number",
                default: "0.3",
                description: "Animation duration per character in seconds.",
              },
              {
                name: "delay",
                type: "number",
                default: "0.04",
                description:
                  "Stagger delay between characters in seconds.",
              },
              {
                name: "once",
                type: "boolean",
                default: "true",
                description:
                  "If true, the animation only triggers once when it enters the viewport.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the wrapper span.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="wave-variations" title="Wave Variations">
          <CodeBlock
            code={`{/* Default wave */}
<WavyText text="Hello world" />

{/* Subtle, fast wave */}
<WavyText text="Quick wave" amplitude={8} delay={0.02} speed={0.2} />

{/* Dramatic, slow wave */}
<WavyText text="Big wave" amplitude={40} delay={0.08} speed={0.5} />

{/* Re-trigger on every scroll into view */}
<WavyText text="Always animates" once={false} />`}
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
              q: "Text doesn't animate on first load",
              a: "The component uses IntersectionObserver. Make sure the text is not already in the viewport when the page loads, or set once={false} to re-trigger.",
            },
            {
              q: "Characters overlap during animation",
              a: "Each character is an inline-block span. Ensure the parent container has enough width and the font size is appropriate.",
            },
            {
              q: "Animation feels too bouncy",
              a: "The component uses spring physics (stiffness: 150, damping: 12). Fork the component to adjust these values for a stiffer or softer feel.",
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
