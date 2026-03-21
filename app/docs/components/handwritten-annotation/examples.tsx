"use client";

import React from "react";
import { HandwrittenAnnotation } from "@/components/flexui/handwritten-annotation";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

// ── Circle around text ──────────────────────────────────────────────────────
function CircleExample() {
  return (
    <div className="flex min-h-[120px] items-center justify-center p-8">
      <p className="text-2xl font-bold text-white">
        We ship{" "}
        <HandwrittenAnnotation type="circle" color="#EF4444" once={false}>
          quality
        </HandwrittenAnnotation>{" "}
        software
      </p>
    </div>
  );
}

// ── Underline under heading ─────────────────────────────────────────────────
function UnderlineExample() {
  return (
    <div className="flex min-h-[120px] items-center justify-center p-8">
      <h3 className="text-2xl font-bold text-white">
        <HandwrittenAnnotation type="underline" color="#3B82F6" strokeWidth={2.5} once={false}>
          Getting Started
        </HandwrittenAnnotation>
      </h3>
    </div>
  );
}

// ── Highlight on a phrase ───────────────────────────────────────────────────
function HighlightExample() {
  return (
    <div className="flex min-h-[120px] items-center justify-center p-8">
      <p className="text-xl text-zinc-300">
        The{" "}
        <HandwrittenAnnotation type="highlight" color="#FBBF24" once={false}>
          key insight
        </HandwrittenAnnotation>{" "}
        is that simplicity wins.
      </p>
    </div>
  );
}

// ── Arrow pointing to content ───────────────────────────────────────────────
function ArrowExample() {
  return (
    <div className="flex min-h-[140px] items-center justify-center p-12">
      <p className="text-2xl font-bold text-white">
        <HandwrittenAnnotation type="arrow" color="#10B981" strokeWidth={2} once={false}>
          Look here!
        </HandwrittenAnnotation>
      </p>
    </div>
  );
}

// ── Bracket alongside text ──────────────────────────────────────────────────
function BracketExample() {
  return (
    <div className="flex min-h-[120px] items-center justify-center p-8">
      <p className="text-xl text-zinc-300">
        <HandwrittenAnnotation type="bracket" color="#8B5CF6" strokeWidth={2} once={false}>
          Important note here
        </HandwrittenAnnotation>
      </p>
    </div>
  );
}

// ── Strikethrough ───────────────────────────────────────────────────────────
function StrikethroughExample() {
  return (
    <div className="flex min-h-[120px] items-center justify-center p-8">
      <p className="text-xl text-zinc-300">
        <HandwrittenAnnotation type="strikethrough" color="#EF4444" once={false}>
          Old pricing: $99
        </HandwrittenAnnotation>{" "}
        <span className="ml-3 font-bold text-emerald-400">Now $49</span>
      </p>
    </div>
  );
}

const circleCode = `<HandwrittenAnnotation type="circle" color="#EF4444">
  quality
</HandwrittenAnnotation>`;

const underlineCode = `<HandwrittenAnnotation type="underline" color="#3B82F6" strokeWidth={2.5}>
  Getting Started
</HandwrittenAnnotation>`;

const highlightCode = `<HandwrittenAnnotation type="highlight" color="#FBBF24">
  key insight
</HandwrittenAnnotation>`;

const arrowCode = `<HandwrittenAnnotation type="arrow" color="#10B981" strokeWidth={2}>
  Look here!
</HandwrittenAnnotation>`;

const bracketCode = `<HandwrittenAnnotation type="bracket" color="#8B5CF6" strokeWidth={2}>
  Important note here
</HandwrittenAnnotation>`;

const strikethroughCode = `<HandwrittenAnnotation type="strikethrough" color="#EF4444">
  Old pricing: $99
</HandwrittenAnnotation>`;

const items = [
  {
    id: "circle",
    title: "Circle",
    tag: "Popular",
    tagColor: "red",
    description: "Draw an imperfect circle around important text.",
    preview: <CircleExample />,
    code: circleCode,
    filename: "circle-example.tsx",
  },
  {
    id: "underline",
    title: "Underline",
    description: "A wavy hand-drawn underline beneath content.",
    preview: <UnderlineExample />,
    code: underlineCode,
    filename: "underline-example.tsx",
  },
  {
    id: "highlight",
    title: "Highlight",
    description: "Semi-transparent marker highlight behind text.",
    preview: <HighlightExample />,
    code: highlightCode,
    filename: "highlight-example.tsx",
  },
  {
    id: "arrow",
    title: "Arrow",
    description: "A curved arrow pointing to the annotated text.",
    preview: <ArrowExample />,
    code: arrowCode,
    filename: "arrow-example.tsx",
  },
  {
    id: "bracket",
    title: "Bracket",
    description: "Curly brace alongside the text.",
    preview: <BracketExample />,
    code: bracketCode,
    filename: "bracket-example.tsx",
  },
  {
    id: "strikethrough",
    title: "Strikethrough",
    description: "Wavy line through the middle of text.",
    preview: <StrikethroughExample />,
    code: strikethroughCode,
    filename: "strikethrough-example.tsx",
  },
];

export function HandwrittenAnnotationExamples() {
  return <ShowcaseGrid items={items} />;
}
