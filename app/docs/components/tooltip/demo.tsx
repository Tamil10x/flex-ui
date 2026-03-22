"use client";

import React from "react";
import { Tooltip } from "@/components/flexui/tooltip";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const demoCode = `import { Tooltip } from "@/components/flexui/tooltip";

export function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <Tooltip content="Tooltip on top" side="top">
        <button>Top</button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" side="bottom">
        <button>Bottom</button>
      </Tooltip>
      <Tooltip content="Tooltip on left" side="left">
        <button>Left</button>
      </Tooltip>
      <Tooltip content="Tooltip on right" side="right">
        <button>Right</button>
      </Tooltip>
    </div>
  );
}`;

const btnClass = "rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10";

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex flex-wrap items-center justify-center gap-8">
          <Tooltip content="Tooltip on top" side="top">
            <button className={btnClass}>Top</button>
          </Tooltip>
          <Tooltip content="Tooltip on bottom" side="bottom">
            <button className={btnClass}>Bottom</button>
          </Tooltip>
          <Tooltip content="Tooltip on left" side="left">
            <button className={btnClass}>Left</button>
          </Tooltip>
          <Tooltip content="Tooltip on right" side="right">
            <button className={btnClass}>Right</button>
          </Tooltip>
        </div>
      }
      code={demoCode}
      filename="tooltip-demo.tsx"
    />
  );
}
