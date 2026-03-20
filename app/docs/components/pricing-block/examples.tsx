"use client";

import React from "react";
import { PricingBlock } from "@/components/flexui/pricing-block";

function TwoTierExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <PricingBlock
        tiers={[
          {
            name: "Free",
            price: { monthly: 0, yearly: 0 },
            description: "Get started with the basics.",
            features: [
              "5 projects",
              "Basic support",
              "1 GB storage",
            ],
          },
          {
            name: "Pro",
            price: { monthly: 19, yearly: 182 },
            description: "Everything you need to scale.",
            features: [
              "Unlimited projects",
              "Priority support",
              "100 GB storage",
              "Custom domains",
            ],
            highlighted: true,
            cta: "Upgrade to Pro",
          },
        ]}
      />
    </div>
  );
}

function SingleHighlightExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <PricingBlock
        tiers={[
          {
            name: "Hobby",
            price: { monthly: 0, yearly: 0 },
            description: "Perfect for personal projects.",
            features: [
              "3 active projects",
              "Community forum",
              "500 MB storage",
            ],
            cta: "Get Started",
          },
          {
            name: "Team",
            price: { monthly: 49, yearly: 470 },
            description: "Collaborate with your team.",
            features: [
              "Unlimited projects",
              "Team workspaces",
              "25 GB per member",
              "Priority email support",
              "API access",
            ],
            highlighted: true,
            cta: "Start Free Trial",
          },
          {
            name: "Business",
            price: { monthly: 149, yearly: 1430 },
            description: "Advanced features for organizations.",
            features: [
              "Everything in Team",
              "SSO authentication",
              "Audit logs",
              "Dedicated account manager",
              "Custom contracts",
              "99.9% uptime SLA",
            ],
            cta: "Contact Sales",
          },
        ]}
      />
    </div>
  );
}

export function PricingBlockExamples() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <TwoTierExample />
        <p className="text-xs text-zinc-500">Two tiers — Free and Pro</p>
      </div>
      <div className="flex flex-col gap-3">
        <SingleHighlightExample />
        <p className="text-xs text-zinc-500">Three tiers with custom CTA labels</p>
      </div>
    </div>
  );
}
