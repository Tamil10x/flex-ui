"use client";

import React, { useState } from "react";
import { ColorPicker } from "@/components/flexui/color-picker";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

function BrandPalette() {
  const [color, setColor] = useState("#1a1a2e");
  return (
    <div className="flex flex-col items-center gap-3">
      <ColorPicker
        value={color}
        onChange={setColor}
        presets={["#1a1a2e", "#16213e", "#0f3460", "#533483", "#e94560"]}
      />
      <p className="text-xs text-zinc-500">
        Brand: <code className="text-purple-400">{color}</code>
      </p>
    </div>
  );
}

function MinimalPicker() {
  const [color, setColor] = useState("#3b82f6");
  return (
    <div className="flex flex-col items-center gap-3">
      <ColorPicker
        value={color}
        onChange={setColor}
        presets={["#000000", "#ffffff", "#ef4444", "#3b82f6", "#22c55e"]}
        className="w-48"
      />
      <p className="text-xs text-zinc-500">
        Minimal: <code className="text-blue-400">{color}</code>
      </p>
    </div>
  );
}

function DefaultPicker() {
  const [color, setColor] = useState("#8b5cf6");
  return (
    <div className="flex flex-col items-center gap-3">
      <ColorPicker value={color} onChange={setColor} />
      <p className="text-xs text-zinc-500">
        Selected: <code className="text-purple-400">{color}</code>
      </p>
    </div>
  );
}

function WarmPalette() {
  const [color, setColor] = useState("#f97316");
  return (
    <div className="flex flex-col items-center gap-3">
      <ColorPicker
        value={color}
        onChange={setColor}
        presets={["#fef3c7", "#fde68a", "#fbbf24", "#f59e0b", "#f97316", "#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d"]}
      />
      <p className="text-xs text-zinc-500">
        Warm: <code className="text-orange-400">{color}</code>
      </p>
    </div>
  );
}

const examples = [
  {
    id: "cp-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "The default color picker with the built-in preset palette.",
    preview: <DefaultPicker />,
    code: `const [color, setColor] = useState("#8b5cf6");

<ColorPicker value={color} onChange={setColor} />`,
    filename: "default.tsx",
  },
  {
    id: "cp-brand",
    title: "Brand Palette",
    tag: "Custom",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Custom preset swatches matching a dark brand color scheme.",
    preview: <BrandPalette />,
    code: `const [color, setColor] = useState("#1a1a2e");

<ColorPicker
  value={color}
  onChange={setColor}
  presets={["#1a1a2e", "#16213e", "#0f3460", "#533483", "#e94560"]}
/>`,
    filename: "brand-palette.tsx",
  },
  {
    id: "cp-minimal",
    title: "Minimal Picker",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "A narrow picker with only 5 essential preset colors.",
    preview: <MinimalPicker />,
    code: `const [color, setColor] = useState("#3b82f6");

<ColorPicker
  value={color}
  onChange={setColor}
  presets={["#000000", "#ffffff", "#ef4444", "#3b82f6", "#22c55e"]}
  className="w-48"
/>`,
    filename: "minimal.tsx",
  },
  {
    id: "cp-warm",
    title: "Warm Gradient Palette",
    tag: "Theme",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "A warm-toned palette ranging from cream to deep red.",
    preview: <WarmPalette />,
    code: `const [color, setColor] = useState("#f97316");

<ColorPicker
  value={color}
  onChange={setColor}
  presets={[
    "#fef3c7", "#fde68a", "#fbbf24", "#f59e0b", "#f97316",
    "#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d",
  ]}
/>`,
    filename: "warm-palette.tsx",
  },
];

export function ColorPickerExamples() {
  return <ShowcaseGrid items={examples} />;
}
