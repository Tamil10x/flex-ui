"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Mic, MicOff, Loader2, X, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceInputProps {
  /** Called with the transcribed text on each result */
  onTranscript?: (text: string) => void;
  /** Called with the final transcript when speech ends */
  onFinal?: (text: string) => void;
  /** Placeholder text when idle */
  placeholder?: string;
  /** Language for recognition (BCP-47), defaults to browser locale */
  lang?: string;
  /** Allow continuous listening */
  continuous?: boolean;
  /** Accent color for active state */
  accentColor?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Show waveform visualization */
  showWaveform?: boolean;
  className?: string;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: { transcript: string };
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: { length: number; [index: number]: SpeechRecognitionResult };
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onstart: (() => void) | null;
}

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

// ── Cinematic waveform bars ─────────────────────────────────────────────────

function WaveformBars({ volume, accentColor, count = 32 }: { volume: number; accentColor: string; count?: number }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 48, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-end justify-center gap-[2px] overflow-hidden"
    >
      {Array.from({ length: count }).map((_, i) => {
        const center = count / 2;
        const distFromCenter = Math.abs(i - center) / center;
        const baseHeight = 3;
        const maxHeight = 40;
        const intensity = (1 - distFromCenter * 0.6) * volume;
        const phaseOffset = i * 0.3;
        const wave = Math.sin(Date.now() / 150 + phaseOffset) * 0.5 + 0.5;
        const h = baseHeight + (maxHeight - baseHeight) * intensity * (0.4 + wave * 0.6);

        return (
          <motion.div
            key={i}
            animate={{ height: Math.max(h, baseHeight) }}
            transition={{ duration: 0.08, ease: "easeOut" }}
            className="rounded-full"
            style={{
              width: 3,
              background: accentColor,
              opacity: 0.3 + intensity * 0.7,
              filter: intensity > 0.5 ? `drop-shadow(0 0 4px ${accentColor})` : "none",
            }}
          />
        );
      })}
    </motion.div>
  );
}

// ── Orbiting dots for idle state ────────────────────────────────────────────

