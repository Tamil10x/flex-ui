"use client";

import React from "react";
import { Timeline } from "@/components/flexui/timeline";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Rocket, CheckCircle, Code, Star } from "lucide-react";

const examples = [
  {
    id: "timeline-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A standard timeline with dates, titles, and descriptions. Items animate into view on scroll.",
    preview: (
      <Timeline
        items={[
          { title: "Project Kickoff", description: "Initial planning and team alignment.", date: "Jan 2026" },
          { title: "Design Phase", description: "Wireframes, prototypes, and design system.", date: "Feb 2026" },
          { title: "Development", description: "Core feature implementation and testing.", date: "Mar 2026" },
          { title: "Launch", description: "Shipped to production for all users.", date: "Apr 2026" },
        ]}
        className="max-w-md"
      />
    ),
    code: `<Timeline items={[
  { title: "Project Kickoff", description: "Initial planning and team alignment.", date: "Jan 2026" },
  { title: "Design Phase", description: "Wireframes, prototypes, and design system.", date: "Feb 2026" },
  { title: "Development", description: "Core feature implementation and testing.", date: "Mar 2026" },
  { title: "Launch", description: "Shipped to production for all users.", date: "Apr 2026" },
]} />`,
    filename: "default.tsx",
  },
  {
    id: "timeline-icons",
    title: "With Custom Icons",
    tag: "Compose",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Each timeline item uses a custom Lucide icon instead of the default dot.",
    preview: (
      <Timeline
        items={[
          { title: "Planned", description: "Feature scoped and approved.", date: "Week 1", icon: <Star className="h-3 w-3 text-amber-400" /> },
          { title: "In Progress", description: "Development underway.", date: "Week 2", icon: <Code className="h-3 w-3 text-blue-400" /> },
          { title: "Review", description: "Code review and QA testing.", date: "Week 3", icon: <CheckCircle className="h-3 w-3 text-green-400" /> },
          { title: "Deployed", description: "Shipped to production.", date: "Week 4", icon: <Rocket className="h-3 w-3 text-cyan-400" /> },
        ]}
        className="max-w-md"
      />
    ),
    code: `import { Rocket, CheckCircle, Code, Star } from "lucide-react";

<Timeline items={[
  { title: "Planned", description: "Feature scoped.", date: "Week 1", icon: <Star className="h-3 w-3 text-amber-400" /> },
  { title: "In Progress", description: "Development underway.", date: "Week 2", icon: <Code className="h-3 w-3 text-blue-400" /> },
  { title: "Review", description: "QA testing.", date: "Week 3", icon: <CheckCircle className="h-3 w-3 text-green-400" /> },
  { title: "Deployed", description: "Shipped.", date: "Week 4", icon: <Rocket className="h-3 w-3 text-cyan-400" /> },
]} />`,
    filename: "with-icons.tsx",
  },
  {
    id: "timeline-minimal",
    title: "Minimal (No Dates)",
    tag: "Variant",
    tagColor: "bg-green-500/10 text-green-400",
    description: "A simplified timeline without dates, using just titles and descriptions.",
    preview: (
      <Timeline
        items={[
          { title: "Sign Up", description: "Create your free account in seconds." },
          { title: "Configure", description: "Set up your workspace and invite your team." },
          { title: "Launch", description: "Start building and shipping with FlexUI." },
        ]}
        className="max-w-md"
      />
    ),
    code: `<Timeline items={[
  { title: "Sign Up", description: "Create your free account." },
  { title: "Configure", description: "Set up your workspace." },
  { title: "Launch", description: "Start building with FlexUI." },
]} />`,
    filename: "minimal.tsx",
  },
];

export function TimelineExamples() {
  return <ShowcaseGrid items={examples} />;
}
