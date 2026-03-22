"use client";

import React from "react";
import { ImageCompare } from "@/components/flexui/image-compare";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "ic-default",
    title: "Landscape Photo",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Before/after comparison of a landscape photo with desaturation effect.",
    preview: (
      <ImageCompare
        before="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop&q=80&sat=-100"
        after="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop&q=80"
        className="max-w-lg"
      />
    ),
    code: `<ImageCompare
  before="/images/landscape-bw.jpg"
  after="/images/landscape-color.jpg"
  className="max-w-lg"
/>`,
    filename: "default.tsx",
  },
  {
    id: "ic-city",
    title: "City Architecture",
    tag: "Photo",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Compare a city photo in grayscale versus full color.",
    preview: (
      <ImageCompare
        before="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&q=80&sat=-100"
        after="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&q=80"
        className="max-w-lg"
      />
    ),
    code: `<ImageCompare
  before="/images/city-grayscale.jpg"
  after="/images/city-color.jpg"
  className="max-w-lg"
/>`,
    filename: "city.tsx",
  },
  {
    id: "ic-compact",
    title: "Compact Size",
    tag: "Style",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "A smaller, constrained comparison slider with rounded corners.",
    preview: (
      <ImageCompare
        before="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop&q=80&sat=-100"
        after="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop&q=80"
        className="max-w-xs rounded-2xl"
      />
    ),
    code: `<ImageCompare
  before="/images/nature-bw.jpg"
  after="/images/nature-color.jpg"
  className="max-w-xs rounded-2xl"
/>`,
    filename: "compact.tsx",
  },
  {
    id: "ic-wide",
    title: "Full Width",
    tag: "Layout",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "Stretch the slider to fill its container for full-bleed comparisons.",
    preview: (
      <ImageCompare
        before="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=350&fit=crop&q=80&sat=-100"
        after="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=350&fit=crop&q=80"
        className="w-full"
      />
    ),
    code: `<ImageCompare
  before="/images/forest-bw.jpg"
  after="/images/forest-color.jpg"
  className="w-full"
/>`,
    filename: "full-width.tsx",
  },
];

export function ImageCompareExamples() {
  return <ShowcaseGrid items={examples} />;
}
