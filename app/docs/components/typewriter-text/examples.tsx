"use client";

import React from "react";
import { TypewriterText } from "@/components/flexui/typewriter-text";

function DefaultExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <TypewriterText
        words={["Build fast.", "Ship faster.", "Scale effortlessly."]}
        className="text-3xl font-bold text-white"
      />
    </div>
  );
}

function CustomSpeedExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <TypewriterText
        words={["Slow and steady", "Deliberate typing"]}
        typingSpeed={150}
        deletingSpeed={80}
        pauseDuration={2000}
        className="text-2xl font-medium text-zinc-300"
      />
    </div>
  );
}

function SingleWordExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <span className="text-xl text-zinc-400">We make it </span>
      <TypewriterText
        words={["simple", "beautiful", "powerful", "accessible"]}
        typingSpeed={60}
        deletingSpeed={40}
        className="text-xl font-semibold text-white"
      />
    </div>
  );
}

function NoLoopExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <TypewriterText
        words={["This only types once."]}
        loop={false}
        typingSpeed={70}
        className="text-xl text-zinc-300"
      />
    </div>
  );
}

export function TypewriterTextExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Rotating Phrases</h3>
        <DefaultExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Custom Speed</h3>
        <CustomSpeedExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Inline with Static Text</h3>
        <SingleWordExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">No Loop (Types Once)</h3>
        <NoLoopExample />
      </div>
    </div>
  );
}
