"use client";
import React from "react";
import { LogoCloudBlock } from "@/components/flexui/logo-cloud-block";

const logos = [{ name: "Vercel" }, { name: "Stripe" }, { name: "Shopify" }, { name: "Linear" }, { name: "Notion" }, { name: "Figma" }, { name: "GitHub" }, { name: "Slack" }];

function MarqueeExample() {
  return (<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950"><LogoCloudBlock logos={logos} heading="Trusted by the best" variant="marquee" /></div>);
}
function GridExample() {
  return (<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950"><LogoCloudBlock logos={logos.slice(0, 6)} heading="Our Partners" variant="grid" /></div>);
}

export function LogoCloudBlockExamples() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3"><MarqueeExample /><p className="text-xs text-zinc-500">Marquee — infinite scrolling with dual rows</p></div>
      <div className="flex flex-col gap-3"><GridExample /><p className="text-xs text-zinc-500">Grid — static centered layout</p></div>
    </div>
  );
}
