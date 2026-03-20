"use client";

import React from "react";
import { RotatingText } from "@/components/flexui/rotating-text";

function HeroExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-white">
        We build{" "}
        <RotatingText
          words={["beautiful", "fast", "accessible"]}
          duration={2000}
          className="text-blue-400"
        />{" "}
        interfaces.
      </h2>
    </div>
  );
}

function RoleExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <p className="text-xl text-zinc-400">
        I&apos;m a{" "}
        <RotatingText
          words={["developer", "designer", "creator", "builder"]}
          duration={1500}
          direction="down"
          className="font-semibold text-white"
        />
      </p>
    </div>
  );
}

function FeatureExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <p className="text-2xl font-bold text-white">
        <RotatingText
          words={["React", "Next.js", "TypeScript", "Tailwind"]}
          duration={2500}
          className="text-emerald-400"
        />
      </p>
      <p className="mt-2 text-sm text-zinc-500">
        Built with the best tools
      </p>
    </div>
  );
}

export function RotatingTextExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Hero Headline</h3>
        <HeroExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Role Description (down direction)</h3>
        <RoleExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Feature Highlight</h3>
        <FeatureExample />
      </div>
    </div>
  );
}
