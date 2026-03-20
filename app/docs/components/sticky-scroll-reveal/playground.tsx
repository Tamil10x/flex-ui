"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { StickyScrollReveal } from "@/components/flexui/sticky-scroll-reveal";

const demoSections = [
  {
    title: "First Section",
    description:
      "The left column scrolls naturally while the right panel stays fixed. Each section fades in and out as it becomes active.",
    content: (
      <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20">
        <span className="text-xl font-bold text-blue-400">Section 1</span>
      </div>
    ),
  },
  {
    title: "Second Section",
    description:
      "Scroll progress determines which section is active. The sticky panel updates to show the corresponding content.",
    content: (
      <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20">
        <span className="text-xl font-bold text-violet-400">Section 2</span>
      </div>
    ),
  },
  {
    title: "Third Section",
    description:
      "Great for feature showcases, onboarding flows, or any content where you want a persistent visual alongside scrolling text.",
    content: (
      <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20">
        <span className="text-xl font-bold text-emerald-400">Section 3</span>
      </div>
    ),
  },
];

const code = `import { StickyScrollReveal } from "@/components/flexui/sticky-scroll-reveal";

const sections = [
  {
    title: "First Section",
    description: "Description for the first section.",
    content: <div>Custom content here</div>,
  },
  {
    title: "Second Section",
    description: "Description for the second section.",
    content: <div>More content</div>,
  },
  {
    title: "Third Section",
    description: "Description for the third section.",
    content: <div>Final content</div>,
  },
];

export function Demo() {
  return <StickyScrollReveal sections={sections} />;
}`;

export function StickyScrollRevealPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="w-full">
            <StickyScrollReveal sections={demoSections} />
          </div>
        }
        code={code}
        filename="sticky-scroll-reveal-demo.tsx"
      />
    </div>
  );
}
