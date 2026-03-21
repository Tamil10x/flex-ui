"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface AudioReactiveWaveProps {
  className?: string;
  /** Primary bar color */
  color?: string;
  /** Accent color for tall bars */
  accentColor?: string;
  /** Use microphone input or generate demo data */
  mode?: "mic" | "demo";
  /** Number of wave bars */
  bars?: number;
  /** Bar gap in px */
  gap?: number;
  children?: React.ReactNode;
}

export function AudioReactiveWave({
  className,
  color = "#8B5CF6",
  accentColor = "#389CFD",
  mode = "demo",
  bars = 64,
  gap = 2,
  children,
}: AudioReactiveWaveProps) {
  const [mounted, setMounted] = useState(false);
  const [levels, setLevels] = useState<number[]>(() =>
    Array.from({ length: bars }, () => 0.1)
  );

  const rafRef = useRef<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Demo mode: generate animated sine wave data
  const runDemo = useCallback(() => {
    let t = 0;
    const tick = () => {
      t += 0.03;
      const next = Array.from({ length: bars }, (_, i) => {
        const norm = i / bars;
        const v1 = Math.sin(norm * Math.PI * 2 + t) * 0.3;
        const v2 = Math.sin(norm * Math.PI * 4 - t * 1.3) * 0.2;
        const v3 = Math.sin(norm * Math.PI * 6 + t * 0.7) * 0.15;
        const v4 = Math.cos(norm * Math.PI * 3 + t * 0.5) * 0.1;
        const raw = 0.5 + v1 + v2 + v3 + v4;
        return Math.max(0.1, Math.min(1.0, raw));
      });
      setLevels(next);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [bars]);

  // Mic mode: use Web Audio API
  const runMic = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = bars * 4;
      analyser.smoothingTimeConstant = 0.8;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const tick = () => {
        analyser.getByteFrequencyData(dataArray);
        const step = Math.floor(dataArray.length / bars);
        const next = Array.from({ length: bars }, (_, i) => {
          const val = dataArray[i * step] / 255;
          return Math.max(0.1, val);
        });
        setLevels(next);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } catch {
      // Fallback to demo if mic access denied
      runDemo();
    }
  }, [bars, runDemo]);

  useEffect(() => {
    if (!mounted) return;

    if (mode === "mic") {
      runMic();
    } else {
      runDemo();
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [mounted, mode, runDemo, runMic]);

  if (!mounted) {
    return (
      <div
        className={cn(
          "relative flex min-h-[200px] items-end justify-center overflow-hidden rounded-2xl bg-black/40",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative flex min-h-[200px] items-end justify-center overflow-hidden rounded-2xl bg-black/40",
        className
      )}
    >
      {/* Bars container */}
      <div
        className="absolute inset-0 flex items-end justify-center px-4 pb-4"
        style={{ gap: `${gap}px` }}
      >
        {levels.map((level, i) => {
          const heightPercent = level * 100;
          const intensity = level;
          const barColor = interpolateColor(color, accentColor, intensity);
          const glowOpacity = intensity > 0.5 ? (intensity - 0.5) * 2 : 0;

          return (
            <div
              key={i}
              className="flex-1 rounded-t-full"
              style={{
                height: `${heightPercent}%`,
                background: `linear-gradient(to top, ${color}, ${barColor})`,
                boxShadow:
                  glowOpacity > 0
                    ? `0 0 ${8 * glowOpacity}px ${barColor}, 0 -${4 * glowOpacity}px ${12 * glowOpacity}px ${barColor}`
                    : "none",
                transition: "height 50ms ease-out",
                minWidth: "2px",
              }}
            />
          );
        })}
      </div>

      {/* Children overlay */}
      {children && (
        <div className="relative z-10 flex items-center justify-center p-6">
          {children}
        </div>
      )}
    </div>
  );
}

/** Linearly interpolate between two hex colors */
function interpolateColor(c1: string, c2: string, t: number): string {
  const r1 = parseInt(c1.slice(1, 3), 16);
  const g1 = parseInt(c1.slice(3, 5), 16);
  const b1 = parseInt(c1.slice(5, 7), 16);
  const r2 = parseInt(c2.slice(1, 3), 16);
  const g2 = parseInt(c2.slice(3, 5), 16);
  const b2 = parseInt(c2.slice(5, 7), 16);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
