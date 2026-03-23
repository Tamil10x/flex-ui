import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { TypewriterDeleteExamples } from "./examples";
import { RefreshCw, TextCursorInput, Gauge, Repeat } from "lucide-react";

export const metadata: Metadata = {
  title: "Typewriter Delete — FlexUI",
  description:
    "A typewriter effect that types and deletes text in a continuous loop.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
          Component
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Typewriter Delete
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A typewriter effect that types out text character by character, pauses,
          then deletes it and starts again. Perfect for hero headlines and
          dynamic text displays.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <TypewriterDeleteExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add typewriter-delete`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { TypewriterDelete } from "@/components/flexui/typewriter-delete";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<TypewriterDelete text="Hello, World!" />

{/* Faster typing speed */}
<TypewriterDelete text="Quick typing" speed={40} />

{/* No loop — types and deletes once */}
<TypewriterDelete text="One-time effect" loop={false} />`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "text",
              type: "string",
              default: "\u2014",
              description: "The text to type and delete.",
              required: true,
            },
            {
              name: "speed",
              type: "number",
              default: "80",
              description:
                "Typing speed in milliseconds per character. Deletion runs at half this speed.",
            },
            {
              name: "loop",
              type: "boolean",
              default: "true",
              description:
                "Whether the animation loops continuously after deleting.",
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the text span.",
            },
          ]}
        />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <RefreshCw className="h-4 w-4" />, label: "Type & Delete Cycle", desc: "Text types out character by character, pauses, then deletes in reverse — looping continuously." },
            { icon: <TextCursorInput className="h-4 w-4" />, label: "Blinking Cursor", desc: "A pulsing cyan cursor bar provides authentic typewriter visual feedback." },
            { icon: <Gauge className="h-4 w-4" />, label: "Configurable Speed", desc: "Control typing speed per character, with deletion running at half speed for a natural feel." },
            { icon: <Repeat className="h-4 w-4" />, label: "Optional Loop", desc: "Set loop to false for a single type-and-delete cycle, or keep it true for continuous animation." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="fast-typing" title="Fast Typing">
          <CodeBlock code={`<TypewriterDelete text="Lightning fast" speed={30} />`} filename="variant.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="one-shot" title="Single Cycle">
          <CodeBlock code={`<TypewriterDelete text="This types and deletes once" loop={false} speed={60} />`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The text content updates in the DOM as it types, so screen readers can access the current displayed text.", "The blinking cursor is a decorative CSS element that does not interfere with assistive technology.", "Uses a monospace font by default to prevent layout shifts as characters appear and disappear."].map((note, i) => (
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
