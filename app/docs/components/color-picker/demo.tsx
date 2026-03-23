"use client";

import React, { useState } from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { ColorPicker } from "@/components/flexui/color-picker";

function ColorPickerPreview() {
  const [color, setColor] = useState("#8b5cf6");
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 p-8">
      <ColorPicker value={color} onChange={setColor} />
      <p className="text-sm text-zinc-400">
        Selected: <code className="text-purple-400">{color}</code>
      </p>
    </div>
  );
}

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={<ColorPickerPreview />}
      code={`import { ColorPicker } from "@/components/flexui/color-picker";

export function Demo() {
  const [color, setColor] = useState("#8b5cf6");

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
    />
  );
}`}
      filename="color-picker-demo.tsx"
    />
  );
}
