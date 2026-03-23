import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { PopoverExamples } from "./examples";
import { ExternalLink, Compass, Wand2, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Popover — FlexUI",
  description:
    "A floating content panel that appears next to a trigger element with spring animation and portal rendering.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
          Component
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Popover
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A floating content panel that appears next to a trigger element.
          Renders via a portal for correct stacking, supports four placement
          sides, and dismisses on outside click or Escape key. Animated with
          Framer Motion spring physics.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <PopoverExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add popover`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { Popover } from "@/components/flexui/popover";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<Popover
  trigger={<button>Open Popover</button>}
  side="bottom"
>
  <div className="w-48">
    <p className="font-medium text-white">Title</p>
    <p className="mt-1 text-xs text-zinc-400">
      Popover body content here.
    </p>
  </div>
</Popover>`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "trigger",
              type: "ReactNode",
              default: "\u2014",
              description:
                "The element that toggles the popover on click.",
              required: true,
            },
            {
              name: "children",
              type: "ReactNode",
              default: "\u2014",
              description: "Content rendered inside the floating panel.",
              required: true,
            },
            {
              name: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"bottom"',
              description:
                "Which side of the trigger the popover appears on.",
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description:
                "Additional CSS classes for the popover panel.",
            },
          ]}
        />
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <ExternalLink className="h-4 w-4 text-blue-400" />, label: "Portal Rendering", desc: "Content renders via createPortal to document.body for correct z-index stacking." },
            { icon: <Compass className="h-4 w-4 text-blue-400" />, label: "Four Placement Sides", desc: "Position the popover on top, bottom, left, or right of the trigger element." },
            { icon: <Wand2 className="h-4 w-4 text-blue-400" />, label: "Spring Animation", desc: "Framer Motion spring physics for smooth scale and opacity transitions." },
            { icon: <X className="h-4 w-4 text-blue-400" />, label: "Auto Dismiss", desc: "Closes on outside click or Escape key press with proper event cleanup." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Customization Patterns */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="custom-side" title="Side Placement">
          <CodeBlock code={`<Popover trigger={<button>Top</button>} side="top">
  <p>Appears above the trigger</p>
</Popover>

<Popover trigger={<button>Left</button>} side="left">
  <p>Appears to the left</p>
</Popover>`} filename="placement.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="styled-popover" title="Custom Styled Panel">
          <CodeBlock code={`<Popover
  trigger={<button>Settings</button>}
  className="w-64 rounded-xl border-purple-500/20 bg-zinc-900 p-6"
>
  <h3 className="font-bold text-white">Settings</h3>
  <p className="mt-2 text-xs text-zinc-400">Configure your preferences.</p>
</Popover>`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Trigger element uses aria-haspopup=\"dialog\" and aria-expanded to indicate popover state.", "Popover panel uses role=\"dialog\" for screen reader identification.", "Escape key dismisses the popover and returns focus context.", "Trigger is keyboard-focusable with tabIndex={0} and role=\"button\"."].map((note, i) => (
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
