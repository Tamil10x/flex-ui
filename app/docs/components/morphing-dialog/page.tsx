import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { MorphingDialogPlayground } from "./playground";
import { MorphingDialogExamples } from "./examples";

export const metadata: Metadata = {
  title: "Morphing Dialog — FlexUI",
  description:
    "A dialog that morphs from its trigger element using shared layout animation with spring physics.",
};

export default function MorphingDialogDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Morphing Dialog
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A dialog that smoothly morphs from its trigger element using shared
          layout animation. The trigger and dialog share a layoutId so
          Framer Motion animates the shape transition with spring physics.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Click the trigger to morph it into a centered dialog.
        </p>
        <MorphingDialogPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Three patterns: profile card, image preview, and settings menu.
          Click each trigger to morph into a dialog.
        </p>
        <MorphingDialogExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/morphing-dialog"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  lucide-react
                </code>
                .
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Install dependencies
                </p>
                <CodeBlock
                  code="npm install framer-motion lucide-react"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component file
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/morphing-dialog.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Requires{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    cn()
                  </code>{" "}
                  at{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    @/lib/utils
                  </code>
                </p>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="morphing-dialog" title="MorphingDialog">
          <ApiTable
            rows={[
              {
                name: "trigger",
                type: "ReactNode",
                default: "\u2014",
                description:
                  "The element that serves as the dialog trigger. It morphs into the dialog on click.",
                required: true,
              },
              {
                name: "children",
                type: "ReactNode",
                default: "\u2014",
                description: "Content displayed inside the morphed dialog.",
                required: true,
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional classes for the dialog panel.",
              },
              {
                name: "triggerClassName",
                type: "string",
                default: "\u2014",
                description: "Additional classes for the trigger wrapper.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="custom-trigger" title="Custom Trigger">
          <CodeBlock
            code={`<MorphingDialog
  trigger={
    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
      <p className="font-bold text-blue-400">Open Details</p>
    </div>
  }
  triggerClassName="inline-block"
  className="max-w-xl"
>
  <h2>Dialog Content</h2>
  <p>The trigger morphs into this dialog...</p>
</MorphingDialog>`}
            filename="Custom trigger"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Troubleshooting */}
      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-3">
          {[
            {
              q: "Dialog doesn't animate smoothly",
              a: "Ensure framer-motion v11+ is installed. The shared layout animation requires the layoutId prop to work correctly across both trigger and dialog elements.",
            },
            {
              q: "Dialog doesn't appear",
              a: "The dialog uses a portal to document.body with an SSR guard. Make sure the component is rendered in a client component (\"use client\").",
            },
            {
              q: "Clicking inside the dialog closes it",
              a: "Click events inside the dialog content should not propagate to the backdrop. If you have custom handlers, use e.stopPropagation() on inner interactive elements.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-white/[0.06] bg-zinc-950/50 transition-all duration-200 hover:border-white/[0.1]"
            >
              <div className="p-5 text-sm font-semibold text-white">
                {item.q}
              </div>
              <div className="border-t border-white/[0.04] px-5 py-4 text-sm text-zinc-500">
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Shared Layout Animation", desc: "Trigger morphs into dialog using a shared layoutId for seamless shape transition." },
            { icon: "o", label: "Blurred Backdrop", desc: "Animated backdrop with blur(12px) and dark overlay for focus isolation." },
            { icon: "#", label: "Portal Rendering", desc: "Dialog renders via createPortal to document.body, escaping parent overflow constraints." },
            { icon: "+", label: "ESC & Click Dismiss", desc: "Close via Escape key, backdrop click, or the animated close button." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="what-you-get-customization" title="Customization Patterns">
        <DocSubSection id="wide-dialog" title="Wide Dialog">
          <CodeBlock code={`<MorphingDialog
  trigger={<div className="p-4 bg-zinc-900 rounded-xl">Click me</div>}
  className="max-w-2xl"
>
  <h2 className="text-xl font-bold text-white">Wide Dialog</h2>
  <p className="mt-2 text-zinc-400">This dialog expands to max-w-2xl.</p>
</MorphingDialog>`} filename="wide.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="styled-trigger" title="Styled Trigger">
          <CodeBlock code={`<MorphingDialog
  trigger={
    <div className="p-6 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-2xl border border-white/[0.08]">
      <h3 className="text-white font-bold">Profile Card</h3>
    </div>
  }
  triggerClassName="inline-block"
>
  <h2 className="text-white font-bold">Full Profile</h2>
  <p className="text-zinc-400 mt-2">Expanded profile details...</p>
</MorphingDialog>`} filename="styled-trigger.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Trigger has role=\"button\", tabIndex={0}, and responds to Enter/Space keys for keyboard activation.", "Dialog uses role=\"dialog\" and aria-modal=\"true\" for proper screen reader announcement.", "Close button includes aria-label=\"Close dialog\" for screen reader context.", "Body scroll is locked when the dialog is open and restored on close to prevent background scrolling."].map((note, i) => (
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
