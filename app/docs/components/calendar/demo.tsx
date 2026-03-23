"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/flexui/calendar";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

function Demo() {
  const [selected, setSelected] = useState<Date>(new Date());

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar selected={selected} onChange={setSelected} />
      <p className="text-sm text-zinc-400">
        Selected:{" "}
        <span className="font-medium text-white">
          {selected.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </p>
    </div>
  );
}

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex min-h-[200px] items-center justify-center p-8">
          <Demo />
        </div>
      }
      code={`import { useState } from "react";
import { Calendar } from "@/components/flexui/calendar";

export function Demo() {
  const [selected, setSelected] = useState<Date>(new Date());

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar selected={selected} onChange={setSelected} />
      <p className="text-sm text-zinc-400">
        Selected: <span className="font-medium text-white">
          {selected.toLocaleDateString("en-US", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
          })}
        </span>
      </p>
    </div>
  );
}`}
      filename="calendar-demo.tsx"
    />
  );
}