function OrbitDots({ accentColor }: { accentColor: string }) {
  return (
    <div className="absolute inset-0">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{ background: accentColor, left: "50%", top: "50%" }}
          animate={{
            x: [0, 16 * Math.cos((i * 2 * Math.PI) / 3), 0],
            y: [0, 16 * Math.sin((i * 2 * Math.PI) / 3), 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function VoiceInput({
  onTranscript,
  onFinal,
  placeholder = "Tap the mic and speak…",
  lang,
  continuous = false,
  accentColor = "var(--flexui-accent, #8B5CF6)",
  size = "md",
  showWaveform = true,
  className,
}: VoiceInputProps) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [supported, setSupported] = useState(true);
  const [volume, setVolume] = useState(0);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Spring-based glow intensity
  const glowIntensity = useMotionValue(0);
  const smoothGlow = useSpring(glowIntensity, { stiffness: 150, damping: 15 });
  const glowOpacity = useTransform(smoothGlow, [0, 1], [0, 0.6]);

  const sizeClasses = {
    sm: "px-3 py-2 gap-2",
    md: "px-4 py-3 gap-3",
    lg: "px-5 py-4 gap-4",
  };
  const micSizes = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" };
  const iconSizes = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" };

  useEffect(() => {
    if (!getSpeechRecognition()) setSupported(false);
  }, []);

  const cleanupAudio = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close();
    streamRef.current = null;
    audioCtxRef.current = null;
    analyserRef.current = null;
    setVolume(0);
    glowIntensity.set(0);
  }, [glowIntensity]);

  const startVolumeMonitor = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyserRef.current = analyser;

      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((s, v) => s + v, 0) / data.length;
        const normalized = Math.min(avg / 100, 1);
        setVolume(normalized);
        glowIntensity.set(normalized);
        animFrameRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      // Mic access denied
    }
  }, [glowIntensity]);

  const startListening = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR) return;

    const recognition = new SR();
    recognition.continuous = continuous;
    recognition.interimResults = true;
    if (lang) recognition.lang = lang;

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      let interimText = "";
      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          finalText += t;
        } else {
          interimText += t;
        }
      }
      if (finalText) {
        setTranscript((prev) => {
          const next = prev ? prev + " " + finalText : finalText;
          onTranscript?.(next);
          onFinal?.(next);
          return next;
        });
      }
      setInterim(interimText);
      if (interimText) onTranscript?.(transcript + " " + interimText);
    };

    recognition.onend = () => {
      setListening(false);
      setInterim("");
      cleanupAudio();
    };

    recognition.onerror = () => {
      setListening(false);
      cleanupAudio();
    };

    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
    startVolumeMonitor();
  }, [continuous, lang, onTranscript, onFinal, transcript, startVolumeMonitor, cleanupAudio]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
    cleanupAudio();
  }, [cleanupAudio]);

  const clear = useCallback(() => {
    setTranscript("");
    setInterim("");
    onTranscript?.("");
  }, [onTranscript]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      cleanupAudio();
    };
  }, [cleanupAudio]);

  if (!supported) {
    return (
      <div
        className={cn("flex items-center gap-2 rounded-xl px-4 py-3 text-sm", className)}
        style={{ background: "var(--flexui-surface)", color: "var(--flexui-caption)", border: "1px solid var(--flexui-border)" }}
      >
        <MicOff className="h-4 w-4" />
        Speech recognition is not supported in this browser.
      </div>
    );
  }

  return (
    <div className={cn("relative w-full", className)}>
      {/* Main container */}
      <motion.div
        layout
        className={cn("relative flex items-center rounded-2xl transition-all duration-500", sizeClasses[size])}
        style={{
          background: "var(--flexui-surface)",
          border: `1px solid ${listening ? accentColor : "var(--flexui-border)"}`,
        }}
      >
        {/* Glow effect behind container */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl"
          style={{
            opacity: glowOpacity,
            background: `radial-gradient(ellipse at center, ${accentColor}30, transparent 70%)`,
            filter: "blur(12px)",
          }}
        />

        {/* Mic button with cinematic hover */}
        <motion.button
          type="button"
          onClick={listening ? stopListening : startListening}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className={cn("relative z-10 flex shrink-0 items-center justify-center rounded-xl transition-all duration-300", micSizes[size])}
          style={{
            background: listening ? accentColor : "var(--flexui-surface-hover, rgba(39,39,42,0.6))",
            boxShadow: listening ? `0 0 20px ${accentColor}40, 0 0 40px ${accentColor}15` : "none",
          }}
          aria-label={listening ? "Stop listening" : "Start listening"}
        >
          {/* Pulse rings */}
          <AnimatePresence>
            {listening && (
              <>
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: [1, 1.8 + volume * 0.5], opacity: [0.4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-xl"
                  style={{ border: `2px solid ${accentColor}` }}
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.3 }}
                  animate={{ scale: [1, 2.2 + volume * 0.5], opacity: [0.3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                  className="absolute inset-0 rounded-xl"
                  style={{ border: `1.5px solid ${accentColor}` }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Orbit dots when idle */}
          {!listening && <OrbitDots accentColor={accentColor} />}

          {/* Icon switch */}
          <AnimatePresence mode="wait">
            {listening ? (
              <motion.div
                key="stop"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="h-3 w-3 rounded-sm bg-white" />
              </motion.div>
            ) : (
              <motion.div
                key="mic"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -180 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Mic className={cn("relative z-10", iconSizes[size])} style={{ color: "var(--flexui-heading)" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Transcript area */}
        <div className="relative z-10 min-h-[1.5rem] flex-1 text-sm">
          <AnimatePresence mode="wait">
            {transcript || interim ? (
              <motion.div
                key="text"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
              >
                <span style={{ color: "var(--flexui-heading)" }}>
                  {transcript}
                  {interim && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ color: accentColor }}
                    >
                      {" "}{interim}
                    </motion.span>
                  )}
                </span>
              </motion.div>
            ) : (
              <motion.span
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ color: "var(--flexui-caption)" }}
              >
                {placeholder}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Status indicators */}
        <div className="relative z-10 flex items-center gap-2">
          <AnimatePresence>
            {listening && (
              <motion.div
                initial={{ opacity: 0, scale: 0, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0, x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-center gap-1.5"
              >
                <motion.div
                  className="h-2 w-2 rounded-full"
                  style={{ background: accentColor }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-[11px] font-semibold" style={{ color: accentColor }}>
                  Listening
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Volume meter */}
          <AnimatePresence>
            {listening && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center gap-1 overflow-hidden"
              >
                <Volume2 className="h-3 w-3" style={{ color: "var(--flexui-caption)" }} />
                <div className="flex items-end gap-px">
                  {[0.2, 0.4, 0.6, 0.8, 1].map((threshold, i) => (
                    <motion.div
                      key={i}
                      className="w-[2px] rounded-full"
                      animate={{
                        height: volume >= threshold ? 8 + i * 2 : 3,
                        background: volume >= threshold ? accentColor : "var(--flexui-caption)",
                      }}
                      transition={{ duration: 0.1 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {(transcript || interim) && !listening && (
            <motion.button
              type="button"
              onClick={clear}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-6 w-6 items-center justify-center rounded-full transition-colors"
              style={{ background: "var(--flexui-surface-hover, rgba(39,39,42,0.6))" }}
              aria-label="Clear transcript"
            >
              <X className="h-3 w-3" style={{ color: "var(--flexui-caption)" }} />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Cinematic waveform */}
      <AnimatePresence>
        {listening && showWaveform && (
          <div className="mt-3">
            <WaveformBars volume={volume} accentColor={accentColor} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
