"use client";

import React, { useState } from "react";
import { TestimonialsBlock } from "@/components/flexui/testimonials-block";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const sampleTestimonials = [
  {
    quote:
      "FlexUI completely transformed our landing page. The animations are buttery smooth and our conversion rate went up 30%.",
    author: "Sarah Chen",
    role: "Head of Product, Acme Inc.",
  },
  {
    quote:
      "I replaced three separate animation libraries with FlexUI. The developer experience is unmatched.",
    author: "Marcus Johnson",
    role: "Senior Engineer, Vercel",
  },
  {
    quote:
      "The glassmorphic design language is exactly what our SaaS needed. Customers love the modern feel.",
    author: "Emily Park",
    role: "CEO, NovaTech",
  },
  {
    quote:
      "Staggered animations out of the box with zero config. This is how component libraries should work.",
    author: "David Kim",
    role: "Frontend Lead, Stripe",
  },
  {
    quote:
      "We shipped our marketing site in half the time. The pre-built blocks saved us weeks of work.",
    author: "Ava Martinez",
    role: "Design Engineer, Linear",
  },
  {
    quote:
      "Best component library I have used in 10 years of web development. Period.",
    author: "James Wright",
    role: "CTO, Raycast",
  },
];

const code = `"use client";
import { TestimonialsBlock } from "@/components/flexui/testimonials-block";

const testimonials = [
  {
    quote: "FlexUI completely transformed our landing page.",
    author: "Sarah Chen",
    role: "Head of Product, Acme Inc.",
  },
  {
    quote: "I replaced three separate animation libraries with FlexUI.",
    author: "Marcus Johnson",
    role: "Senior Engineer, Vercel",
  },
  {
    quote: "The glassmorphic design language is exactly what we needed.",
    author: "Emily Park",
    role: "CEO, NovaTech",
  },
];

// Grid variant (default)
<TestimonialsBlock testimonials={testimonials} />

// Marquee variant
<TestimonialsBlock testimonials={testimonials} variant="marquee" />`;

export function TestimonialsBlockPlayground() {
  const [variant, setVariant] = useState<"grid" | "marquee">("grid");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setVariant("grid")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            variant === "grid"
              ? "bg-white/10 text-white"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Grid
        </button>
        <button
          onClick={() => setVariant("marquee")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            variant === "marquee"
              ? "bg-white/10 text-white"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Marquee
        </button>
      </div>
      <PreviewCodeTabs
        preview={
          <div className="w-full overflow-hidden p-4">
            <TestimonialsBlock
              testimonials={sampleTestimonials}
              variant={variant}
            />
          </div>
        }
        code={code}
        filename="testimonials-block-demo.tsx"
      />
    </div>
  );
}
