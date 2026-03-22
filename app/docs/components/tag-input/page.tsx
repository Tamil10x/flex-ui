import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Tag Input — FlexUI",
  description:
    "A text input that converts entries into removable tag chips with animations.",
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
          Tag Input
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A text input that converts entries into animated, removable tag chips.
          Press Enter to add a tag and Backspace to remove the last one.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add tag-input`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { TagInput } from "@/components/flexui/tag-input";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`const [tags, setTags] = useState<string[]>([]);

<TagInput
  tags={tags}
  onAdd={(tag) => setTags((prev) => [...prev, tag])}
  onRemove={(tag) => setTags((prev) => prev.filter((t) => t !== tag))}
  placeholder="Add a tag..."
/>`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "tags",
              type: "string[]",
              default: "\u2014",
              description: "The current array of tag strings to display.",
              required: true,
            },
            {
              name: "onAdd",
              type: "(tag: string) => void",
              default: "\u2014",
              description: "Callback fired when a new tag is added via Enter.",
              required: true,
            },
            {
              name: "onRemove",
              type: "(tag: string) => void",
              default: "\u2014",
              description:
                "Callback fired when a tag is removed by clicking or Backspace.",
              required: true,
            },
            {
              name: "placeholder",
              type: "string",
              default: '"Add tag\u2026"',
              description:
                "Placeholder text shown when no tags are present.",
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the wrapper element.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
