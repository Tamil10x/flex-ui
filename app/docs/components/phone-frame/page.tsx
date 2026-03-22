import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { PhoneFramePlayground } from "./playground";
import { PhoneFrameExamples } from "./examples";

export const metadata: Metadata = {
  title: "Phone Frame — FlexUI",
  description:
    "A phone/mobile device mockup frame with dynamic island, status bar, and home indicator.",
};

const phoneFrameSource = `"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  showStatusBar?: boolean;
}

// ... PhoneFrame component
// Full source: npx shadcn@latest add @flexui/phone-frame`;

export default function PhoneFrameDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Display
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Phone Frame
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A phone/mobile device mockup frame with dynamic island, status bar
          (time, signal, battery), and home indicator. Perfect for showcasing
          mobile app designs and responsive layouts.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <PhoneFramePlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <PhoneFrameExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/phone-frame"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/phone-frame.tsx
                </code>
                . No extra dependencies required.
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Copy component source
                </p>
                <CodeBlock
                  code={phoneFrameSource}
                  filename="components/flexui/phone-frame.tsx"
                  language="tsx"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Requires{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    cn()
                  </code>{" "}
                  utility at{" "}
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
        <DocSubSection id="phone-frame-props" title="PhoneFrame Props">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "—",
                description: "Content to render inside the phone screen.",
                required: true,
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional classes for the phone container.",
              },
              {
                name: "showStatusBar",
                type: "boolean",
                default: "true",
                description: "Show the status bar with time, signal, and battery.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Dynamic Island", desc: "Realistic iOS-style dynamic island notch at the top of the frame." },
            { icon: "o", label: "Status Bar", desc: "Toggleable status bar with time, signal bars, WiFi, and battery indicators." },
            { icon: "#", label: "9:19.5 Aspect Ratio", desc: "Accurate modern smartphone proportions with rounded corners and border styling." },
            { icon: "+", label: "Content Slot", desc: "Render any React content inside the phone screen with full overflow control." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Customization Patterns */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="custom-width" title="Custom Width">
          <CodeBlock code={`<PhoneFrame className="w-[320px]">
  <img src="/mockup.png" alt="App screenshot" className="h-full w-full object-cover" />
</PhoneFrame>`} filename="width.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="no-status-bar" title="Without Status Bar">
          <CodeBlock code={`<PhoneFrame showStatusBar={false}>
  <div className="flex h-full items-center justify-center bg-gradient-to-b from-indigo-600 to-purple-700">
    <p className="text-white text-lg font-bold">Splash Screen</p>
  </div>
</PhoneFrame>`} filename="no-status.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Dynamic island and status bar are purely decorative.",
              "Content area renders children with full accessibility support.",
              "Home indicator is decorative and does not interfere with content.",
              "Frame uses proper aspect ratio for realistic phone dimensions.",
            ].map((note, i) => (
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
