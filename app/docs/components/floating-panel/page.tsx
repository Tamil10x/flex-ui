import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { FloatingPanelPlayground } from "./playground";
import { FloatingPanelExamples } from "./examples";

export const metadata: Metadata = {
  title: "Floating Panel — FlexUI",
  description:
    "A headless, composable floating panel with glassmorphic styling, spring animations, and form support.",
};

const floatingPanelSource = `"use client";

import React, {
  createContext, useContext, useEffect, useId,
  useRef, useState, useCallback,
} from "react";
import { ArrowLeft, Check } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// Spring-animated panel variants
const PANEL_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: -4 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 500, damping: 32, mass: 0.6,
      staggerChildren: 0.04 },
  },
  exit: { opacity: 0, scale: 0.97, y: -2,
    transition: { duration: 0.15 } },
};

// ... Root, Trigger, Content, Form, Label, Textarea,
//     Header, Body, Footer, CloseButton, SubmitButton, Button
// Full source: npx shadcn@latest add @flexui/floating-panel`;

export default function FloatingPanelDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-400">
            Tier 2
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Layout &amp; Forms
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Floating Panel
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A headless, composable floating panel that anchors to its trigger with
          glassmorphic styling, spring-physics animations, and built-in form
          support. Click outside or press ESC to dismiss.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <FloatingPanelPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <FloatingPanelExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/floating-panel"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  lucide-react
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/floating-panel.tsx
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
                  2. Copy component source
                </p>
                <CodeBlock
                  code={floatingPanelSource}
                  filename="components/flexui/floating-panel.tsx"
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
              label: "Spring Animations",
              desc: "Shared layout animations via layoutId — the trigger morphs into the panel with spring physics.",
            },
            {
              icon: "◈",
              label: "Glassmorphic Design",
              desc: "Dark translucent panel with backdrop-blur, gradient accent line, and soft ambient glow.",
            },
            {
              icon: "⌘",
              label: "Composable API",
              desc: "Mix and match Root, Trigger, Content, Form, Body, Footer, and Button sub-components.",
            },
            {
              icon: "✓",
              label: "Accessible",
              desc: "ARIA dialog role, focus management, ESC to close, click-outside dismissal, keyboard support.",
            },
            {
              icon: "↗",
              label: "Position-Aware",
              desc: "Panel anchors to the trigger's DOM position — no manual coordinate calculation needed.",
            },
            {
              icon: "⚡",
              label: "Zero Re-renders",
              desc: "Context-based state. Only the panel and its children re-render — the rest of your page stays still.",
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
            code={`import {
  FloatingPanelRoot,
  FloatingPanelTrigger,
  FloatingPanelContent,
  FloatingPanelForm,
  FloatingPanelLabel,
  FloatingPanelTextarea,
  FloatingPanelHeader,
  FloatingPanelBody,
  FloatingPanelFooter,
  FloatingPanelCloseButton,
  FloatingPanelSubmitButton,
  FloatingPanelButton,
} from "@/components/flexui/floating-panel";`}
            filename="Named exports"
          />
        </DocSubSection>

        <DocSubSection id="root-props" title="FloatingPanelRoot">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "—",
                description: "Must contain Trigger + Content.",
                required: true,
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Class applied to the wrapper div.",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="trigger-props" title="FloatingPanelTrigger">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "—",
                description: "Button label — text, icons, or both.",
                required: true,
              },
              {
                name: "title",
                type: "string",
                default: '""',
                description:
                  "Title shown in the panel header when opened.",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional Tailwind classes for the trigger.",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="content-props" title="FloatingPanelContent">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "—",
                description: "Panel body — Form, Body, or any composition.",
                required: true,
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description:
                  "Override panel styles (e.g. width with w-[400px]).",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="form-props" title="FloatingPanelForm">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "—",
                description: "Form content — Textarea + Footer.",
                required: true,
              },
              {
                name: "onSubmit",
                type: "(note: string) => void",
                default: "—",
                description: "Called with textarea value on form submit.",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional form classes.",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="textarea-props" title="FloatingPanelTextarea">
          <ApiTable
            rows={[
              {
                name: "id",
                type: "string",
                default: "—",
                description: "Input ID for label association.",
              },
              {
                name: "placeholder",
                type: "string",
                default: "—",
                description: "Placeholder text.",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional textarea classes.",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="button-props" title="FloatingPanelButton">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "—",
                description: "Button content — icon + text.",
                required: true,
              },
              {
                name: "onClick",
                type: "() => void",
                default: "—",
                description: "Click handler.",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional button classes.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="custom-trigger" title="Custom Trigger Styles">
          <CodeBlock
            code={`{/* Gradient trigger */}
<FloatingPanelTrigger
  title="Create"
  className="bg-gradient-to-r from-purple-500/20 to-blue-500/20
    border-purple-500/20 hover:border-purple-500/40"
>
  Create Task
</FloatingPanelTrigger>

{/* Minimal trigger */}
<FloatingPanelTrigger
  title="Options"
  className="border-0 bg-transparent hover:bg-white/[0.05]"
>
  ⋯
</FloatingPanelTrigger>`}
            filename="Trigger variants"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-panel" title="Panel Width & Styling">
          <CodeBlock
            code={`{/* Wide panel */}
<FloatingPanelContent className="w-[480px]">
  ...
</FloatingPanelContent>

{/* Custom accent */}
<FloatingPanelSubmitButton
  className="from-emerald-500 to-teal-500
    shadow-[0_0_20px_-4px_rgba(16,185,129,0.4)]"
>
  Save
</FloatingPanelSubmitButton>`}
            filename="Content customization"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="action-menu" title="Action Menu Pattern">
          <CodeBlock
            code={`{/* Use Body + Button for action lists */}
<FloatingPanelContent>
  <FloatingPanelBody className="space-y-1 p-2">
    <FloatingPanelButton onClick={handleEdit}>
      <Pencil className="h-4 w-4" /> Edit
    </FloatingPanelButton>
    <FloatingPanelButton onClick={handleDelete}>
      <Trash className="h-4 w-4 text-red-400" /> Delete
    </FloatingPanelButton>
  </FloatingPanelBody>
</FloatingPanelContent>`}
            filename="Action menu"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Performance */}
      <DocSection id="performance" title="Performance Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Context-based state — only the open panel re-renders, not the entire page tree.",
              "MotionConfig wraps all children so spring values are shared without prop drilling.",
              "layoutId shared layout animation handles trigger → panel morph without manual FLIP.",
              "Backdrop uses CSS backdrop-filter — GPU-accelerated, no JS paint overhead.",
              "Panel unmounts completely when closed via AnimatePresence — zero DOM footprint.",
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
              "Panel uses role=\"dialog\" and aria-modal=\"true\" for screen reader announcement.",
              "Trigger sets aria-haspopup=\"dialog\" to signal interactive behavior.",
              "ESC key closes the panel — standard dialog dismissal pattern.",
              "Click-outside detection via mousedown event for reliable closure.",
              "Textarea auto-focuses on open for immediate keyboard input.",
              "Close button has aria-label for icon-only accessibility.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      {/* Troubleshooting */}
      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-3">
          {[
            {
              q: "Panel opens in the wrong position",
              a: "The panel anchors to the trigger's bounding rect. Ensure the FloatingPanelRoot has position:relative (applied by default). If the trigger is inside a scrollable container, position may shift on scroll.",
            },
            {
              q: "Shared layout animation looks jerky",
              a: "Ensure Framer Motion v11+. The layoutId animation requires both trigger and content to share the same MotionConfig (handled by FloatingPanelRoot).",
            },
            {
              q: "Panel doesn't close on outside click",
              a: "The click-outside handler uses mousedown. If you have event.stopPropagation() on a parent, it may block the detection.",
            },
            {
              q: "Textarea not auto-focusing",
              a: "Browsers may block autoFocus inside portals. The component uses a standard textarea with autoFocus — ensure no parent is stealing focus.",
            },
            {
              q: "TypeScript error with MotionConfig",
              a: "Ensure framer-motion types match your version. The component uses the 'framer-motion' import path, not 'motion/react'.",
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
