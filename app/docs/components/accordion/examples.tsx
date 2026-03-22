"use client";

import React from "react";
import { Accordion } from "@/components/flexui/accordion";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const faqItems = [
  { title: "What is FlexUI?", content: "FlexUI is a modern React component library built with Tailwind CSS and Framer Motion." },
  { title: "Is it free?", content: "Yes, FlexUI is completely free and open source." },
  { title: "How do I install it?", content: "Run npx flexui add <component> to install individual components." },
];

const settingsItems = [
  { title: "Account Settings", content: "Manage your email, password, and two-factor authentication preferences." },
  { title: "Notification Preferences", content: "Configure push notifications, email digests, and alert thresholds." },
  { title: "Privacy & Security", content: "Control data sharing, session management, and connected applications." },
  { title: "Billing & Plans", content: "View your current plan, update payment methods, and download invoices." },
];

const examples = [
  {
    id: "accordion-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Single-panel accordion with spring-based expand and collapse animations.",
    preview: <Accordion items={faqItems} className="max-w-lg" />,
    code: `const items = [
  { title: "What is FlexUI?", content: "FlexUI is a modern React component library." },
  { title: "Is it free?", content: "Yes, completely free and open source." },
  { title: "How do I install it?", content: "Run npx flexui add <component>." },
];

<Accordion items={items} />`,
    filename: "default.tsx",
  },
  {
    id: "accordion-multiple",
    title: "Multiple Open Panels",
    tag: "Prop",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Allow multiple panels to stay open simultaneously with the allowMultiple prop.",
    preview: <Accordion items={faqItems} allowMultiple className="max-w-lg" />,
    code: `<Accordion
  items={items}
  allowMultiple
/>`,
    filename: "multiple.tsx",
  },
  {
    id: "accordion-styled",
    title: "Bordered Variant",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Custom bordered and padded styling for a card-like appearance.",
    preview: (
      <Accordion
        items={settingsItems}
        className="max-w-lg rounded-xl border border-white/[0.08] bg-zinc-900/50 px-5"
      />
    ),
    code: `<Accordion
  items={settingsItems}
  className="rounded-xl border border-white/[0.08] bg-zinc-900/50 px-5"
/>`,
    filename: "bordered.tsx",
  },
  {
    id: "accordion-rich-content",
    title: "Rich Content",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Pass any ReactNode as content including nested elements and formatted text.",
    preview: (
      <Accordion
        items={[
          {
            title: "Getting Started",
            content: (
              <div className="space-y-2">
                <p>Follow these steps to set up your project:</p>
                <ol className="list-decimal list-inside space-y-1 text-white/50">
                  <li>Install dependencies with <code className="rounded bg-white/10 px-1 text-xs">npm install</code></li>
                  <li>Import the component</li>
                  <li>Add it to your page</li>
                </ol>
              </div>
            ),
          },
          {
            title: "Configuration",
            content: (
              <div className="space-y-2">
                <p>Customize the component with these options:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400">allowMultiple</span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">className</span>
                  <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-xs text-purple-400">items</span>
                </div>
              </div>
            ),
          },
        ]}
        allowMultiple
        className="max-w-lg"
      />
    ),
    code: `<Accordion
  items={[
    {
      title: "Getting Started",
      content: (
        <div className="space-y-2">
          <p>Follow these steps to set up your project:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Install dependencies</li>
            <li>Import the component</li>
            <li>Add it to your page</li>
          </ol>
        </div>
      ),
    },
    {
      title: "Configuration",
      content: (
        <div className="space-y-2">
          <p>Customize with these options:</p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400">allowMultiple</span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">className</span>
          </div>
        </div>
      ),
    },
  ]}
  allowMultiple
/>`,
    filename: "rich-content.tsx",
  },
];

export function AccordionExamples() {
  return <ShowcaseGrid items={examples} />;
}
