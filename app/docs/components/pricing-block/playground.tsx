"use client";

import React from "react";
import { PricingBlock } from "@/components/flexui/pricing-block";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const defaultTiers = [
  {
    name: "Starter",
    price: { monthly: 0, yearly: 0 },
    description: "For individuals and side projects.",
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Community support",
      "1 GB storage",
    ],
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: { monthly: 29, yearly: 278 },
    description: "For growing teams and businesses.",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "50 GB storage",
      "Custom domains",
      "Team collaboration",
    ],
    highlighted: true,
    cta: "Start Trial",
  },
  {
    name: "Enterprise",
    price: { monthly: 99, yearly: 950 },
    description: "For large organizations at scale.",
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "99.99% SLA",
      "Unlimited storage",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Sales",
  },
];

const code = `import { PricingBlock } from "@/components/flexui/pricing-block";

const tiers = [
  {
    name: "Starter",
    price: { monthly: 0, yearly: 0 },
    description: "For individuals and side projects.",
    features: ["Up to 3 projects", "Basic analytics", "Community support"],
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: { monthly: 29, yearly: 278 },
    description: "For growing teams and businesses.",
    features: ["Unlimited projects", "Advanced analytics", "Priority support", "50 GB storage"],
    highlighted: true,
    cta: "Start Trial",
  },
  {
    name: "Enterprise",
    price: { monthly: 99, yearly: 950 },
    description: "For large organizations at scale.",
    features: ["Everything in Pro", "SSO & SAML", "99.99% SLA", "Unlimited storage"],
    cta: "Contact Sales",
  },
];

export function Demo() {
  return <PricingBlock tiers={tiers} />;
}`;

export function PricingBlockPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Toggle between monthly and yearly billing. The price counter animates
        between values. The highlighted tier gets a gradient border and
        &ldquo;Popular&rdquo; badge.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
            <PricingBlock tiers={defaultTiers} />
          </div>
        }
        code={code}
        filename="pricing-block-demo.tsx"
      />
    </div>
  );
}
