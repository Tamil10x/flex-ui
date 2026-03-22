"use client";

import React, { useState } from "react";
import { Slider } from "@/components/flexui/slider";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

function SliderDefault() {
  const [value, setValue] = useState(50);
  return (
    <div className="w-full max-w-sm">
      <div className="mb-2 flex justify-between text-xs text-zinc-400">
        <span>Value</span>
        <span className="text-white">{value}</span>
      </div>
      <Slider value={value} onChange={setValue} />
    </div>
  );
}

function SliderColors() {
  const [v1, setV1] = useState(75);
  const [v2, setV2] = useState(50);
  const [v3, setV3] = useState(30);
  const [v4, setV4] = useState(90);
  return (
    <div className="w-full max-w-sm space-y-6">
      <div>
        <div className="mb-2 flex justify-between text-xs text-zinc-400">
          <span>Purple</span><span className="text-white">{v1}</span>
        </div>
        <Slider value={v1} onChange={setV1} color="#8b5cf6" />
      </div>
      <div>
        <div className="mb-2 flex justify-between text-xs text-zinc-400">
          <span>Emerald</span><span className="text-white">{v2}</span>
        </div>
        <Slider value={v2} onChange={setV2} color="#10b981" />
      </div>
      <div>
        <div className="mb-2 flex justify-between text-xs text-zinc-400">
          <span>Amber</span><span className="text-white">{v3}</span>
        </div>
        <Slider value={v3} onChange={setV3} color="#f59e0b" />
      </div>
      <div>
        <div className="mb-2 flex justify-between text-xs text-zinc-400">
          <span>Rose</span><span className="text-white">{v4}</span>
        </div>
        <Slider value={v4} onChange={setV4} color="#f43f5e" />
      </div>
    </div>
  );
}

function SliderStepped() {
  const [value, setValue] = useState(50);
  return (
    <div className="w-full max-w-sm">
      <div className="mb-2 flex justify-between text-xs text-zinc-400">
        <span>Step: 10</span>
        <span className="text-white">{value}</span>
      </div>
      <Slider value={value} onChange={setValue} step={10} color="#3b82f6" />
      <div className="mt-2 flex justify-between text-[10px] text-zinc-600">
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </div>
  );
}

function SliderRange() {
  const [value, setValue] = useState(350);
  return (
    <div className="w-full max-w-sm">
      <div className="mb-2 flex justify-between text-xs text-zinc-400">
        <span>Price range</span>
        <span className="text-white">${value}</span>
      </div>
      <Slider value={value} onChange={setValue} min={100} max={1000} step={50} color="#ec4899" />
      <div className="mt-2 flex justify-between text-[10px] text-zinc-600">
        <span>$100</span>
        <span>$1000</span>
      </div>
    </div>
  );
}

const examples = [
  {
    id: "sl-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A basic slider with white fill and real-time value display.",
    preview: <SliderDefault />,
    code: `const [value, setValue] = useState(50);

<Slider value={value} onChange={setValue} />`,
    filename: "default.tsx",
  },
  {
    id: "sl-colors",
    title: "Color Variants",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Custom fill and thumb colors to match different UI contexts.",
    preview: <SliderColors />,
    code: `<Slider value={v1} onChange={setV1} color="#8b5cf6" />
<Slider value={v2} onChange={setV2} color="#10b981" />
<Slider value={v3} onChange={setV3} color="#f59e0b" />
<Slider value={v4} onChange={setV4} color="#f43f5e" />`,
    filename: "colors.tsx",
  },
  {
    id: "sl-stepped",
    title: "Stepped Slider",
    tag: "Config",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Values snap to a step of 10 with tick marks for visual guidance.",
    preview: <SliderStepped />,
    code: `const [value, setValue] = useState(50);

<Slider value={value} onChange={setValue} step={10} color="#3b82f6" />`,
    filename: "stepped.tsx",
  },
  {
    id: "sl-custom-range",
    title: "Custom Range",
    tag: "Config",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "Custom min/max range for use cases like price selectors.",
    preview: <SliderRange />,
    code: `const [value, setValue] = useState(350);

<Slider
  value={value}
  onChange={setValue}
  min={100}
  max={1000}
  step={50}
  color="#ec4899"
/>`,
    filename: "custom-range.tsx",
  },
];

export function SliderExamples() {
  return <ShowcaseGrid items={examples} />;
}
