import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { VoiceSearchPlayground } from "./playground";
import { VoiceSearchExamples } from "./examples";
import { Search, Mic, Keyboard, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Voice Search — FlexUI",
  description:
    "A full search spotlight with integrated voice input, keyboard navigation, and cinematic animations.",
};

const voiceSearchSource = `"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mic, MicOff, X, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Full source at components/flexui/voice-search.tsx`;

export default function VoiceSearchDoc() {
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
          Voice Search
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A full search spotlight that combines keyboard-driven search with voice
          input. Features cinematic blur entrance, category grouping, staggered
          result animations, and a waveform listening indicator. Press ⌘K or
          click the trigger, then speak or type your query.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <VoiceSearchPlayground />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <VoiceSearchExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock code="npx shadcn@latest add @flexui/voice-search" filename="Terminal" />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">framer-motion</code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">components/flexui/voice-search.tsx</code>.
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
                <CodeBlock code={voiceSearchSource} filename="components/flexui/voice-search.tsx" language="tsx" />
              </div>
            </div>
          }
        />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Search className="h-4 w-4 text-blue-400" />, label: "Voice + Keyboard", desc: "Seamlessly combines voice input with full keyboard navigation (↑↓ Enter Escape). Users pick their preferred input method." },
            { icon: <Mic className="h-4 w-4 text-blue-400" />, label: "Live Voice Filtering", desc: "Voice transcription instantly filters results as you speak — see matches update in real time during dictation." },
            { icon: <Keyboard className="h-4 w-4 text-blue-400" />, label: "Category Grouping", desc: "Results are automatically grouped by category with section headers and staggered entrance animations." },
            { icon: <Sparkles className="h-4 w-4 text-blue-400" />, label: "Cinematic Entrance", desc: "Modal opens with scale + blur spring animation. Backdrop uses 12px blur. Accent glow line at top edge." },
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
          <CodeBlock code={`import { VoiceSearch } from "@/components/flexui/voice-search";`} filename="Named export" />
        </DocSubSection>

        <DocSubSection id="props" title="Props">
          <ApiTable
            rows={[
              { name: "items", type: "SearchItem[]", default: "—", description: "Array of searchable items with id, title, description, icon, category, onSelect.", required: true },
              { name: "placeholder", type: "string", default: '"Search or speak…"', description: "Placeholder text for the search input." },
              { name: "lang", type: "string", default: "Browser locale", description: "BCP-47 language code for speech recognition." },
              { name: "accentColor", type: "string", default: "var(--flexui-accent)", description: "CSS color for active states, glow, and highlights." },
              { name: "shortcut", type: "string", default: '"⌘K"', description: "Keyboard shortcut label displayed on the trigger." },
              { name: "className", type: "string", default: "—", description: "Additional Tailwind classes for the trigger button." },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="search-item-type" title="SearchItem Type">
          <CodeBlock
            code={`interface SearchItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  category?: string;      // Groups results under section headers
  onSelect?: () => void;  // Called when item is selected
}`}
            filename="types.ts"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      <DocSection id="keyboard-shortcuts" title="Keyboard Shortcuts">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { keys: "⌘K / Ctrl+K", action: "Toggle the search modal" },
              { keys: "↑ / ↓", action: "Navigate between results" },
              { keys: "Enter", action: "Select the active result" },
              { keys: "Escape", action: "Close the search modal" },
            ].map((shortcut) => (
              <div key={shortcut.keys} className="flex items-center gap-3">
                <kbd className="rounded-lg border border-white/[0.08] bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-300">
                  {shortcut.keys}
                </kbd>
                <span className="text-sm text-zinc-400">{shortcut.action}</span>
              </div>
            ))}
          </div>
        </div>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Search input has aria-label 'Search' for screen readers.",
              "Voice and clear buttons have descriptive aria-labels that change with state.",
              "Keyboard navigation (↑↓ Enter Esc) works without mouse interaction.",
              "Modal backdrop closes on click — standard dismissal pattern.",
              "Graceful degradation — works as a standard search if Web Speech API is unavailable.",
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
