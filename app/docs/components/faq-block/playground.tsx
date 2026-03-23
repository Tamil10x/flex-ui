"use client";

import React from "react";
import { FAQBlock } from "@/components/flexui/faq-block";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const faqItems = [
  { question: "Is FlexUI free to use?", answer: "Yes, FlexUI is completely free and open source under the MIT license." },
  { question: "Does it work with Next.js?", answer: "Absolutely. FlexUI is built for Next.js App Router with full RSC compatibility." },
  { question: "Can I customize the themes?", answer: "Yes, every component respects semantic design tokens that you can override globally." },
  { question: "How do I install components?", answer: "Use our CLI: npx flexui add <component-name>. It handles dependencies automatically." },
];

const code = `import { FAQBlock } from "@/components/flexui/faq-block";

const items = [
  { question: "Is FlexUI free?", answer: "Yes, it's MIT licensed." },
  { question: "Does it work with Next.js?", answer: "Yes, built for App Router." },
];

export function Demo() {
  return <FAQBlock items={items} />;
}`;

export function FAQBlockPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">Click a question to expand the answer with a smooth animation.</p>
      <PreviewCodeTabs
        preview={<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950"><FAQBlock items={faqItems} /></div>}
        code={code}
        filename="faq-block-demo.tsx"
      />
    </div>
  );
}
