import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "AvatarGroup — FlexUI",
  description:
    "Display a stack of avatars with an overflow indicator for teams and collaborators.",
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
          AvatarGroup
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Display a stacked group of avatars with an overflow count indicator.
          Perfect for showing team members, collaborators, or participants.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock
          code={`npx flexui add avatar-group`}
          filename="Terminal"
        />
        <div className="mt-4">
          <CodeBlock
            code={`import { AvatarGroup } from "@/components/flexui/avatar-group";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`const team = [
  { name: "Sarah Chen" },
  { name: "Marcus Johnson", src: "/avatars/marcus.jpg" },
  { name: "Aisha Patel" },
  { name: "David Kim" },
  { name: "Elena Rodriguez" },
];

<AvatarGroup avatars={team} max={3} size="md" />`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "avatars",
              type: "AvatarGroupItem[]",
              default: "—",
              description:
                "Array of avatar objects with name (string) and optional src (string).",
              required: true,
            },
            {
              name: "max",
              type: "number",
              default: "5",
              description:
                "Maximum number of avatars to display before showing overflow count.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Size of each avatar in the group.",
            },
            {
              name: "className",
              type: "string",
              default: "—",
              description: "Additional CSS classes for the wrapper element.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
