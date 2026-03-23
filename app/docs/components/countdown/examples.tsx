"use client";

import React from "react";
import { Countdown } from "@/components/flexui/countdown";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "cd-default",
    title: "Default (7 Days)",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A standard countdown counting down 7 days from now.",
    preview: (
      <div className="flex flex-col items-center gap-3">
        <Countdown targetDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)} />
        <p className="text-xs text-zinc-500">7 days from now</p>
      </div>
    ),
    code: `const target = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

<Countdown targetDate={target} />`,
    filename: "default.tsx",
  },
  {
    id: "cd-short",
    title: "Short Timer (1 Hour)",
    tag: "Duration",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "A shorter countdown for flash sales or time-limited events.",
    preview: (
      <div className="flex flex-col items-center gap-3">
        <Countdown targetDate={new Date(Date.now() + 1 * 60 * 60 * 1000)} />
        <p className="text-xs text-zinc-500">1 hour from now</p>
      </div>
    ),
    code: `const target = new Date(Date.now() + 1 * 60 * 60 * 1000);

<Countdown targetDate={target} />`,
    filename: "short-timer.tsx",
  },
  {
    id: "cd-callback",
    title: "With Completion Callback",
    tag: "Feature",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Fires a callback when the countdown hits zero. Set to 30 days for demo.",
    preview: (
      <div className="flex flex-col items-center gap-3">
        <Countdown
          targetDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
          onComplete={() => alert("Countdown complete!")}
        />
        <p className="text-xs text-zinc-500">30 days with onComplete callback</p>
      </div>
    ),
    code: `<Countdown
  targetDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
  onComplete={() => alert("Countdown complete!")}
/>`,
    filename: "with-callback.tsx",
  },
  {
    id: "cd-styled",
    title: "Custom Styled",
    tag: "Style",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Pass className to customize the container styling.",
    preview: (
      <div className="flex flex-col items-center gap-3">
        <Countdown
          targetDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)}
          className="gap-4"
        />
        <p className="text-xs text-zinc-500">Custom spacing with className</p>
      </div>
    ),
    code: `<Countdown
  targetDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)}
  className="gap-4"
/>`,
    filename: "styled.tsx",
  },
];

export function CountdownExamples() {
  return <ShowcaseGrid items={examples} />;
}
