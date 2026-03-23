import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { TagInputExamples } from "./examples";
import { Sparkles, Keyboard, ShieldCheck, MousePointerClick } from "lucide-react";

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

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <TagInputExamples />
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Sparkles className="h-4 w-4" />, label: "Animated Tag Chips", desc: "Tags enter and exit with spring-based scale animations via Framer Motion AnimatePresence." },
            { icon: <Keyboard className="h-4 w-4" />, label: "Keyboard Support", desc: "Press Enter to add a tag and Backspace to remove the last one — no mouse required." },
            { icon: <ShieldCheck className="h-4 w-4" />, label: "Duplicate Prevention", desc: "Automatically prevents adding duplicate tags, keeping the tag list clean." },
            { icon: <MousePointerClick className="h-4 w-4" />, label: "Focus Management", desc: "Clicking anywhere on the container focuses the input, and tags reflow smoothly with layout animations." },
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
        <DocSubSection id="custom-placeholder" title="Custom Placeholder">
          <CodeBlock code={`<TagInput
  tags={tags}
  onAdd={handleAdd}
  onRemove={handleRemove}
  placeholder="Type a skill and press Enter..."
/>`} filename="variant.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="styled-container" title="Styled Container">
          <CodeBlock code={`<TagInput
  tags={tags}
  onAdd={handleAdd}
  onRemove={handleRemove}
  className="border-cyan-500/20 bg-cyan-950/20"
/>`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The text input has aria-label=\"Add tag\" for screen reader identification.", "Each tag removal button has an aria-label indicating which tag will be removed.", "The input and tags are wrapped in a focus-within-styled container that provides a visible focus indicator.", "Keyboard-only users can add tags with Enter and remove the last tag with Backspace."].map((note, i) => (
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
