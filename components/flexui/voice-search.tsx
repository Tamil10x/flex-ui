"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mic, MicOff, X, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  category?: string;
  onSelect?: () => void;
}

interface VoiceSearchProps {
  items: SearchItem[];
  placeholder?: string;
  /** Language for speech recognition (BCP-47) */
  lang?: string;
  /** Accent color */
  accentColor?: string;
  /** Keyboard shortcut display */
  shortcut?: string;
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

export function VoiceSearch({
  items,
  placeholder = "Search or speak…",
  lang,
  accentColor = "var(--flexui-accent, #8B5CF6)",
  shortcut = "⌘K",
  className,
}: VoiceSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    if (!getSpeechRecognition()) setSupported(false);
  }, []);

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
  );

  const grouped = filtered.reduce<Record<string, SearchItem[]>>((acc, item) => {
    const cat = item.category || "Results";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const flatResults = filtered.slice(0, 8);

  useEffect(() => { setActiveIndex(0); }, [query]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else { setQuery(""); setActiveIndex(0); stopListening(); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((p) => !p);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const startListening = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR) return;

    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    if (lang) recognition.lang = lang;

    recognition.onresult = (e) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) {
        text += e.results[i][0].transcript;
      }
      setQuery(text);
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  }, [lang]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && flatResults[activeIndex]) {
      flatResults[activeIndex].onSelect?.();
      setOpen(false);
    }
  };

  const selectItem = (item: SearchItem) => {
    item.onSelect?.();
    setOpen(false);
  };

  let flatIndex = -1;

  return (
    <>
      {/* Trigger with hover glow */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={cn("group relative flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm transition-all duration-300", className)}
        style={{
          background: "var(--flexui-surface)",
          border: "1px solid var(--flexui-border)",
          color: "var(--flexui-caption)",
        }}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
          style={{ background: `linear-gradient(135deg, ${accentColor}10, transparent, ${accentColor}05)` }}
        />
        <Search className="relative h-4 w-4" />
        <span className="relative flex-1 text-left">{placeholder}</span>
        <kbd
          className="relative rounded px-1.5 py-0.5 text-[10px] font-medium"
          style={{ background: "var(--flexui-surface-hover, rgba(39,39,42,0.6))", color: "var(--flexui-caption)" }}
        >
          {shortcut}
        </kbd>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop with blur */}
            <motion.div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(12px)" }}
              onClick={() => setOpen(false)}
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(12px)" }}
            />

            {/* Panel with cinematic entrance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: -20, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.92, y: 20, filter: "blur(8px)" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl"
              style={{
                background: "var(--flexui-background, #09090b)",
                border: "1px solid var(--flexui-border)",
                boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 50px ${accentColor}08`,
              }}
            >
              {/* Accent glow at top */}
              <div
                className="absolute left-0 right-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)` }}
              />

              {/* Search bar */}
              <div
                className="flex items-center gap-3 border-b px-4 py-3.5"
                style={{ borderColor: "var(--flexui-border)" }}
              >
                <motion.div animate={listening ? { scale: [1, 1.15, 1] } : {}} transition={{ duration: 0.8, repeat: listening ? Infinity : 0 }}>
                  <Search className="h-4 w-4 shrink-0" style={{ color: listening ? accentColor : "var(--flexui-caption)" }} />
                </motion.div>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: "var(--flexui-heading)" }}
                  aria-label="Search"
                />

                {/* Voice button with micro-interaction */}
                {supported && (
                  <motion.button
                    type="button"
                    onClick={listening ? stopListening : startListening}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300"
                    style={{
                      background: listening ? accentColor : "var(--flexui-surface)",
                      border: `1px solid ${listening ? "transparent" : "var(--flexui-border)"}`,
                      boxShadow: listening ? `0 0 16px ${accentColor}30` : "none",
                    }}
                    aria-label={listening ? "Stop voice search" : "Voice search"}
                  >
                    <AnimatePresence mode="wait">
                      {listening ? (
                        <motion.div key="off" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <MicOff className="h-3.5 w-3.5 text-white" />
                        </motion.div>
                      ) : (
                        <motion.div key="on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <Mic className="h-3.5 w-3.5" style={{ color: "var(--flexui-caption)" }} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )}

                {query && (
                  <motion.button
                    type="button"
                    onClick={() => setQuery("")}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex h-6 w-6 items-center justify-center rounded-full"
                    style={{ background: "var(--flexui-surface-hover, rgba(39,39,42,0.6))" }}
                    aria-label="Clear search"
                  >
                    <X className="h-3 w-3" style={{ color: "var(--flexui-caption)" }} />
                  </motion.button>
                )}
              </div>

              {/* Listening indicator with waveform */}
              <AnimatePresence>
                {listening && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-center gap-3 overflow-hidden border-b py-2.5"
                    style={{ borderColor: "var(--flexui-border)", background: `${accentColor}06` }}
                  >
                    <Loader2 className="h-3 w-3 animate-spin" style={{ color: accentColor }} />
                    <span className="text-xs font-semibold" style={{ color: accentColor }}>
                      Listening — speak your search…
                    </span>
                    <div className="flex items-end gap-[2px]">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-[2px] rounded-full"
                          style={{ background: accentColor }}
                          animate={{ height: [3, 14, 3] }}
                          transition={{ duration: 0.5 + i * 0.05, repeat: Infinity, delay: i * 0.08 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results with stagger */}
              <div className="max-h-72 overflow-y-auto px-2 py-2">
                {query && flatResults.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-10 text-center"
                  >
                    <p className="text-sm" style={{ color: "var(--flexui-caption)" }}>
                      No results for &quot;{query}&quot;
                    </p>
                    {supported && !listening && (
                      <motion.button
                        type="button"
                        onClick={startListening}
                        whileHover={{ scale: 1.05 }}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold"
                        style={{ background: `${accentColor}15`, color: accentColor }}
                      >
                        <Mic className="h-3 w-3" /> Try voice search
                      </motion.button>
                    )}
                  </motion.div>
                ) : (
                  Object.entries(grouped).map(([category, categoryItems]) => (
                    <div key={category} className="mb-2">
                      <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: "var(--flexui-caption)" }}>
                        {category}
                      </p>
                      {categoryItems.slice(0, 8).map((item) => {
                        flatIndex++;
                        const isActive = flatIndex === activeIndex;
                        const currentIdx = flatIndex;
                        return (
                          <motion.button
                            key={item.id}
                            type="button"
                            onClick={() => selectItem(item)}
                            onMouseEnter={() => setActiveIndex(currentIdx)}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: currentIdx * 0.03 }}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-150"
                            style={{
                              background: isActive ? "var(--flexui-surface)" : "transparent",
                              borderLeft: isActive ? `2px solid ${accentColor}` : "2px solid transparent",
                            }}
                          >
                            {item.icon && (
                              <span
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                                style={{ background: "var(--flexui-surface-hover, rgba(39,39,42,0.6))" }}
                              >
                                {item.icon}
                              </span>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="truncate text-sm font-medium" style={{ color: "var(--flexui-heading)" }}>
                                {item.title}
                              </p>
                              {item.description && (
                                <p className="truncate text-xs" style={{ color: "var(--flexui-caption)" }}>
                                  {item.description}
                                </p>
                              )}
                            </div>
                            <AnimatePresence>
                              {isActive && (
                                <motion.div initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 4 }}>
                                  <ArrowRight className="h-3.5 w-3.5 shrink-0" style={{ color: accentColor }} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div
                className="flex items-center justify-between border-t px-4 py-2.5"
                style={{ borderColor: "var(--flexui-border)" }}
              >
                <div className="flex items-center gap-4">
                  {[
                    { key: "↑↓", label: "Navigate" },
                    { key: "↵", label: "Select" },
                    { key: "Esc", label: "Close" },
                  ].map((shortcutItem) => (
                    <span key={shortcutItem.key} className="flex items-center gap-1 text-[10px]" style={{ color: "var(--flexui-caption)" }}>
                      <kbd className="rounded px-1.5 py-0.5 text-[9px] font-medium" style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}>
                        {shortcutItem.key}
                      </kbd>
                      {shortcutItem.label}
                    </span>
                  ))}
                </div>
                {supported && (
                  <span className="flex items-center gap-1.5 text-[10px]" style={{ color: "var(--flexui-caption)" }}>
                    <Mic className="h-3 w-3" /> Voice
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
