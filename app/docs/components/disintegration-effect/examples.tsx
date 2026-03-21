"use client";

import React, { useState } from "react";
import { DisintegrationEffect } from "@/components/flexui/disintegration-effect";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

function CardExample() {
  const [snap, setSnap] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <DisintegrationEffect trigger={snap} particleCount={60} onComplete={() => {}}>
        <div className="w-64 rounded-xl border border-white/[0.08] bg-zinc-900 p-5">
          <div className="mb-3 h-3 w-20 rounded bg-violet-500/30" />
          <div className="space-y-2">
            <div className="h-2 w-full rounded bg-white/[0.06]" />
            <div className="h-2 w-3/4 rounded bg-white/[0.06]" />
            <div className="h-2 w-5/6 rounded bg-white/[0.06]" />
          </div>
          <div className="mt-4 flex gap-2">
            <div className="h-7 w-16 rounded-md bg-violet-600/30" />
            <div className="h-7 w-16 rounded-md bg-white/[0.06]" />
          </div>
        </div>
      </DisintegrationEffect>
      <button
        onClick={() => setSnap((p) => !p)}
        className="rounded-md border border-white/[0.08] bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-zinc-800"
      >
        {snap ? "Reassemble" : "Disintegrate Card"}
      </button>
    </div>
  );
}

function TextExample() {
  const [snap, setSnap] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <DisintegrationEffect
        trigger={snap}
        particleCount={40}
        colors={["#EC4899", "#F59E0B", "#8B5CF6"]}
        duration={1200}
        onComplete={() => {}}
      >
        <h2 className="text-3xl font-bold text-white">
          Thanos was right.
        </h2>
      </DisintegrationEffect>
      <button
        onClick={() => setSnap((p) => !p)}
        className="rounded-md border border-white/[0.08] bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-zinc-800"
      >
        {snap ? "Reassemble" : "Snap Text"}
      </button>
    </div>
  );
}

function ButtonExample() {
  const [snap, setSnap] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <DisintegrationEffect
        trigger={snap}
        particleCount={35}
        colors={["#22D3EE", "#389CFD", "#8B5CF6"]}
        duration={1000}
        onComplete={() => {}}
      >
        <button className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-3 text-sm font-semibold text-white">
          Delete Account
        </button>
      </DisintegrationEffect>
      <button
        onClick={() => setSnap((p) => !p)}
        className="rounded-md border border-white/[0.08] bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-zinc-800"
      >
        {snap ? "Undo" : "Confirm Delete"}
      </button>
    </div>
  );
}

const examples = [
  {
    id: "de-card",
    title: "Disintegrate a Card",
    tag: "Layout",
    tagColor: "bg-violet-500/10 text-violet-400",
    description: "Wrap a card component and watch it dissolve into particles.",
    preview: <CardExample />,
    code: `<DisintegrationEffect trigger={snap} particleCount={60}>
  <div className="w-64 rounded-xl border bg-zinc-900 p-5">
    {/* card content */}
  </div>
</DisintegrationEffect>`,
    filename: "card-example.tsx",
  },
  {
    id: "de-text",
    title: "Disintegrate Text",
    tag: "Text",
    tagColor: "bg-pink-500/10 text-pink-400",
    description: "Apply the effect to text with custom colors.",
    preview: <TextExample />,
    code: `<DisintegrationEffect
  trigger={snap}
  particleCount={40}
  colors={["#EC4899", "#F59E0B", "#8B5CF6"]}
  duration={1200}
>
  <h2 className="text-3xl font-bold text-white">
    Thanos was right.
  </h2>
</DisintegrationEffect>`,
    filename: "text-example.tsx",
  },
  {
    id: "de-button",
    title: "Disintegrate a Button",
    tag: "Interactive",
    tagColor: "bg-cyan-500/10 text-cyan-400",
    description: "Dissolve a button on confirmation with cool blue tones.",
    preview: <ButtonExample />,
    code: `<DisintegrationEffect
  trigger={snap}
  particleCount={35}
  colors={["#22D3EE", "#389CFD", "#8B5CF6"]}
  duration={1000}
>
  <button className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-3 text-sm font-semibold text-white">
    Delete Account
  </button>
</DisintegrationEffect>`,
    filename: "button-example.tsx",
  },
];

export function DisintegrationEffectExamples() {
  return <ShowcaseGrid items={examples} />;
}
