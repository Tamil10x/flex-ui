"use client";

import React from "react";
import { FAQBlock } from "@/components/flexui/faq-block";

const items = [
  { question: "What is FlexUI?", answer: "FlexUI is a modern React component registry with 140+ animated components." },
  { question: "Is it free?", answer: "Yes, completely free and open source." },
  { question: "Does it support theming?", answer: "Yes, with 6 built-in theme presets and full customization." },
  { question: "What frameworks?", answer: "Next.js, Remix, Vite, and any React 18+ project." },
  { question: "Production ready?", answer: "Absolutely. All components are production-ready and tested." },
  { question: "How to get support?", answer: "Join our Discord community or open a GitHub issue." },
];

function SingleColumnExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <FAQBlock items={items.slice(0, 4)} heading="Common Questions" subtitle="Quick answers to help you get started." />
    </div>
  );
}

function TwoColumnExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <FAQBlock items={items} heading="FAQ" subtitle="Everything you need to know." layout="two-column" />
    </div>
  );
}

export function FAQBlockExamples() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3"><SingleColumnExample /><p className="text-xs text-zinc-500">Single column — default layout</p></div>
      <div className="flex flex-col gap-3"><TwoColumnExample /><p className="text-xs text-zinc-500">Two column — items split across columns</p></div>
    </div>
  );
}
