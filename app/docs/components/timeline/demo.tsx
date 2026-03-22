"use client";

import React from "react";
import { Timeline } from "@/components/flexui/timeline";

const items = [
  {
    title: "Project Kickoff",
    description: "Initial planning and team alignment for the new product launch.",
    date: "Jan 2026",
  },
  {
    title: "Design Phase",
    description: "Created wireframes, prototypes, and finalized the design system.",
    date: "Feb 2026",
  },
  {
    title: "Development Sprint",
    description: "Built core features, integrated APIs, and wrote unit tests.",
    date: "Mar 2026",
  },
  {
    title: "Beta Release",
    description: "Launched the beta version to early adopters for feedback.",
    date: "Apr 2026",
  },
];

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] items-start justify-center rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <Timeline items={items} className="max-w-md" />
    </div>
  );
}
