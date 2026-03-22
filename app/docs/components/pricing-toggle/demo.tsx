"use client";

import React, { useState } from "react";
import { PricingToggle } from "@/components/flexui/pricing-toggle";

export function ComponentDemo() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-6 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <PricingToggle isYearly={isYearly} onChange={setIsYearly} />
      <p className="text-sm text-zinc-500">
        Current plan: <span className="text-white">{isYearly ? "Yearly" : "Monthly"}</span>
        {isYearly && <span className="ml-2 text-emerald-400">(20% off)</span>}
      </p>
    </div>
  );
}
