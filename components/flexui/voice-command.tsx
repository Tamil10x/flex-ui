"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Command, Check, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceCommand {
  /** Keyword or phrase to match (case-insensitive) */
  phrase: string;
  /** Action to run when the phrase is detected */
  action: () => void;
  /** Display label for the command list */
  label?: string;
  /** Icon to show next to the command */
  icon?: React.ReactNode;
}

interface VoiceCommandProps {
  /** List of voice commands to listen for */
  commands: VoiceCommand[];
  /** Language for recognition (BCP-47) */
  lang?: string;
  /** Show the floating command palette UI */
  showPalette?: boolean;
  /** Accent color */
  accentColor?: string;
  /** Called when a command is matched */
  onCommandMatch?: (phrase: string) => void;
  /** Called when speech doesn't match any command */
  onNoMatch?: (transcript: string) => void;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  className?: string;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: { resultIndex: number; results: { length: number; [i: number]: { isFinal: boolean; [i: number]: { transcript: string } } } }) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
}

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function VoiceCommand({
  commands,
  lang,
  showPalette = true,
  accentColor = "var(--flexui-accent, #8B5CF6)",
  onCommandMatch,
  onNoMatch,
  size = "md",
  className,
}: VoiceCommandProps) {
  const [active, setActive] = useState(false);
  const [lastTranscript, setLastTranscript] = useState("");
  const [matchedCommand, setMatchedCommand] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "listening" | "matched" | "no-match">("idle");
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const btnSizes = { sm: "h-10 w-10", md: "h-12 w-12", lg: "h-14 w-14" };
  const iconSizes = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-6 w-6" };

  useEffect(() => {
    if (!getSpeechRecognition()) setSupported(false);
  }, []);

  const matchCommand = useCallback(
    (transcript: string) => {
      const lower = transcript.toLowerCase().trim();
      for (const cmd of commands) {
        if (lower.includes(cmd.phrase.toLowerCase())) {
          return cmd;
        }
      }
      return null;
    },
    [commands]
  );

  const startListening = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR) return;

    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    if (lang) recognition.lang = lang;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setLastTranscript(transcript);

      const matched = matchCommand(transcript);
      if (matched) {
        setMatchedCommand(matched.label || matched.phrase);
        setStatus("matched");
        onCommandMatch?.(matched.phrase);
        matched.action();
      } else {
        setStatus("no-match");
        onNoMatch?.(transcript);
      }

      timeoutRef.current = setTimeout(() => {
        setStatus("idle");
        setMatchedCommand(null);
        setLastTranscript("");
      }, 2500);
    };

    recognition.onend = () => setActive(false);
    recognition.onerror = () => { setActive(false); setStatus("idle"); };

    recognition.start();
    recognitionRef.current = recognition;
    setActive(true);
    setStatus("listening");
  }, [lang, matchCommand, onCommandMatch, onNoMatch]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setActive(false);
    setStatus("idle");
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      recognitionRef.current?.abort();
    };
  }, []);

  if (!supported) return null;

  return (
    <div className={cn("relative", className)}>
      {/* Main trigger with cinematic hover */}
      <motion.button
        type="button"
        onClick={active ? stopListening : startListening}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.92 }}
        className={cn("group relative z-10 flex items-center justify-center rounded-2xl transition-all duration-500", btnSizes[size])}
        style={{
          background: active ? accentColor : "var(--flexui-surface)",
          border: `1px solid ${active ? "transparent" : "var(--flexui-border)"}`,
          boxShadow: active
            ? `0 0 30px ${accentColor}40, 0 0 60px ${accentColor}15, inset 0 1px 0 rgba(255,255,255,0.1)`
            : "0 0 0 0 transparent",
        }}
        aria-label={active ? "Stop voice command" : "Start voice command"}
      >
        {/* Background gradient morph */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${accentColor}20, transparent, ${accentColor}10)`,
          }}
        />

        {/* Expanding pulse rings */}
        <AnimatePresence>
          {active && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-2xl"
                  style={{ border: `1.5px solid ${accentColor}` }}
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: [1, 1.6 + i * 0.3], opacity: [0.4, 0] }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Icon with cinematic transition */}
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key="on"
              initial={{ scale: 0, rotate: -180, filter: "blur(4px)" }}
              animate={{ scale: 1, rotate: 0, filter: "blur(0px)" }}
              exit={{ scale: 0, rotate: 180, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <MicOff className={cn("text-white", iconSizes[size])} />
            </motion.div>
          ) : (
            <motion.div
              key="off"
              initial={{ scale: 0, rotate: 180, filter: "blur(4px)" }}
              animate={{ scale: 1, rotate: 0, filter: "blur(0px)" }}
              exit={{ scale: 0, rotate: -180, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Mic className={cn(iconSizes[size])} style={{ color: "var(--flexui-heading)" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating command palette with entrance animation */}
      <AnimatePresence>
        {showPalette && (active || status === "matched" || status === "no-match") && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 12, scale: 0.9, filter: "blur(8px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute left-1/2 top-full z-50 mt-4 w-80 -translate-x-1/2 overflow-hidden rounded-2xl"
            style={{
              background: "var(--flexui-background, #09090b)",
              border: "1px solid var(--flexui-border)",
              boxShadow: `0 25px 60px rgba(0,0,0,0.6), 0 0 30px ${accentColor}08`,
            }}
          >
            {/* Status bar with animated gradient */}
            <div
              className="relative flex items-center gap-2.5 overflow-hidden border-b px-4 py-3"
              style={{ borderColor: "var(--flexui-border)" }}
            >
              {/* Shimmer effect on status bar */}
              {status === "listening" && (
                <motion.div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(90deg, transparent, ${accentColor}08, transparent)` }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}

              <div className="relative flex items-center gap-2.5">
                {status === "listening" && (
                  <>
                    <motion.div
                      className="h-2 w-2 rounded-full"
                      style={{ background: accentColor }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                    <span className="text-xs font-semibold" style={{ color: "var(--flexui-heading)" }}>
                      Listening for command…
                    </span>
                  </>
                )}
                {status === "matched" && (
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <Check className="h-4 w-4 text-emerald-400" />
                    </motion.div>
                    <span className="text-xs font-bold text-emerald-400">
                      {matchedCommand}
                    </span>
                    <Sparkles className="h-3 w-3 text-emerald-400" />
                  </motion.div>
                )}
                {status === "no-match" && (
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <AlertCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-medium text-amber-400">
                      &quot;{lastTranscript}&quot; — no match
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Command list with stagger animation */}
            <div className="max-h-56 overflow-y-auto px-2 py-2">
              {commands.map((cmd, i) => {
                const isMatched = matchedCommand === (cmd.label || cmd.phrase);
                return (
                  <motion.div
                    key={cmd.phrase}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200"
                    style={{
                      background: isMatched ? `${accentColor}12` : "transparent",
                      borderLeft: isMatched ? `2px solid ${accentColor}` : "2px solid transparent",
                    }}
                  >
                    <motion.span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: "var(--flexui-surface)" }}
                      animate={isMatched ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      {cmd.icon || <Command className="h-3.5 w-3.5" style={{ color: "var(--flexui-caption)" }} />}
                    </motion.span>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-semibold" style={{ color: isMatched ? accentColor : "var(--flexui-heading)" }}>
                        {cmd.label || cmd.phrase}
                      </p>
                      <p className="truncate text-[10px]" style={{ color: "var(--flexui-caption)" }}>
                        Say &quot;{cmd.phrase}&quot;
                      </p>
                    </div>
                    {isMatched && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
