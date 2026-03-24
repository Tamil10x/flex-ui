import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { VoiceInputPlayground } from "./playground";
import { VoiceInputExamples } from "./examples";
import { Mic, Waves, Volume2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Voice Input — FlexUI",
  description:
    "A speech-to-text input component with real-time waveform visualization, powered by the Web Speech API.",
};

const voiceInputSource = `"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Mic, MicOff, Loader2, X, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Full source at components/flexui/voice-input.tsx`;

export default function VoiceInputDoc() {
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
          Voice Input
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A speech-to-text input component with cinematic waveform visualization,
          volume-reactive glow effects, and real-time interim transcription. Click
          the mic and speak — your voice is transcribed live.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <VoiceInputPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <VoiceInputExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/voice-input"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/voice-input.tsx
                </code>
                .
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
                <CodeBlock code={voiceInputSource} filename="components/flexui/voice-input.tsx" language="tsx" />
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
              icon: <Mic className="h-4 w-4 text-blue-400" />,
              label: "Live Speech-to-Text",
              desc: "Real-time transcription via the Web Speech API with interim and final results displayed as you speak.",
            },
            {
              icon: <Waves className="h-4 w-4 text-blue-400" />,
              label: "Cinematic Waveform",
              desc: "32-bar frequency visualization driven by the Web Audio API analyser node — reacts to your actual voice volume.",
            },
            {
              icon: <Volume2 className="h-4 w-4 text-blue-400" />,
              label: "Volume-Reactive Glow",
              desc: "Spring-physics glow effect that intensifies with voice amplitude using Framer Motion useSpring.",
            },
            {
              icon: <Sparkles className="h-4 w-4 text-blue-400" />,
              label: "Micro-Interactions",
              desc: "Orbit dots on idle, pulse rings on active, icon rotation transitions, and smooth text entrance animations.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="exports" title="Exports">
          <CodeBlock
            code={`import { VoiceInput } from "@/components/flexui/voice-input";`}
            filename="Named export"
          />
        </DocSubSection>

        <DocSubSection id="props" title="Props">
          <ApiTable
            rows={[
              { name: "onTranscript", type: "(text: string) => void", default: "—", description: "Called with transcribed text on each result (interim + final)." },
              { name: "onFinal", type: "(text: string) => void", default: "—", description: "Called with the final accumulated transcript when speech ends." },
              { name: "placeholder", type: "string", default: '"Tap the mic and speak…"', description: "Placeholder text shown when idle." },
              { name: "lang", type: "string", default: "Browser locale", description: "BCP-47 language code for recognition (e.g. 'en-US', 'ja-JP')." },
              { name: "continuous", type: "boolean", default: "false", description: "Keep listening after each phrase for hands-free dictation." },
              { name: "accentColor", type: "string", default: "var(--flexui-accent)", description: "CSS color for glow, waveform, and active states." },
              { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Size variant affecting padding and mic button dimensions." },
              { name: "showWaveform", type: "boolean", default: "true", description: "Show the 32-bar frequency waveform visualization." },
              { name: "className", type: "string", default: "—", description: "Additional Tailwind classes merged via cn()." },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Browser Support */}
      <DocSection id="browser-support" title="Browser Support">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Chrome 33+ and Edge 79+ support Web Speech API natively.",
              "Safari 14.1+ supports Web Speech API with webkit prefix (handled automatically).",
              "Firefox does not support Web Speech API — component shows a graceful fallback message.",
              "Microphone permission is requested on first use — volume visualization requires getUserMedia access.",
              "Works on mobile Chrome and Safari with touch interaction.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Mic button has aria-label that changes based on listening state.",
              "Clear button has aria-label 'Clear transcript' for screen readers.",
              "Waveform is purely decorative and uses no ARIA roles.",
              "All animations respect prefers-reduced-motion when used with Framer Motion's default behavior.",
              "Keyboard accessible — mic button can be activated with Enter/Space.",
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
