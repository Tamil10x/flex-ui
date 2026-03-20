"use client";

import React from "react";
import { SpotlightCard } from "@/components/flexui/spotlight-card";

function DefaultExample() {
  return (
    <SpotlightCard className="w-72 p-6">
      <h3 className="text-base font-bold text-white">Default</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Cyan spotlight with default settings.
      </p>
    </SpotlightCard>
  );
}

function PurpleExample() {
  return (
    <SpotlightCard
      className="w-72 p-6"
      spotlightColor="168,85,247"
    >
      <h3 className="text-base font-bold text-white">Purple Spotlight</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Custom purple spotlight color via the{" "}
        <code className="rounded bg-zinc-800 px-1 py-0.5 text-xs text-zinc-300">
          spotlightColor
        </code>{" "}
        prop.
      </p>
    </SpotlightCard>
  );
}

function WithContentExample() {
  return (
    <SpotlightCard className="w-72 p-6" spotlightColor="52,211,153">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 text-lg">
          &#9889;
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Performance</h3>
          <p className="text-[11px] text-zinc-500">Zero re-renders</p>
        </div>
      </div>
      <p className="text-sm text-zinc-400">
        All cursor tracking is done via motion values — the React tree never
        re-renders on mouse move.
      </p>
      <div className="mt-4 flex gap-2">
        <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] text-zinc-500">
          framer-motion
        </span>
        <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] text-zinc-500">
          CSS
        </span>
      </div>
    </SpotlightCard>
  );
}

function FullWidthExample() {
  return (
    <SpotlightCard
      className="w-full max-w-xl p-8"
      spotlightColor="250,204,21"
      spotlightSize={500}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Full Width Card</h3>
          <p className="mt-1 text-sm text-zinc-400">
            A larger card with a bigger spotlight radius for hero sections or
            feature callouts.
          </p>
        </div>
        <span className="shrink-0 rounded-lg border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
          Featured
        </span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-4">
        {["Zero WebGL", "Spring Physics", "Dark Theme"].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center"
          >
            <p className="text-xs font-medium text-zinc-300">{label}</p>
          </div>
        ))}
      </div>
    </SpotlightCard>
  );
}

export function SpotlightCardExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultExample />
        <p className="text-xs text-zinc-500">Default</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <PurpleExample />
        <p className="text-xs text-zinc-500">Custom Color (Purple)</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <WithContentExample />
        <p className="text-xs text-zinc-500">With Content</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <FullWidthExample />
        <p className="text-xs text-zinc-500">Full Width</p>
      </div>
    </div>
  );
}
