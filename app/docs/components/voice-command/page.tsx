import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { VoiceCommandPlayground } from "./playground";
import { VoiceCommandExamples } from "./examples";
import { Mic, Sparkles, Command, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Voice Command — FlexUI",
  description:
    "A voice command listener that matches spoken phrases to actions with a cinematic floating command palette.",
};

const voiceCommandSource = `"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Command, Check, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Full source at components/flexui/voice-command.tsx`;

export default function VoiceCommandDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
            Phase 4
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Web Speech API
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Voice Command
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A voice command listener that matches spoken phrases to registered actions.
          Features a cinematic floating command palette with match feedback,
          triple-ring pulse animations, and blur-based icon transitions.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <VoiceCommandPlayground />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <VoiceCommandExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock code="npx shadcn@latest add @flexui/voice-command" filename="Terminal" />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">framer-motion</code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">components/flexui/voice-command.tsx</code>.
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">1. Install dependency</p>
                <CodeBlock code="npm install framer-motion" filename="Terminal" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">2. Copy component source</p>
                <CodeBlock code={voiceCommandSource} filename="components/flexui/voice-command.tsx" language="tsx" />
              </div>
            </div>
          }
        />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Mic className="h-4 w-4 text-blue-400" />, label: "Phrase Matching", desc: "Case-insensitive phrase matching against spoken text. Supports partial matches so 'open search' matches 'search'." },
            { icon: <Command className="h-4 w-4 text-blue-400" />, label: "Floating Palette", desc: "A cinematic command palette appears when active, showing all registered commands with real-time match feedback." },
            { icon: <Sparkles className="h-4 w-4 text-blue-400" />, label: "Match Animations", desc: "Success state with emerald check + sparkle icon. Error state with amber warning. Stagger animation on command list." },
            { icon: <Zap className="h-4 w-4 text-blue-400" />, label: "Triple Pulse Rings", desc: "Three concentric pulse rings expand outward when listening, with staggered delays for a cinematic depth effect." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="exports" title="Exports">
          <CodeBlock code={`import { VoiceCommand } from "@/components/flexui/voice-command";`} filename="Named export" />
        </DocSubSection>

        <DocSubSection id="props" title="Props">
          <ApiTable
            rows={[
              { name: "commands", type: "VoiceCommand[]", default: "—", description: "Array of { phrase, action, label?, icon? } objects.", required: true },
              { name: "lang", type: "string", default: "Browser locale", description: "BCP-47 language code for speech recognition." },
              { name: "showPalette", type: "boolean", default: "true", description: "Show the floating command palette UI." },
              { name: "accentColor", type: "string", default: "var(--flexui-accent)", description: "CSS color for active states and glow." },
              { name: "onCommandMatch", type: "(phrase: string) => void", default: "—", description: "Called when a spoken phrase matches a command." },
              { name: "onNoMatch", type: "(transcript: string) => void", default: "—", description: "Called when no command matches the spoken text." },
              { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Size of the trigger button." },
              { name: "className", type: "string", default: "—", description: "Additional Tailwind classes." },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="command-type" title="VoiceCommand Type">
          <CodeBlock
            code={`interface VoiceCommand {
  phrase: string;       // Keyword to match (case-insensitive)
  action: () => void;   // Function to run on match
  label?: string;       // Display label in palette
  icon?: React.ReactNode; // Icon next to the command
}`}
            filename="types.ts"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Trigger button has dynamic aria-label based on listening state.",
              "Command palette is visually connected to the trigger and dismisses automatically.",
              "Status feedback (matched/no-match) is displayed visually with color-coded icons.",
              "Component renders null if Web Speech API is not supported — no broken UI.",
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
