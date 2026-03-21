import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { TypewriterTerminalPlayground } from "./playground";
import { TypewriterTerminalExamples } from "./examples";

export const metadata: Metadata = {
  title: "Typewriter Terminal — FlexUI",
  description:
    "A realistic terminal emulator with typing animation and command sequences.",
};

const terminalSource = `"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Command {
  input: string;
  output?: string;
  delay?: number;
}

interface TypewriterTerminalProps {
  commands: Command[];
  className?: string;
  theme?: "dark" | "matrix";
  typingSpeed?: number;
  loop?: boolean;
  title?: string;
}

// ... TypewriterTerminal component
// Full source: npx shadcn@latest add @flexui/typewriter-terminal`;

export default function TypewriterTerminalDoc() {
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
          Typewriter Terminal
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A realistic terminal emulator that types commands character by
          character, displays output, and optionally loops the sequence. Perfect
          for landing pages, docs, and onboarding flows.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <TypewriterTerminalPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <TypewriterTerminalExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/typewriter-terminal"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/typewriter-terminal.tsx
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
                  code={terminalSource}
                  filename="components/flexui/typewriter-terminal.tsx"
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
        <DocSubSection id="terminal-props" title="TypewriterTerminal Props">
          <ApiTable
            rows={[
              {
                name: "commands",
                type: "Command[]",
                default: "—",
                description: "Array of commands to type and display.",
                required: true,
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional classes for the container.",
              },
              {
                name: "theme",
                type: '"dark" | "matrix"',
                default: '"dark"',
                description: "Terminal color theme.",
              },
              {
                name: "typingSpeed",
                type: "number",
                default: "50",
                description: "Milliseconds per character when typing.",
              },
              {
                name: "loop",
                type: "boolean",
                default: "false",
                description: "Loop the command sequence after completion.",
              },
              {
                name: "title",
                type: "string",
                default: '"terminal"',
                description: "Title shown in the terminal title bar.",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="command-type" title="Command Type">
          <ApiTable
            rows={[
              {
                name: "input",
                type: "string",
                default: "—",
                description: "The command text to type.",
                required: true,
              },
              {
                name: "output",
                type: "string",
                default: "—",
                description: "Output text shown after the command finishes typing.",
              },
              {
                name: "delay",
                type: "number",
                default: "0",
                description: "Delay in ms before this command starts.",
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
              "Terminal content uses monospace font for authentic appearance.",
              "Content is scrollable when it overflows the max height.",
              "Cursor blinks at standard rate for visual feedback.",
              "All text is selectable and readable by screen readers.",
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
