"use client";

import React from "react";
import { LiquidGlassButton } from "@/components/flexui/liquid-glass-button";

function DefaultExample() {
  return <LiquidGlassButton>Default Glass</LiquidGlassButton>;
}

function BlueExample() {
  return (
    <LiquidGlassButton tintColor="59,130,246">
      Blue Glass
    </LiquidGlassButton>
  );
}

function EmeraldExample() {
  return (
    <LiquidGlassButton tintColor="16,185,129">
      Emerald Glass
    </LiquidGlassButton>
  );
}

function PinkExample() {
  return (
    <LiquidGlassButton tintColor="236,72,153">
      Pink Glass
    </LiquidGlassButton>
  );
}

function SizesExample() {
  return (
    <div className="flex items-center gap-4">
      <LiquidGlassButton size="sm">Small</LiquidGlassButton>
      <LiquidGlassButton size="md">Medium</LiquidGlassButton>
      <LiquidGlassButton size="lg">Large</LiquidGlassButton>
    </div>
  );
}

function HighRefractionExample() {
  return (
    <LiquidGlassButton refractionIntensity={1} tintColor="245,158,11">
      Max Refraction
    </LiquidGlassButton>
  );
}

function DisabledExample() {
  return (
    <LiquidGlassButton disabled>
      Disabled
    </LiquidGlassButton>
  );
}

export function LiquidGlassButtonExamples() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultExample />
        <p className="text-xs text-zinc-500">Default (Purple)</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <BlueExample />
        <p className="text-xs text-zinc-500">Blue</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <EmeraldExample />
        <p className="text-xs text-zinc-500">Emerald</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <PinkExample />
        <p className="text-xs text-zinc-500">Pink</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <HighRefractionExample />
        <p className="text-xs text-zinc-500">Max Refraction</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <DisabledExample />
        <p className="text-xs text-zinc-500">Disabled</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <SizesExample />
        <p className="text-xs text-zinc-500">Size Variants</p>
      </div>
    </div>
  );
}
