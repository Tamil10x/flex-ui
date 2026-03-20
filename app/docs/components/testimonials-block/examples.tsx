"use client";

import React from "react";
import { TestimonialsBlock } from "@/components/flexui/testimonials-block";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

// ─── Grid Example ───────────────────────────────────────────────────────────

const gridTestimonials = [
  {
    quote:
      "The masonry layout automatically adjusts to different card heights. Beautiful and responsive.",
    author: "Liam O'Brien",
    role: "Design Lead, Figma",
  },
  {
    quote: "Staggered fade-in animations make the page feel alive.",
    author: "Nina Patel",
    role: "Frontend Dev, Shopify",
  },
  {
    quote:
      "Glass-morphic cards with star ratings. Exactly what our SaaS landing page needed.",
    author: "Carlos Ruiz",
    role: "Founder, Buildspace",
  },
];

function GridExample() {
  return (
    <div className="w-full p-4">
      <TestimonialsBlock testimonials={gridTestimonials} variant="grid" />
    </div>
  );
}

// ─── Marquee Example ────────────────────────────────────────────────────────

const marqueeTestimonials = [
  {
    quote: "Smooth horizontal scrolling that pauses on hover. Very polished.",
    author: "Aisha Khan",
    role: "Product Manager, Notion",
  },
  {
    quote: "The fade edges on the marquee give it a premium feel.",
    author: "Tom Hardy",
    role: "CTO, Railway",
  },
  {
    quote: "Works beautifully on mobile with touch scrolling.",
    author: "Yuki Tanaka",
    role: "Mobile Lead, Discord",
  },
  {
    quote: "We use the marquee variant for our homepage hero section.",
    author: "Priya Sharma",
    role: "Designer, Supabase",
  },
];

function MarqueeExample() {
  return (
    <div className="w-full overflow-hidden p-4">
      <TestimonialsBlock
        testimonials={marqueeTestimonials}
        variant="marquee"
      />
    </div>
  );
}

// ─── With Avatars Example ───────────────────────────────────────────────────

const avatarTestimonials = [
  {
    quote: "The initials fallback for avatars is a nice touch.",
    author: "Alex Rivera",
    role: "Engineering Manager, GitHub",
    avatar: "https://i.pravatar.cc/80?img=1",
  },
  {
    quote: "Gradient avatar circles look great when no image is provided.",
    author: "Sophie Laurent",
    role: "VP Design, Spotify",
    avatar: "https://i.pravatar.cc/80?img=5",
  },
  {
    quote: "Love how it handles missing avatars gracefully.",
    author: "Ryan Peters",
    role: "Staff Engineer, Netflix",
  },
];

function AvatarsExample() {
  return (
    <div className="w-full p-4">
      <TestimonialsBlock testimonials={avatarTestimonials} variant="grid" />
    </div>
  );
}

// ─── Showcase items ─────────────────────────────────────────────────────────

const examples = [
  {
    id: "tb-grid",
    title: "Grid Layout",
    tag: "Default",
    tagColor: "bg-zinc-800 text-zinc-400 border-zinc-700",
    description: "Masonry-style 2-3 column grid with staggered fade-in animations.",
    preview: <GridExample />,
    code: `<TestimonialsBlock
  testimonials={testimonials}
  variant="grid"
/>`,
    filename: "grid-layout.tsx",
  },
  {
    id: "tb-marquee",
    title: "Marquee Scroll",
    tag: "Marquee",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    description: "Horizontally scrolling cards with fade edges and hover-pause.",
    span: "2" as const,
    preview: <MarqueeExample />,
    code: `<TestimonialsBlock
  testimonials={testimonials}
  variant="marquee"
/>`,
    filename: "marquee-scroll.tsx",
  },
  {
    id: "tb-avatars",
    title: "With Avatars",
    tag: "Custom",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    description: "Testimonials with avatar images and gradient initials fallback.",
    preview: <AvatarsExample />,
    code: `const testimonials = [
  {
    quote: "Great product!",
    author: "Alex Rivera",
    role: "Engineer, GitHub",
    avatar: "https://i.pravatar.cc/80?img=1",
  },
  {
    quote: "Love it!",
    author: "Ryan Peters",
    role: "Staff Engineer, Netflix",
    // no avatar — shows gradient initials
  },
];

<TestimonialsBlock testimonials={testimonials} />`,
    filename: "with-avatars.tsx",
  },
];

export function TestimonialsBlockExamples() {
  return <ShowcaseGrid items={examples} />;
}
