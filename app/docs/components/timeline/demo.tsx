"use client";

import React from "react";
import { Timeline } from "@/components/flexui/timeline";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

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

const demoCode = `import { Timeline } from "@/components/flexui/timeline";

const items = [
  { title: "Project Kickoff", description: "Initial planning and team alignment.", date: "Jan 2026" },
  { title: "Design Phase", description: "Created wireframes and prototypes.", date: "Feb 2026" },
  { title: "Development Sprint", description: "Built core features and tests.", date: "Mar 2026" },
  { title: "Beta Release", description: "Launched beta to early adopters.", date: "Apr 2026" },
];

export function Demo() {
  return <Timeline items={items} className="max-w-md" />;
}`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex items-start justify-center">
          <Timeline items={items} className="max-w-md" />
        </div>
      }
      code={demoCode}
      filename="timeline-demo.tsx"
    />
  );
}
