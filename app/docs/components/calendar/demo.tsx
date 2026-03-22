"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/flexui/calendar";

export function ComponentDemo() {
  const [selected, setSelected] = useState<Date>(new Date());

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
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
