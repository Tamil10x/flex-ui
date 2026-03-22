import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

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
    </div>
  );
}
