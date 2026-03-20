import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { TextRevealPlayground } from "./playground";
import { TextRevealExamples } from "./examples";

export const metadata: Metadata = {
  title: "Text Reveal — FlexUI",
  description:
    "A text animation component that reveals text character-by-character or word-by-word with staggered blur animations.",
};

export default function TextRevealDoc() {
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
          Text Reveal
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A text animation component that reveals text character-by-character or
          word-by-word with a staggered blur-and-slide animation when it enters
          the viewport.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Scroll down or refresh to see the reveal animation.
        </p>
        <TextRevealPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Hero headlines, typewriter effects, and slow dramatic reveals.
        </p>
        <TextRevealExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/text-reveal"
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
                    components/flexui/text-reveal.tsx
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
        <DocSubSection id="text-reveal-props" title="TextReveal">
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
                name: "mode",
                type: '"char" | "word"',
                default: '"char"',
                description:
                  'Reveal mode. "char" animates letter by letter, "word" animates word by word.',
              },
              {
                name: "stagger",
                type: "number",
                default: "0.03",
                description:
                  "Delay in seconds between each unit (character or word).",
              },
              {
                name: "duration",
                type: "number",
                default: "0.5",
                description: "Animation duration per unit in seconds.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the wrapper span.",
              },
              {
                name: "once",
                type: "boolean",
                default: "true",
                description:
                  "If true, the animation only triggers once when it enters the viewport.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="modes" title="Reveal Modes">
          <CodeBlock
            code={`{/* Character-by-character */}
<TextReveal text="Hello world" mode="char" stagger={0.03} />

{/* Word-by-word */}
<TextReveal text="Hello world" mode="word" stagger={0.1} />

{/* Slow dramatic reveal */}
<TextReveal text="Wow" mode="char" stagger={0.15} duration={0.8} />

{/* Re-trigger on every scroll into view */}
<TextReveal text="Always animates" once={false} />`}
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
              q: "Whitespace between words is lost",
              a: 'In "word" mode, whitespace tokens are preserved as separate spans with whitespace-pre styling.',
            },
            {
              q: "Animation feels too fast",
              a: "Increase the stagger value (e.g., 0.08 for chars, 0.15 for words) and the duration (e.g., 0.8).",
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
