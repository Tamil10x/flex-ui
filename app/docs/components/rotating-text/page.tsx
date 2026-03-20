import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { RotatingTextPlayground } from "./playground";
import { RotatingTextExamples } from "./examples";

export const metadata: Metadata = {
  title: "Rotating Text — FlexUI",
  description:
    "A text animation component that rotates through multiple strings with a rolling slot-machine effect.",
};

export default function RotatingTextDoc() {
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
          Rotating Text
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A text animation component that rotates through an array of strings
          with a rolling slot-machine effect. Blends inline with surrounding
          text using spring-physics transitions.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Watch the text cycle through words automatically.
        </p>
        <RotatingTextPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Hero headlines, role descriptions, and feature highlights.
        </p>
        <RotatingTextExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/rotating-text"
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
                    components/flexui/rotating-text.tsx
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
        <DocSubSection id="rotating-text-props" title="RotatingText">
          <ApiTable
            rows={[
              {
                name: "words",
                type: "string[]",
                default: "\u2014",
                description: "Array of strings to rotate through.",
                required: true,
              },
              {
                name: "duration",
                type: "number",
                default: "2000",
                description:
                  "Duration each word is shown in milliseconds.",
              },
              {
                name: "direction",
                type: '"up" | "down"',
                default: '"up"',
                description:
                  'Animation direction. "up" scrolls text upward, "down" scrolls text downward.',
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
        <DocSubSection id="directions" title="Direction & Timing">
          <CodeBlock
            code={`{/* Default upward rotation */}
<RotatingText words={["React", "Vue", "Svelte"]} />

{/* Downward rotation */}
<RotatingText words={["Fast", "Beautiful", "Accessible"]} direction="down" />

{/* Faster cycling */}
<RotatingText words={["One", "Two", "Three"]} duration={1000} />

{/* Inline with surrounding text */}
<p>
  We build <RotatingText words={["apps", "sites", "tools"]} /> for everyone.
</p>`}
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
              q: "Text jumps or flickers on transition",
              a: "The component uses AnimatePresence with popLayout mode for smooth transitions. Ensure framer-motion is v10+ for best results.",
            },
            {
              q: "Width changes abruptly between words",
              a: "The container uses inline-flex layout. For fixed width, add a min-width class via className to accommodate the longest word.",
            },
            {
              q: "Animation doesn't start",
              a: "Ensure the words array has at least 2 items. A single-item array won't produce visible rotation.",
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
