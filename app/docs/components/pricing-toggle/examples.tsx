"use client";

import React, { useState } from "react";
import { PricingToggle } from "@/components/flexui/pricing-toggle";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

function PricingToggleDefault() {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <PricingToggle isYearly={isYearly} onChange={setIsYearly} />
      <p className="text-sm text-zinc-500">
        Plan: <span className="text-white">{isYearly ? "Yearly" : "Monthly"}</span>
      </p>
    </div>
  );
}

function PricingToggleWithPrice() {
  const [isYearly, setIsYearly] = useState(true);
  const price = isYearly ? "$99/yr" : "$9/mo";
  return (
    <div className="flex flex-col items-center gap-4">
      <PricingToggle isYearly={isYearly} onChange={setIsYearly} />
      <p className="text-3xl font-bold text-white">{price}</p>
      <p className="text-xs text-zinc-500">
        {isYearly ? "Billed annually" : "Billed monthly"}
      </p>
    </div>
  );
}

function PricingToggleStyled() {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <PricingToggle
        isYearly={isYearly}
        onChange={setIsYearly}
        className="gap-4 rounded-full border border-white/10 bg-zinc-900 px-5 py-2.5"
      />
    </div>
  );
}

function PricingToggleCards() {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <div className="flex flex-col items-center gap-6">
      <PricingToggle isYearly={isYearly} onChange={setIsYearly} />
      <div className="flex gap-4">
        {[
          { name: "Starter", monthly: 9, yearly: 90 },
          { name: "Pro", monthly: 29, yearly: 290 },
        ].map((plan) => (
          <div
            key={plan.name}
            className="rounded-xl border border-white/[0.08] bg-zinc-900/50 p-5 text-center w-36"
          >
            <p className="text-sm font-medium text-zinc-400">{plan.name}</p>
            <p className="mt-2 text-2xl font-bold text-white">
              ${isYearly ? plan.yearly : plan.monthly}
            </p>
            <p className="text-xs text-zinc-500">
              {isYearly ? "/year" : "/month"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const examples = [
  {
    id: "pt-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "The default toggle switching between Monthly and Yearly plans.",
    preview: <PricingToggleDefault />,
    code: `const [isYearly, setIsYearly] = useState(false);

<PricingToggle isYearly={isYearly} onChange={setIsYearly} />`,
    filename: "default.tsx",
  },
  {
    id: "pt-with-price",
    title: "With Price Display",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Toggle paired with a dynamic price that updates based on the billing period.",
    preview: <PricingToggleWithPrice />,
    code: `const [isYearly, setIsYearly] = useState(true);
const price = isYearly ? "$99/yr" : "$9/mo";

<PricingToggle isYearly={isYearly} onChange={setIsYearly} />
<p className="text-3xl font-bold text-white">{price}</p>
<p className="text-xs text-zinc-500">
  {isYearly ? "Billed annually" : "Billed monthly"}
</p>`,
    filename: "with-price.tsx",
  },
  {
    id: "pt-styled",
    title: "Custom Styled",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Wrapped in a pill-shaped container with custom padding and border.",
    preview: <PricingToggleStyled />,
    code: `<PricingToggle
  isYearly={isYearly}
  onChange={setIsYearly}
  className="gap-4 rounded-full border border-white/10 bg-zinc-900 px-5 py-2.5"
/>`,
    filename: "styled.tsx",
  },
  {
    id: "pt-cards",
    title: "With Pricing Cards",
    tag: "Layout",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "Toggle controlling a set of pricing cards that update dynamically.",
    preview: <PricingToggleCards />,
    code: `const [isYearly, setIsYearly] = useState(false);

<PricingToggle isYearly={isYearly} onChange={setIsYearly} />
<div className="flex gap-4">
  {[
    { name: "Starter", monthly: 9, yearly: 90 },
    { name: "Pro", monthly: 29, yearly: 290 },
  ].map((plan) => (
    <div key={plan.name} className="rounded-xl border border-white/[0.08] bg-zinc-900/50 p-5 text-center w-36">
      <p className="text-sm font-medium text-zinc-400">{plan.name}</p>
      <p className="mt-2 text-2xl font-bold text-white">
        \${isYearly ? plan.yearly : plan.monthly}
      </p>
      <p className="text-xs text-zinc-500">{isYearly ? "/year" : "/month"}</p>
    </div>
  ))}
</div>`,
    filename: "with-cards.tsx",
  },
];

export function PricingToggleExamples() {
  return <ShowcaseGrid items={examples} />;
}
