import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { AvatarExamples } from "./examples";
import { Type, Palette, MousePointerClick, Maximize2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Avatar — FlexUI",
  description:
    "A circular avatar component with image support and auto-generated initials with unique gradient backgrounds.",
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
          Avatar
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A circular avatar with image support and auto-generated initials. When
          no image is provided, a unique gradient background is generated from
          the name.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <AvatarExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add avatar`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { Avatar } from "@/components/flexui/avatar";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`{/* With initials fallback */}
<Avatar name="Sarah Chen" size="md" />

{/* With image */}
<Avatar name="Sarah Chen" src="/avatars/sarah.jpg" size="lg" />

{/* Small size */}
<Avatar name="Sarah Chen" size="sm" />`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "name",
              type: "string",
              default: "—",
              description:
                "The name used for alt text and to generate initials and gradient color.",
              required: true,
            },
            {
              name: "src",
              type: "string",
              default: "—",
              description:
                "Image URL. When provided, displays the image instead of initials.",
            },
            {
              name: "size",
              type: '"xs" | "sm" | "md" | "lg" | "xl"',
              default: '"md"',
              description:
                "Avatar size. xs=28px, sm=36px, md=44px, lg=56px, xl=80px.",
            },
            {
              name: "status",
              type: '"online" | "offline" | "away" | "busy"',
              default: "—",
              description: "Status indicator dot at bottom-right. Online and busy have animated ping.",
            },
            {
              name: "ring",
              type: "boolean",
              default: "false",
              description: "Show a colored ring around the avatar.",
            },
            {
              name: "ringColor",
              type: "string",
              default: "rgba(167,139,250,0.5)",
              description: "CSS color for the ring when ring is true.",
            },
            {
              name: "className",
              type: "string",
              default: "—",
              description: "Additional CSS classes for the avatar container.",
            },
          ]}
        />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Type className="h-4 w-4" />, label: "Auto Initials", desc: "Extracts up to two initials from the name when no image is provided." },
            { icon: <Palette className="h-4 w-4" />, label: "Unique Gradients", desc: "Generates a deterministic gradient background from the name hash — same name always produces the same color." },
            { icon: <MousePointerClick className="h-4 w-4" />, label: "Micro Interactions", desc: "Subtle scale animations on hover and tap powered by Framer Motion." },
            { icon: <Maximize2 className="h-4 w-4" />, label: "Three Sizes", desc: "Small (32px), medium (40px), and large (56px) presets for any layout need." },
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
        <DocSubSection id="status-avatar" title="Avatar with Status Ring">
          <CodeBlock code={`<div className="relative">
  <Avatar name="Sarah Chen" size="lg" />
  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
</div>`} filename="status.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="custom-size" title="Custom Sized Avatar">
          <CodeBlock code={`<Avatar
  name="Marcus Johnson"
  src="/avatars/marcus.jpg"
  className="h-20 w-20 text-xl"
/>`} filename="custom-size.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Images include an alt attribute set to the name prop for screen reader identification.", "When no image is provided, initials are rendered as visible text that screen readers can announce.", "The component uses a div with inline-flex, so it does not interfere with natural document flow.", "Hover and tap scale animations are purely visual and do not affect accessibility."].map((note, i) => (
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
