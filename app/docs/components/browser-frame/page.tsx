import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { BrowserFramePlayground } from "./playground";
import { BrowserFrameExamples } from "./examples";

export const metadata: Metadata = {
  title: "Browser Frame — FlexUI",
  description:
    "A browser window mockup frame for showcasing content with glassmorphic dark styling.",
};

const browserFrameSource = `"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  children: React.ReactNode;
  className?: string;
  url?: string;
  showNav?: boolean;
}

// ... BrowserFrame component
// Full source: npx shadcn@latest add @flexui/browser-frame`;

export default function BrowserFrameDoc() {
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
          Browser Frame
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A browser window mockup frame for showcasing websites, dashboards, and
          app screenshots. Includes traffic lights, optional navigation buttons,
          and a URL bar with glassmorphic dark styling.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <BrowserFramePlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <BrowserFrameExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/browser-frame"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/browser-frame.tsx
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
                  code={browserFrameSource}
                  filename="components/flexui/browser-frame.tsx"
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
        <DocSubSection id="browser-frame-props" title="BrowserFrame Props">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "—",
                description: "Content to render inside the browser frame.",
                required: true,
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional classes for the outer container.",
              },
              {
                name: "url",
                type: "string",
                default: '"https://flexui.dev"',
                description: "URL displayed in the address bar.",
              },
              {
                name: "showNav",
                type: "boolean",
                default: "true",
                description: "Show back, forward, and refresh navigation buttons.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Realistic Chrome", desc: "Traffic lights, navigation buttons, and URL bar faithfully reproduce a browser window." },
            { icon: "o", label: "Glassmorphic Design", desc: "Backdrop blur and subtle borders create an elegant dark glass appearance." },
            { icon: "#", label: "Optional Navigation", desc: "Toggle back, forward, and refresh buttons with the showNav prop." },
            { icon: "+", label: "Custom URL", desc: "Display any URL in the address bar to match the content being showcased." },
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
        <DocSubSection id="minimal-frame" title="Minimal Frame">
          <CodeBlock code={`<BrowserFrame url="https://myapp.dev" showNav={false}>
  <img src="/screenshot.png" alt="App screenshot" />
</BrowserFrame>`} filename="minimal.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="dashboard-frame" title="Dashboard Showcase">
          <CodeBlock code={`<BrowserFrame
  url="https://dashboard.example.com/analytics"
  className="shadow-2xl shadow-purple-500/5"
>
  <div className="h-64 bg-zinc-900 p-6">Dashboard content</div>
</BrowserFrame>`} filename="dashboard.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Navigation buttons have aria-labels for screen reader accessibility.",
              "URL bar is read-only and does not accept input.",
              "Content area is fully accessible and renders children as-is.",
              "Traffic light dots are decorative only.",
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
