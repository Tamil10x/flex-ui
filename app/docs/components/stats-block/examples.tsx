"use client";

import React from "react";
import { StatsBlock } from "@/components/flexui/stats-block";

function FourStatsExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <StatsBlock heading="Platform Stats" stats={[{ value: "50M", label: "API Requests", suffix: "/mo" }, { value: "99.9", label: "Uptime", suffix: "%" }, { value: "150", label: "Countries" }, { value: "24/7", label: "Support" }]} />
    </div>
  );
}

function TwoStatsExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <StatsBlock stats={[{ value: "$2.5M", label: "Revenue" }, { value: "1,200", label: "Customers" }]} />
    </div>
  );
}

export function StatsBlockExamples() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3"><FourStatsExample /><p className="text-xs text-zinc-500">4-stat grid with heading</p></div>
      <div className="flex flex-col gap-3"><TwoStatsExample /><p className="text-xs text-zinc-500">2-stat minimal layout</p></div>
    </div>
  );
}
