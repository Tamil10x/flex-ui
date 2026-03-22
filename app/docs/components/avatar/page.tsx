import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

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
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description:
                "Avatar size. sm = 32px, md = 40px, lg = 56px.",
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
    </div>
  );
}
