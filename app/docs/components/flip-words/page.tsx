import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { FlipWordsPlayground } from "./playground";
import { FlipWordsExamples } from "./examples";

export const metadata: Metadata = {
  title: "Flip Words — FlexUI",
  description:
    "Words that flip and rotate in and out with 3D perspective animation and spring physics.",
};

export default function FlipWordsDoc() {
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
          Flip Words
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Words that flip and rotate in and out with 3D perspective animation
          and spring physics. Perfect for hero headlines and dynamic taglines.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Words cycle automatically with a 3D flip transition.
        </p>
        <FlipWordsPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Hero headlines, fast status updates, and slow dramatic reveals.
        </p>
        <FlipWordsExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/flip-words"
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
                    components/flexui/flip-words.tsx
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
        <DocSubSection id="flip-words-props" title="FlipWords">
          <ApiTable
            rows={[
              {
                name: "words",
                type: "string[]",
                default: "\u2014",
                description: "Array of words to cycle through.",
                required: true,
              },
              {
                name: "duration",
                type: "number",
                default: "3000",
                description:
                  "Duration in milliseconds each word is displayed before flipping.",
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
        <DocSubSection id="usage-examples" title="Usage Examples">
          <CodeBlock
            code={`{/* Basic usage */}
<FlipWords words={["hello", "world"]} />

{/* Fast cycle */}
<FlipWords words={["one", "two", "three"]} duration={1500} />

{/* Styled */}
<FlipWords
  words={["amazing", "beautiful"]}
  className="text-4xl font-bold text-blue-400"
/>

{/* Inline with other text */}
<p>
  We build <FlipWords words={["fast", "reliable"]} /> software.
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
              q: "Words flash or jump on transition",
              a: "Make sure the container has enough width for the longest word. The component uses overflow-hidden to clip during the 3D rotation.",
            },
            {
              q: "Animation feels too stiff",
              a: "The component uses spring physics (stiffness: 200, damping: 25). You can fork the component to adjust these values.",
            },
            {
              q: "Layout shifts when words change",
              a: "Words of different lengths will cause inline reflow. Use a fixed-width container or ensure similar-length words for best results.",
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
            { icon: "~", label: "3D Flip Animation", desc: "Words rotate on the X-axis with perspective for a realistic card-flip transition effect." },
            { icon: "o", label: "Blur Transitions", desc: "Each word blurs in and out during the flip for a polished, cinematic feel." },
            { icon: "#", label: "Auto-Cycling", desc: "Words cycle automatically on a configurable interval with seamless looping back to the first word." },
            { icon: "+", label: "Reduced Motion Safe", desc: "Falls back to showing the first word statically when the user prefers reduced motion." },
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
        <DocSubSection id="hero-headline" title="Hero Headline Integration">
          <CodeBlock code={`<h1 className="text-5xl font-bold text-white">
  We build{" "}
  <FlipWords
    words={["faster", "smarter", "better"]}
    duration={2500}
    className="text-blue-400"
  />{" "}
  software.
</h1>`} filename="hero.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="fast-cycle" title="Fast Status Indicator">
          <CodeBlock code={`<FlipWords
  words={["Loading", "Processing", "Complete"]}
  duration={1000}
  className="text-sm text-emerald-400"
/>`} filename="status.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Screen readers will announce the currently visible word as it changes in the DOM.", "When prefers-reduced-motion is enabled, only the first word is shown statically with no animation.", "The component renders inline <span> elements, preserving natural text flow for assistive technologies."].map((note, i) => (
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
