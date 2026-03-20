import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { TextScramblePlayground } from "./playground";
import { TextScrambleExamples } from "./examples";

export const metadata: Metadata = {
  title: "Text Scramble — FlexUI",
  description:
    "A text animation component that scrambles through random characters before resolving to the final text.",
};

export default function TextScrambleDoc() {
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
          Text Scramble
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A text animation that scrambles through random characters before
          resolving to the final text, left-to-right. Perfect for hero
          headlines, loading states, and dramatic reveals.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Scroll down or refresh to see the scramble animation.
        </p>
        <TextScramblePlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Hero scrambles, fast decryption, and custom character sets.
        </p>
        <TextScrambleExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/text-scramble"
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
                    components/flexui/text-scramble.tsx
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
        <DocSubSection id="text-scramble-props" title="TextScramble">
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
                name: "characters",
                type: "string",
                default: '"A-Z a-z 0-9 !@#$%"',
                description: "Characters to use for the scramble effect.",
              },
              {
                name: "speed",
                type: "number",
                default: "50",
                description: "Speed of the scramble in milliseconds per tick.",
              },
              {
                name: "revealDelay",
                type: "number",
                default: "3",
                description:
                  "How many ticks before each character resolves to its final value.",
              },
              {
                name: "triggerOnView",
                type: "boolean",
                default: "true",
                description:
                  "If true, the animation triggers when scrolled into the viewport.",
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
        <DocSubSection id="scramble-options" title="Scramble Options">
          <CodeBlock
            code={`{/* Default scramble */}
<TextScramble text="Hello world" />

{/* Fast decryption */}
<TextScramble text="Decrypted!" speed={20} revealDelay={2} />

{/* Binary characters only */}
<TextScramble text="01001000" characters="01" />

{/* Slow dramatic scramble */}
<TextScramble text="Dramatic" speed={80} revealDelay={6} />`}
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
              q: "Text jumps around during scramble",
              a: "The component uses a monospace font by default to keep character widths consistent. Add font-mono to your className if you override the font.",
            },
            {
              q: "Animation doesn't trigger",
              a: "Set triggerOnView={false} to start immediately, or ensure the element scrolls into view.",
            },
            {
              q: "Scramble is too fast or too slow",
              a: "Adjust the speed prop (lower = faster) and revealDelay (higher = more scramble ticks per character).",
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
