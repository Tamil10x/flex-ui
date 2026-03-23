import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { TypewriterTextPlayground } from "./playground";
import { TypewriterTextExamples } from "./examples";

export const metadata: Metadata = {
  title: "Typewriter Text — FlexUI",
  description:
    "A typewriter effect that types text character by character with a blinking cursor, cycling through an array of words.",
};

export default function TypewriterTextDoc() {
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
          Typewriter Text
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A typewriter effect that types text character by character with a
          blinking cursor. Cycles through an array of words with configurable
          typing and deleting speeds.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Watch the typewriter cycle through phrases with a blinking cursor.
        </p>
        <TypewriterTextPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Rotating phrases, custom speeds, inline usage, and single-shot mode.
        </p>
        <TypewriterTextExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/typewriter-text"
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
                    components/flexui/typewriter-text.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Add the cursor blink keyframe to your global CSS
                </p>
                <CodeBlock
                  code={`@keyframes typewriter-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
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
        <DocSubSection id="typewriter-text-props" title="TypewriterText">
          <ApiTable
            rows={[
              {
                name: "words",
                type: "string[]",
                default: "\u2014",
                description: "Array of strings to cycle through.",
                required: true,
              },
              {
                name: "typingSpeed",
                type: "number",
                default: "80",
                description: "Typing speed in milliseconds per character.",
              },
              {
                name: "deletingSpeed",
                type: "number",
                default: "50",
                description: "Deleting speed in milliseconds per character.",
              },
              {
                name: "pauseDuration",
                type: "number",
                default: "1500",
                description: "Pause duration between words in milliseconds.",
              },
              {
                name: "cursor",
                type: "string",
                default: '"|"',
                description: "Cursor character displayed at the end.",
              },
              {
                name: "loop",
                type: "boolean",
                default: "true",
                description: "Whether to loop through the words array continuously.",
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Word Cycling", desc: "Cycles through an array of strings, typing and deleting each word with configurable speeds." },
            { icon: "o", label: "Blinking Cursor", desc: "A CSS-animated blinking cursor provides authentic typewriter visual feedback." },
            { icon: "#", label: "Independent Speed Controls", desc: "Separate props for typing speed, deleting speed, and pause duration between words." },
            { icon: "+", label: "Reduced Motion Support", desc: "Renders the first word as static text when prefers-reduced-motion is enabled." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Renders a static text fallback when prefers-reduced-motion is enabled, ensuring content is always visible.", "The current word text is present in the DOM and accessible to screen readers as it updates.", "The blinking cursor is a decorative CSS element and does not add semantic noise to the accessibility tree."].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="usage-patterns" title="Usage Patterns">
          <CodeBlock
            code={`{/* Rotating hero phrases */}
<TypewriterText
  words={["Build fast.", "Ship faster.", "Scale effortlessly."]}
  typingSpeed={80}
  className="text-4xl font-bold text-white"
/>

{/* Inline with static text */}
<span>We make it </span>
<TypewriterText
  words={["simple", "beautiful", "powerful"]}
  className="font-semibold text-white"
/>

{/* Slow dramatic typing */}
<TypewriterText
  words={["Welcome."]}
  typingSpeed={150}
  loop={false}
  className="text-5xl font-black text-white"
/>

{/* Fast cycle */}
<TypewriterText
  words={["React", "Next.js", "Tailwind"]}
  typingSpeed={40}
  deletingSpeed={25}
  pauseDuration={800}
/>`}
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
              q: "Cursor is not blinking",
              a: "Make sure the typewriter-blink keyframe is defined in your globals.css file.",
            },
            {
              q: "Text disappears after the last word",
              a: "Set loop={true} (the default) to continuously cycle. Set loop={false} to stop after the last word.",
            },
            {
              q: "Animation feels too fast or too slow",
              a: "Adjust typingSpeed (ms per character), deletingSpeed, and pauseDuration to fine-tune the rhythm.",
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
