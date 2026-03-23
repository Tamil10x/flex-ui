import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { BlurTextPlayground } from "./playground";
import { BlurTextExamples } from "./examples";

export const metadata: Metadata = {
  title: "Blur Text — FlexUI",
  description:
    "A text animation component that fades in from a blurred state, word by word or all at once.",
};

export default function BlurTextDoc() {
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
          Blur Text
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A text animation component that fades in from a blurred state, word by
          word or all at once. Great for hero sections, page transitions, and
          focus-drawing headline effects.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Scroll down or refresh to see the blur-in animation.
        </p>
        <BlurTextPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Hero blur-in, all-at-once mode, and subtle soft focus.
        </p>
        <BlurTextExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/blur-text"
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
                    components/flexui/blur-text.tsx
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
        <DocSubSection id="blur-text-props" title="BlurText">
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
                type: '"word" | "all"',
                default: '"word"',
                description:
                  'Animation mode. "word" animates word by word, "all" animates entire text at once.',
              },
              {
                name: "blur",
                type: "number",
                default: "10",
                description: "Blur amount in pixels for the initial state.",
              },
              {
                name: "delay",
                type: "number",
                default: "0.08",
                description:
                  "Stagger delay between words in seconds (word mode only).",
              },
              {
                name: "duration",
                type: "number",
                default: "0.5",
                description:
                  "Duration of each word or text animation in seconds.",
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
                description: "Additional CSS classes for the wrapper element.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="blur-modes" title="Blur Modes">
          <CodeBlock
            code={`{/* Word by word */}
<BlurText text="Hello world" mode="word" blur={10} delay={0.08} />

{/* All at once */}
<BlurText text="Hello world" mode="all" blur={16} />

{/* Subtle blur */}
<BlurText text="Soft focus" blur={4} duration={0.7} />

{/* Re-trigger on every scroll into view */}
<BlurText text="Always animates" once={false} />`}
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
              q: "Blur looks choppy",
              a: "CSS filter blur can be GPU-intensive. Try reducing the blur value (e.g., blur={4}) for smoother performance on lower-end devices.",
            },
            {
              q: "Words overlap during animation",
              a: "Each word is wrapped in an inline-block span with whitespace-pre. Ensure the parent container has enough width for the full text.",
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Word-by-Word Reveal", desc: "Each word animates independently with staggered delays for a cinematic text entrance." },
            { icon: "o", label: "All-at-Once Mode", desc: "Switch to mode=\"all\" for a single, unified blur-to-clear transition on the entire text." },
            { icon: "#", label: "Viewport Triggered", desc: "Animation starts when the text scrolls into view using Framer Motion useInView." },
            { icon: "+", label: "Configurable Blur", desc: "Control blur intensity, stagger delay, duration, and repeat behavior with simple props." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization-patterns" title="Customization Patterns">
        <DocSubSection id="hero-headline" title="Hero Headline">
          <CodeBlock code={`<BlurText
  text="Build something incredible"
  mode="word"
  blur={16}
  delay={0.12}
  className="text-5xl font-bold text-white"
/>`} filename="hero.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="soft-focus" title="Soft Subtle Focus">
          <CodeBlock code={`<BlurText
  text="Gentle entrance"
  mode="all"
  blur={4}
  duration={0.8}
  className="text-lg text-zinc-400"
/>`} filename="soft.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Text content is always present in the DOM and readable by screen readers regardless of animation state.", "The blur effect is purely visual — it does not hide or remove content from the accessibility tree.", "Set once={false} carefully, as repeated animations may be distracting for users with cognitive sensitivities.", "Each word span uses whitespace-pre to preserve natural text spacing for assistive technologies."].map((note, i) => (
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
