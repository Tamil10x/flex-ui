"use client";

import React, { useState } from "react";
import { Stepper } from "@/components/flexui/stepper";

const steps = [
  { label: "Account", description: "Create your account" },
  { label: "Profile", description: "Set up your profile" },
  { label: "Preferences", description: "Choose your settings" },
  { label: "Complete", description: "All done!" },
];

export function ComponentDemo() {
  const [current, setCurrent] = useState(1);

  return (
    <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-8 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <Stepper steps={steps} currentStep={current} className="w-full max-w-xl" />
      <div className="flex gap-3">
        <button
          onClick={() => setCurrent((s) => Math.max(0, s - 1))}
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white hover:bg-white/10"
        >
          Back
        </button>
        <button
          onClick={() => setCurrent((s) => Math.min(steps.length - 1, s + 1))}
          className="rounded-lg bg-cyan-500 px-4 py-1.5 text-sm font-medium text-black hover:bg-cyan-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
