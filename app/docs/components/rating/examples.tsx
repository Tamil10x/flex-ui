"use client";

import React, { useState } from "react";
import { Rating } from "@/components/flexui/rating";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

function RatingInteractive() {
  const [value, setValue] = useState(3);
  return (
    <div className="flex flex-col items-center gap-3">
      <Rating value={value} onChange={setValue} />
      <p className="text-sm text-zinc-500">
        You rated: <span className="text-white font-semibold">{value}/5</span>
      </p>
    </div>
  );
}

function RatingLarge() {
  const [value, setValue] = useState(4);
  return (
    <div className="flex flex-col items-center gap-3">
      <Rating value={value} onChange={setValue} size={40} />
      <p className="text-sm text-zinc-500">
        <span className="text-white font-semibold">{value}</span> out of 5 stars
      </p>
    </div>
  );
}

function RatingTenScale() {
  const [value, setValue] = useState(7);
  return (
    <div className="flex flex-col items-center gap-3">
      <Rating value={value} onChange={setValue} max={10} size={20} />
      <p className="text-sm text-zinc-500">
        Score: <span className="text-white font-semibold">{value}/10</span>
      </p>
    </div>
  );
}

const examples = [
  {
    id: "rt-interactive",
    title: "Interactive Rating",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Click on any star to select a rating. Hover to preview before confirming.",
    preview: <RatingInteractive />,
    code: `const [value, setValue] = useState(3);

<Rating value={value} onChange={setValue} />`,
    filename: "interactive.tsx",
  },
  {
    id: "rt-readonly",
    title: "Read-Only Display",
    tag: "State",
    tagColor: "bg-red-500/10 text-red-400",
    description: "Display a fixed rating without interaction by omitting the onChange prop.",
    preview: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <Rating value={5} />
          <span className="text-sm text-zinc-400">5.0 - Excellent</span>
        </div>
        <div className="flex items-center gap-3">
          <Rating value={3} />
          <span className="text-sm text-zinc-400">3.0 - Average</span>
        </div>
        <div className="flex items-center gap-3">
          <Rating value={1} />
          <span className="text-sm text-zinc-400">1.0 - Poor</span>
        </div>
      </div>
    ),
    code: `{/* Read-only: omit onChange */}
<Rating value={5} />
<Rating value={3} />
<Rating value={1} />`,
    filename: "readonly.tsx",
  },
  {
    id: "rt-large",
    title: "Large Stars",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Increase the star size for prominent rating displays and hero sections.",
    preview: <RatingLarge />,
    code: `const [value, setValue] = useState(4);

<Rating value={value} onChange={setValue} size={40} />`,
    filename: "large.tsx",
  },
  {
    id: "rt-ten-star",
    title: "10-Star Scale",
    tag: "Config",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "Use a custom max value for granular rating scales beyond the default 5.",
    preview: <RatingTenScale />,
    code: `const [value, setValue] = useState(7);

<Rating value={value} onChange={setValue} max={10} size={20} />`,
    filename: "ten-star.tsx",
  },
];

export function RatingExamples() {
  return <ShowcaseGrid items={examples} />;
}
