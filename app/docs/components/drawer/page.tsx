import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { DrawerPlayground } from "./playground";
import { DrawerExamples } from "./examples";

export const metadata: Metadata = {
  title: "Drawer — FlexUI",
  description:
    "An animated bottom sheet / side drawer with spring physics, backdrop blur, and body scroll lock.",
};

export default function DrawerDoc() {
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
          Drawer
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          An animated bottom sheet / side drawer with spring physics, backdrop
          blur overlay, ESC-to-close, click-outside dismiss, and automatic body
          scroll lock. Opens from bottom, right, or left.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Click the button to open the drawer. Press ESC or click the backdrop
          to close.
        </p>
        <DrawerPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Three side variants: bottom sheet, right panel, and left navigation
          drawer.
        </p>
        <DrawerExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/drawer"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
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
                  code="npm install framer-motion"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component file
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/drawer.tsx
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
        <DocSubSection id="drawer-props" title="Drawer">
          <ApiTable
            rows={[
              {
                name: "open",
                type: "boolean",
                default: "\u2014",
                description: "Whether the drawer is open.",
                required: true,
              },
              {
                name: "onClose",
                type: "() => void",
                default: "\u2014",
                description: "Called when the drawer should close (ESC, backdrop click).",
                required: true,
              },
              {
                name: "children",
                type: "ReactNode",
                default: "\u2014",
                description: "Content rendered inside the drawer panel.",
                required: true,
              },
              {
                name: "side",
                type: '"bottom" | "right" | "left"',
                default: '"bottom"',
                description: "Which edge the drawer slides in from.",
              },
              {
                name: "showOverlay",
                type: "boolean",
                default: "true",
                description: "Show a backdrop blur overlay behind the drawer.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the drawer panel.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="side-variants" title="Side Variants">
          <CodeBlock
            code={`{/* Bottom sheet (default) */}
<Drawer open={open} onClose={close} side="bottom">
  <p>Bottom drawer content</p>
</Drawer>

{/* Right panel */}
<Drawer open={open} onClose={close} side="right">
  <p>Right drawer content</p>
</Drawer>

{/* Left navigation */}
<Drawer open={open} onClose={close} side="left">
  <p>Left drawer content</p>
</Drawer>`}
            filename="Side variants"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="no-overlay" title="Without Overlay">
          <CodeBlock
            code={`<Drawer open={open} onClose={close} showOverlay={false}>
  <p>Drawer without backdrop overlay</p>
</Drawer>`}
            filename="No overlay"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Troubleshooting */}
      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-3">
          {[
            {
              q: "Drawer flickers on server render",
              a: "The component uses a typeof document guard and returns null during SSR. Ensure it is only used in client components.",
            },
            {
              q: "Body still scrollable when drawer is open",
              a: "The component sets overflow:hidden on document.body. If you have a custom scroll container, you may need to lock that element instead.",
            },
            {
              q: "Drawer does not close on backdrop click",
              a: "Make sure showOverlay is true (the default). The backdrop click handler calls onClose.",
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
    </div>
  );
}
