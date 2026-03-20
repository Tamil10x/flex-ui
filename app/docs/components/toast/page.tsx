import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ToastPlayground } from "./playground";
import { ToastExamples } from "./examples";

export const metadata: Metadata = {
  title: "Toast — FlexUI",
  description:
    "Animated toast notification system with context-based API, auto-dismiss, and four type variants.",
};

export default function ToastDoc() {
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
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Lucide React
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Toast
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A context-based toast notification system with spring-physics entry
          animations, auto-dismiss, four color-coded types (success, error,
          info, warning), and stacked positioning.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Click the buttons to fire toast notifications. They auto-dismiss
          after 4 seconds or can be closed manually.
        </p>
        <ToastPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          All four toast types with their respective color-coded icons.
        </p>
        <ToastExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/toast"
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
                    components/flexui/toast.tsx
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
        <DocSubSection id="toast-provider" title="ToastProvider">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "ReactNode",
                default: "\u2014",
                description: "Your app content. The provider renders the toast container alongside it.",
                required: true,
              },
              {
                name: "position",
                type: '"top-right" | "top-center" | "bottom-right" | "bottom-center"',
                default: '"top-right"',
                description: "Where toasts appear on screen.",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="use-toast" title="useToast()">
          <ApiTable
            rows={[
              {
                name: "toast",
                type: '(message: string, type?: "success" | "error" | "info" | "warning", duration?: number) => void',
                default: "\u2014",
                description:
                  "Trigger a toast. Type defaults to \"info\", duration defaults to 4000ms. Set duration to 0 for persistent toasts.",
                required: true,
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="positions" title="Position Variants">
          <CodeBlock
            code={`{/* Top right (default) */}
<ToastProvider position="top-right">
  <App />
</ToastProvider>

{/* Bottom center */}
<ToastProvider position="bottom-center">
  <App />
</ToastProvider>`}
            filename="Positions"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-duration" title="Custom Duration">
          <CodeBlock
            code={`const { toast } = useToast();

// Quick flash (1.5s)
toast("Copied!", "success", 1500);

// Persistent (manual dismiss only)
toast("Action required", "warning", 0);`}
            filename="Duration"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Troubleshooting */}
      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-3">
          {[
            {
              q: "useToast throws \"must be used within ToastProvider\"",
              a: "Wrap your app or the relevant subtree with <ToastProvider>. The hook reads from React context.",
            },
            {
              q: "Toasts overlap with other fixed elements",
              a: "The toast container uses z-[100]. Adjust your other fixed elements or change the z-index in the ToastProvider source.",
            },
            {
              q: "Too many toasts stacking up",
              a: "By default, a maximum of 5 toasts are visible. The oldest toast is automatically dismissed when a new one exceeds the limit.",
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
