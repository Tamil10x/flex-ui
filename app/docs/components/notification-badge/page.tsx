import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { NotificationBadgeExamples } from "./examples";
import { Zap, Hash, EyeOff, Accessibility } from "lucide-react";

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

      <DocSection id="examples" title="Examples">
        <NotificationBadgeExamples />
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Zap className="h-4 w-4 text-blue-400" />, label: "Spring Scale Entrance", desc: "Badge pops in with spring animation (stiffness 500, damping 25) and scales out on removal." },
            { icon: <Hash className="h-4 w-4 text-blue-400" />, label: "Max Count Overflow", desc: "Displays \"99+\" (or custom max) when the count exceeds maxCount to prevent wide badges." },
            { icon: <EyeOff className="h-4 w-4 text-blue-400" />, label: "Auto-Hide on Zero", desc: "Badge automatically animates out and unmounts when count reaches zero." },
            { icon: <Accessibility className="h-4 w-4 text-blue-400" />, label: "Reduced Motion", desc: "Detects prefers-reduced-motion and disables spring/scale animations accordingly." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="colored-badge" title="Custom Color Badge">
          <CodeBlock code={`<NotificationBadge count={7} color="bg-purple-500" />
<NotificationBadge count={3} color="bg-emerald-500" />`} filename="colors.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="icon-badge" title="Badge on Icon">
          <CodeBlock code={`<div className="relative inline-flex">
  <BellIcon className="h-6 w-6 text-zinc-400" />
  <span className="absolute -top-2 -right-2">
    <NotificationBadge count={12} maxCount={9} />
  </span>
</div>`} filename="icon-badge.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The badge renders the count as visible text content, making it readable by screen readers.", "useReducedMotion from Framer Motion disables all spring and scale animations when the user prefers reduced motion.", "The badge auto-hides when count is 0, removing it from both the visual and accessibility tree."].map((note, i) => (
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
