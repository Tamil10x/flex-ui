"use client";

import React, { useState } from "react";
import { Slider } from "@/components/flexui/slider";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const demoCode = `import { Slider } from "@/components/flexui/slider";
import { useState } from "react";

const [val1, setVal1] = useState(50);
const [val2, setVal2] = useState(25);

<Slider value={val1} onChange={setVal1} />
<Slider value={val2} onChange={setVal2} min={0} max={100} step={5} color="#8b5cf6" />`;

function SliderPreview() {
  const [val1, setVal1] = useState(50);
  const [val2, setVal2] = useState(25);

  return (
    <div className="w-full max-w-sm space-y-6">
      <div>
        <div className="mb-2 flex justify-between text-xs text-zinc-400">
          <span>Volume</span>
          <span className="text-white">{val1}</span>
        </div>
        <Slider value={val1} onChange={setVal1} />
      </div>
      <div>
        <div className="mb-2 flex justify-between text-xs text-zinc-400">
          <span>Brightness</span>
          <span className="text-white">{val2}%</span>
        </div>
        <Slider value={val2} onChange={setVal2} min={0} max={100} step={5} color="#8b5cf6" />
      </div>
    </div>
  );
}

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={<SliderPreview />}
      code={demoCode}
      filename="slider-demo.tsx"
    />
  );
}
