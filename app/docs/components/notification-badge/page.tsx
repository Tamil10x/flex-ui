import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "NotificationBadge — FlexUI",
  description:
    "An animated count badge for indicating unread notifications, with spring entrance and configurable max count.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
          Component
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          NotificationBadge
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          An animated count badge for indicating unread notifications. Scales in
          with a spring animation, supports a configurable max count (e.g.
          &quot;99+&quot;), and automatically hides when the count is zero.
          Respects reduced motion preferences.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock
          code={`npx flexui add notification-badge`}
          filename="Terminal"
        />
        <div className="mt-4">
          <CodeBlock
            code={`import { NotificationBadge } from "@/components/flexui/notification-badge";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<div className="relative inline-flex">
  <BellIcon />
  <span className="absolute -top-2 -right-2">
    <NotificationBadge count={5} />
  </span>
</div>

{/* With max count */}
<NotificationBadge count={142} maxCount={99} />

{/* Custom color */}
<NotificationBadge count={3} color="bg-purple-500" />`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "count",
              type: "number",
              default: "\u2014",
              description:
                "The notification count. Badge hides when count is 0.",
              required: true,
            },
            {
              name: "maxCount",
              type: "number",
              default: "99",
              description:
                'Maximum displayed number. Counts above this show as "99+" (or custom max).',
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the badge element.",
            },
            {
              name: "color",
              type: "string",
              default: '"bg-red-500"',
              description:
                "Tailwind background color class for the badge.",
            },
          ]}
        />
      </DocSection>
    </div>
  );
}
