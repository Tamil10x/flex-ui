"use client";

import React from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";

// ── Import ALL FlexUI components for the scope ──────────────────────────────
// Buttons
import { ShimmerButton } from "@/components/flexui/shimmer-button";
import { GlowButton } from "@/components/flexui/glow-button";
import { MagneticButton } from "@/components/flexui/magnetic-button";
import { ConfettiButton } from "@/components/flexui/confetti-button";
import { GradientBorderButton } from "@/components/flexui/gradient-border-button";
import { LiquidButton } from "@/components/flexui/liquid-button";
// Cards
import { SpotlightCard } from "@/components/flexui/spotlight-card";
import { NeonGlowCard } from "@/components/flexui/neon-glow-card";
import { HolographicCard } from "@/components/flexui/holographic-card";
// Text Animations
import { TextReveal } from "@/components/flexui/text-reveal";
import { TypewriterText } from "@/components/flexui/typewriter-text";
import { GradientText } from "@/components/flexui/gradient-text";
import { RotatingText } from "@/components/flexui/rotating-text";
import { NumberTicker } from "@/components/flexui/number-ticker";
import { FlipWords } from "@/components/flexui/flip-words";
import { ChromaticText } from "@/components/flexui/chromatic-text";
import { HandwrittenAnnotation } from "@/components/flexui/handwritten-annotation";
import { WavyText } from "@/components/flexui/wavy-text";
import { BlurText } from "@/components/flexui/blur-text";
import { SplitText } from "@/components/flexui/split-text";
import { TextScramble } from "@/components/flexui/text-scramble";
// Effects
import { MorphingBlob } from "@/components/flexui/morphing-blob";
import { GlitchTransition } from "@/components/flexui/glitch-transition";
import { AmbientTilt } from "@/components/flexui/ambient-tilt";
import { DisintegrationEffect } from "@/components/flexui/disintegration-effect";
// Layout
import { AnimatedTabs } from "@/components/flexui/animated-tabs";
import { Marquee } from "@/components/flexui/marquee";
import { MovingBorder } from "@/components/flexui/moving-border";
import { BorderBeam } from "@/components/flexui/border-beam";
// Data Viz
import { ProgressRing } from "@/components/flexui/progress-ring";
import { SparklineChart } from "@/components/flexui/sparkline-chart";

// ── Scope — every component available to react-live ─────────────────────────
const scope = {
  React,
  useState: React.useState,
  useEffect: React.useEffect,
  useRef: React.useRef,
  // Buttons
  ShimmerButton,
  GlowButton,
  MagneticButton,
  ConfettiButton,
  GradientBorderButton,
  LiquidButton,
  // Cards
  SpotlightCard,
  NeonGlowCard,
  HolographicCard,
  // Text
  TextReveal,
  TypewriterText,
  GradientText,
  RotatingText,
  NumberTicker,
  FlipWords,
  ChromaticText,
  HandwrittenAnnotation,
  WavyText,
  BlurText,
  SplitText,
  TextScramble,
  // Effects
  MorphingBlob,
  GlitchTransition,
  AmbientTilt,
  DisintegrationEffect,
  // Layout
  AnimatedTabs,
  Marquee,
  MovingBorder,
  BorderBeam,
  // Data Viz
  ProgressRing,
  SparklineChart,
};

/**
 * Strip import/export from AI code, return just the render body for react-live.
 */
function transformCode(code: string): string {
  let t = code;

  // Remove all import lines
  t = t.replace(/^import\s+.*?;?\s*$/gm, "");

  // Extract function body
  const funcMatch = t.match(
    /export\s+default\s+function\s+\w+\s*\([^)]*\)\s*\{([\s\S]*)\}\s*;?\s*$/
  );

  if (funcMatch) {
    const body = funcMatch[1].trim();

    // Check if body has state/hooks (needs function wrapper)
    const hasHooks = /\b(useState|useEffect|useRef|useCallback)\b/.test(body);

    if (hasHooks) {
      return `function Demo() {\n${body}\n}\nrender(<Demo />)`;
    }

    // Simple return — extract JSX
    const returnMatch = body.match(/return\s*\(\s*([\s\S]*)\s*\)\s*;?\s*$/);
    if (returnMatch) {
      return `render(${returnMatch[1].trim()})`;
    }

    // Return without parens
    const returnSimple = body.match(/return\s+([\s\S]+)/);
    if (returnSimple) {
      return `render(${returnSimple[1].trim().replace(/;$/, "")})`;
    }
  }

  // Fallback: try to find JSX directly
  const jsxMatch = t.trim().match(/(<[A-Z][\s\S]*>)/);
  if (jsxMatch) {
    return `render(${jsxMatch[1]})`;
  }

  return `render(<div className="text-zinc-500 text-sm">Preview unavailable</div>)`;
}

interface LiveCodePreviewProps {
  code: string;
  className?: string;
}

export function LiveCodePreview({ code, className }: LiveCodePreviewProps) {
  const transformed = transformCode(code);

  return (
    <div className={className}>
      <LiveProvider code={transformed} scope={scope} noInline>
        <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-white/[0.04] bg-zinc-950/50 p-6 overflow-hidden">
          <LivePreview />
        </div>
        <LiveError className="mt-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs font-mono text-red-400 max-h-[80px] overflow-auto" />
      </LiveProvider>
    </div>
  );
}
