"use client";

import React from "react";
import { TeamBlock } from "@/components/flexui/team-block";

const team = [
  { name: "Alex Kim", role: "Frontend Engineer" },
  { name: "Jordan Lee", role: "Backend Engineer" },
  { name: "Taylor Brooks", role: "DevOps Lead" },
  { name: "Casey Jones", role: "Product Designer" },
];

function ThreeColExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <TeamBlock members={team.slice(0, 3)} heading="Our Team" subtitle="The people behind the product." />
    </div>
  );
}

function FourColExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <TeamBlock members={team} heading="Engineering" columns={4} />
    </div>
  );
}

export function TeamBlockExamples() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3"><ThreeColExample /><p className="text-xs text-zinc-500">3-column layout with subtitle</p></div>
      <div className="flex flex-col gap-3"><FourColExample /><p className="text-xs text-zinc-500">4-column grid</p></div>
    </div>
  );
}
