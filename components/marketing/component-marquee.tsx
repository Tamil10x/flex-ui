"use client";

import React from "react";

const components = [
  "Magnetic Button",
  "3D Hover Card",
  "Floating Panel",
  "Interactive Globe",
  "Expandable Card",
  "Reflective Card",
  "Shimmer Button",
  "Text Reveal",
  "Animated Tabs",
  "Marquee",
  "Number Ticker",
  "Spotlight Card",
  "Aurora Background",
  "Typewriter Text",
  "Flip Words",
  "Dock Menu",
  "Morphing Dialog",
  "OTP Input",
  "Pricing Block",
  "Progress Ring",
];

function Pill({ name }: { name: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-zinc-950/80 px-4 py-2 text-sm font-medium text-zinc-300 backdrop-blur-sm">
      <span className="h-2 w-2 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400" />
      {name}
    </span>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="group relative flex overflow-hidden">
      {/* Left fade mask */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      {/* Right fade mask */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

      <div
        className={`flex shrink-0 gap-3 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((name, i) => (
          <Pill key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  );
}

export function ComponentMarquee() {
  // Split into two rows
  const row1 = components.slice(0, 6);
  const row2 = components.slice(6);

  return (
    <section className="overflow-hidden py-16">
      <div className="flex flex-col gap-3">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
