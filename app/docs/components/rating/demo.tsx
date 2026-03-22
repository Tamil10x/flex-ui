"use client";

import React, { useState } from "react";
import { Rating } from "@/components/flexui/rating";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const demoCode = `import { Rating } from "@/components/flexui/rating";
import { useState } from "react";

const [value, setValue] = useState(3);

{/* Interactive */}
<Rating value={value} onChange={setValue} />

{/* Read-only, larger */}
<Rating value={4} size={32} />`;

function RatingPreview() {
  const [value, setValue] = useState(3);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-zinc-400">Interactive (click to rate)</p>
        <Rating value={value} onChange={setValue} />
        <p className="text-sm text-zinc-500">
          You rated: <span className="text-white">{value}/5</span>
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-zinc-400">Read-only (size 32)</p>
        <Rating value={4} size={32} />
      </div>
    </div>
  );
}

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={<RatingPreview />}
      code={demoCode}
      filename="rating-demo.tsx"
    />
  );
}
