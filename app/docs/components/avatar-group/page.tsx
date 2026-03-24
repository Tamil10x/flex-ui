import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { AvatarGroupExamples } from "./examples";
import { Users, Maximize2, Layers, Link } from "lucide-react";

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

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <AvatarGroupExamples />
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
                "Array of { name, src?, status? } objects for each avatar.",
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
              type: '"xs" | "sm" | "md" | "lg" | "xl"',
              default: '"md"',
              description: "Size of each avatar in the group.",
            },
            {
              name: "spacing",
              type: '"tight" | "normal" | "loose"',
              default: '"normal"',
              description: "Control the overlap density between stacked avatars.",
            },
            {
              name: "expandable",
              type: "boolean",
              default: "false",
              description: "When true, hovering the +N badge reveals all hidden avatars with spring animation.",
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Users className="h-4 w-4" />, label: "Overflow Indicator", desc: "Automatically shows a +N badge when avatars exceed the max limit." },
            { icon: <Maximize2 className="h-4 w-4" />, label: "Three Sizes", desc: "Choose between sm (32px), md (40px), and lg (56px) to fit any layout context." },
            { icon: <Layers className="h-4 w-4" />, label: "Negative Spacing", desc: "Avatars stack with -space-x-2 overlap and ring borders for a clean, professional look." },
            { icon: <Link className="h-4 w-4" />, label: "Avatar Integration", desc: "Built on top of the Avatar component, inheriting image support and initials fallback." },
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
        <DocSubSection id="small-group" title="Small Compact Group">
          <CodeBlock code={`<AvatarGroup
  avatars={team}
  max={3}
  size="sm"
  className="gap-0"
/>`} filename="compact.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="large-group" title="Large Showcase Group">
          <CodeBlock code={`<AvatarGroup
  avatars={team}
  max={8}
  size="lg"
  className="-space-x-3"
/>`} filename="large.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Each avatar image has an alt attribute derived from the name prop for screen reader identification.", "The overflow indicator displays a count that is visible and readable by assistive technologies.", "The group uses a flex container, so keyboard focus moves naturally through interactive child elements."].map((note, i) => (
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
