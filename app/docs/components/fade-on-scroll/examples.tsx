"use client";

import React from "react";
import { FadeOnScroll } from "@/components/flexui/fade-on-scroll";

function DirectionsExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-8">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
        All Directions
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {(["up", "down", "left", "right"] as const).map((dir, i) => (
          <FadeOnScroll key={dir} direction={dir} delay={i * 0.15}>
            <div className="rounded-xl border border-white/[0.08] bg-zinc-900 p-4 text-center">
              <p className="text-sm font-semibold text-white capitalize">
                {dir}
              </p>
              <p className="mt-1 text-xs text-zinc-500">delay: {i * 0.15}s</p>
            </div>
          </FadeOnScroll>
        ))}
      </div>
    </div>
  );
}

function StaggeredCardsExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-8">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Staggered Cards
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {[
          { title: "Design", color: "text-violet-400" },
          { title: "Develop", color: "text-blue-400" },
          { title: "Deploy", color: "text-emerald-400" },
        ].map((item, i) => (
          <FadeOnScroll key={item.title} direction="up" delay={i * 0.2} distance={60}>
            <div className="rounded-xl border border-white/[0.08] bg-zinc-900 p-6 text-center">
              <p className={`text-2xl font-bold ${item.color}`}>{item.title}</p>
              <p className="mt-2 text-xs text-zinc-500">Step {i + 1}</p>
            </div>
          </FadeOnScroll>
        ))}
      </div>
    </div>
  );
}

function FadeOnlyExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-8">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Fade Only (No Slide)
      </h3>
      <FadeOnScroll direction="none" duration={1.2}>
        <div className="rounded-xl border border-white/[0.08] bg-zinc-900 p-6 text-center">
          <p className="text-lg font-bold text-white">
            Pure Fade
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            This element fades in without any directional movement.
          </p>
        </div>
      </FadeOnScroll>
    </div>
  );
}

export function FadeOnScrollExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">All Directions</h3>
        <DirectionsExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Staggered Cards</h3>
        <StaggeredCardsExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Fade Only</h3>
        <FadeOnlyExample />
      </div>
    </div>
  );
}
