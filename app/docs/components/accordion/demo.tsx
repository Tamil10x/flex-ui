"use client";

import React from "react";
import { Accordion } from "@/components/flexui/accordion";

const items = [
  {
    title: "What is FlexUI?",
    content:
      "FlexUI is a modern React component library built with Tailwind CSS and Framer Motion. It provides beautiful, accessible, and animated components for building stunning user interfaces.",
  },
  {
    title: "Is FlexUI free to use?",
    content:
      "Yes, FlexUI is completely free and open source. You can use it in personal and commercial projects without any restrictions.",
  },
  {
    title: "How do I install components?",
    content:
      "You can install individual components using the CLI: npx flexui add <component-name>. This copies the component source directly into your project.",
  },
  {
    title: "Does it support dark mode?",
    content:
      "FlexUI components are designed with a dark-first approach. All components look great on dark backgrounds out of the box.",
  },
];

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <Accordion items={items} className="max-w-lg" />
    </div>
  );
}
