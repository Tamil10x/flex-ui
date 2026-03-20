import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { AnimatedTabsPlayground } from "./playground";
import { AnimatedTabsExamples } from "./examples";

export const metadata: Metadata = {
  title: "Animated Tabs — FlexUI",
  description:
    "A tab component with a sliding animated indicator and smooth content transitions.",
};

const animatedTabsSource = `"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  variant?: "underline" | "pill" | "bordered";
}

export function AnimatedTabs({
  tabs,
  defaultTab,
  className,
  variant = "underline",
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id);

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative flex",
          variant === "underline" && "border-b border-white/[0.08] gap-1",
          variant === "pill" && "rounded-xl bg-zinc-900/80 p-1 gap-0",
          variant === "bordered" && "gap-1"
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative z-10 px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              {tab.label}

              {variant === "underline" && isActive && (
                <motion.div
                  layoutId="animated-tabs-underline"
                  className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {variant === "pill" && isActive && (
                <motion.div
                  layoutId="animated-tabs-pill"
                  className="absolute inset-0 rounded-lg bg-white/[0.1]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {variant === "bordered" && isActive && (
                <motion.div
                  layoutId="animated-tabs-bordered"
                  className="absolute inset-0 rounded-lg border border-white/[0.15] bg-white/[0.05]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="relative mt-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}`;

export default function AnimatedTabsDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Animated Tabs
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A tab component with a sliding animated indicator and smooth
          fade+slide content transitions. Three visual variants with spring
          physics on the indicator.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <AnimatedTabsPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <AnimatedTabsExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/animated-tabs"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/animated-tabs.tsx
                </code>
                .
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Install dependency
                </p>
                <CodeBlock
                  code="npm install framer-motion"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component source
                </p>
                <CodeBlock
                  code={animatedTabsSource}
                  filename="components/flexui/animated-tabs.tsx"
                  language="tsx"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Requires{" "}
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

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              icon: "~",
              label: "Sliding Indicator",
              desc: "layoutId-powered indicator that smoothly slides between tabs using spring physics.",
            },
            {
              icon: "o",
              label: "Content Transitions",
              desc: "AnimatePresence with fade and vertical slide for seamless content switching.",
            },
            {
              icon: "#",
              label: "Three Variants",
              desc: "Underline (gradient line), pill (bg highlight), and bordered (border box) styles.",
            },
            {
              icon: "+",
              label: "Dark Theme",
              desc: "zinc-950 background, zinc-400 inactive text, white active text for a modern dark UI.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="exports" title="Exports">
          <CodeBlock
            code={`import { AnimatedTabs } from "@/components/flexui/animated-tabs";`}
            filename="Named export"
          />
        </DocSubSection>

        <DocSubSection id="props" title="Props">
          <ApiTable
            rows={[
              {
                name: "tabs",
                type: "Tab[]",
                default: "\u2014",
                description:
                  "Array of tab objects, each with id, label, and content.",
                required: true,
              },
              {
                name: "defaultTab",
                type: "string",
                default: "tabs[0].id",
                description: "ID of the initially active tab.",
              },
              {
                name: "variant",
                type: '"underline" | "pill" | "bordered"',
                default: '"underline"',
                description:
                  "Visual style of the tab bar indicator.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional Tailwind classes merged via cn().",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="tab-interface" title="Tab Interface">
          <CodeBlock
            code={`interface Tab {
  id: string;       // Unique identifier
  label: string;    // Display text for the tab button
  content: React.ReactNode; // Content rendered when tab is active
}`}
            filename="Tab type"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="variant-examples" title="Variant Examples">
          <CodeBlock
            code={`{/* Underline — gradient line slides under active tab */}
<AnimatedTabs tabs={tabs} variant="underline" />

{/* Pill — background highlight slides behind active tab */}
<AnimatedTabs tabs={tabs} variant="pill" />

{/* Bordered — active tab gets a border box */}
<AnimatedTabs tabs={tabs} variant="bordered" />`}
            filename="Variants"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-default" title="Setting a Default Tab">
          <CodeBlock
            code={`{/* Start on the second tab */}
<AnimatedTabs tabs={tabs} defaultTab="features" />`}
            filename="Default tab"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Performance */}
      <DocSection id="performance" title="Performance Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "layoutId uses Framer Motion's FLIP technique for zero-layout-shift indicator animation.",
              "AnimatePresence only mounts the active tab content -- inactive panels are unmounted.",
              "Spring physics (stiffness: 400, damping: 30) provide snappy, natural motion.",
              "No external dependencies beyond framer-motion.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-green-500/10 text-[10px] font-bold text-green-400">
                  {i + 1}
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Tab buttons are native <button> elements -- fully keyboard accessible.",
              "Active state is visually distinct with both color and indicator animation.",
              "Content transitions are fast (200ms) to avoid disorientation.",
              "Consider adding aria-selected and role='tablist' / role='tab' for full WAI-ARIA compliance.",
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
