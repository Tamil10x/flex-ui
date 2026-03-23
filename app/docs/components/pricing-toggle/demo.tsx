"use client";

import React, { useState } from "react";
import { PricingToggle } from "@/components/flexui/pricing-toggle";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const demoCode = `import { PricingToggle } from "@/components/flexui/pricing-toggle";
import { useState } from "react";

const [isYearly, setIsYearly] = useState(false);

<PricingToggle isYearly={isYearly} onChange={setIsYearly} />`;

function PricingTogglePreview() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <PricingToggle isYearly={isYearly} onChange={setIsYearly} />
      <p className="text-sm text-zinc-500">
        Current plan: <span className="text-white">{isYearly ? "Yearly" : "Monthly"}</span>
        {isYearly && <span className="ml-2 text-emerald-400">(20% off)</span>}
      </p>
    </div>
  );
}

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={<PricingTogglePreview />}
      code={demoCode}
      filename="pricing-toggle-demo.tsx"
    />
  );
}
