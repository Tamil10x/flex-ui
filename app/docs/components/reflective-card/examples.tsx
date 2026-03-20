"use client";

import React from "react";
import { ReflectiveCard } from "@/components/flexui/reflective-card";

function DefaultCard() {
  return <ReflectiveCard />;
}

function HighMetalCard() {
  return (
    <ReflectiveCard
      metalness={1}
      roughness={0.2}
      blurStrength={8}
      specularConstant={2}
      grayscale={0}
      enableWebcam
    />
  );
}

function FrostedCard() {
  return (
    <ReflectiveCard
      blurStrength={24}
      grayscale={1}
      metalness={0.6}
      roughness={0.6}
      overlayColor="rgba(0,0,0,0.2)"
    />
  );
}

function CustomContentCard() {
  return (
    <ReflectiveCard blurStrength={16} grayscale={0.5} metalness={0.8}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/20 pb-4">
        <span className="rounded bg-emerald-500/20 border border-emerald-500/30 px-2 py-1 text-[10px] font-bold tracking-[0.1em] text-emerald-300">
          PREMIUM
        </span>
        <span className="text-xs text-white/50">v2.0</span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col items-center justify-center text-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-3xl">
          ✦
        </div>
        <h2 className="text-xl font-bold tracking-tight">
          FLEX<span className="text-emerald-400">UI</span>
        </h2>
        <p className="text-xs tracking-[0.15em] opacity-60 uppercase">
          Reflective Component
        </p>
      </div>

      {/* Footer */}
      <div className="border-t border-white/20 pt-4 text-center">
        <p className="text-[10px] tracking-[0.1em] opacity-50">
          WEBCAM-POWERED GLASS EFFECT
        </p>
      </div>
    </ReflectiveCard>
  );
}

export function ReflectiveCardExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultCard />
        <p className="text-xs text-zinc-500">Default</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <HighMetalCard />
        <p className="text-xs text-zinc-500">High Metal</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <FrostedCard />
        <p className="text-xs text-zinc-500">Frosted</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <CustomContentCard />
        <p className="text-xs text-zinc-500">Custom Content</p>
      </div>
    </div>
  );
}
