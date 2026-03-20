import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { AnimatedInputPlayground } from "./playground";
import { AnimatedInputExamples } from "./examples";

export const metadata: Metadata = {
  title: "Animated Input — FlexUI",
  description:
    "A text input with animated floating label, expanding underline, and glassmorphic styling.",
};

const animatedInputSource = `"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// AnimatedInputProps interface
// Floating label + expanding underline + glassmorphic input
// Full source: npx shadcn@latest add @flexui/animated-input`;

export default function AnimatedInputDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Form Input
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Animated Input
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A text input with an animated label that floats up when focused or has
          content. Includes an expanding underline, glassmorphic styling, and
          configurable accent colors.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <AnimatedInputPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <AnimatedInputExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/animated-input"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/animated-input.tsx
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
                  2. Copy component source
                </p>
                <CodeBlock
                  code={animatedInputSource}
                  filename="components/flexui/animated-input.tsx"
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
              label: "Floating Label",
              desc: "Label starts as placeholder, then animates up and shrinks on focus or when the input has content. Spring physics for smooth motion.",
            },
            {
              icon: "\u25C8",
              label: "Glassmorphic Styling",
              desc: "Translucent dark input background with subtle border that reacts to hover and focus states.",
            },
            {
              icon: "\u2501",
              label: "Expanding Underline",
              desc: "A colored underline that expands from the center on focus, using the configurable accent color.",
            },
            {
              icon: "\u2713",
              label: "Controlled & Uncontrolled",
              desc: "Works as both controlled (value + onChange) and uncontrolled (internal state) component.",
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
            code={`import { AnimatedInput } from "@/components/flexui/animated-input";`}
            filename="Named exports"
          />
        </DocSubSection>

        <DocSubSection id="input-props" title="AnimatedInput Props">
          <ApiTable
            rows={[
              {
                name: "label",
                type: "string",
                default: "\u2014",
                description: "Label text that animates between placeholder and floating positions.",
                required: true,
              },
              {
                name: "type",
                type: "string",
                default: '"text"',
                description: "HTML input type (text, email, password, etc.).",
              },
              {
                name: "value",
                type: "string",
                default: "\u2014",
                description: "Controlled input value. Omit for uncontrolled mode.",
              },
              {
                name: "onChange",
                type: "(value: string) => void",
                default: "\u2014",
                description: "Called with the new value on input change.",
              },
              {
                name: "accentColor",
                type: "string",
                default: '"#3b82f6"',
                description: "CSS color for focus ring, underline, and floating label.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional classes for the outer wrapper.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Label is always visible (never hidden) \u2014 it transitions from placeholder position to floating position.",
              "Clicking the label area focuses the input via container click handler.",
              "Focus ring provides clear visual indication of active state.",
              "Supports standard input types (text, email, password) for form validation.",
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
