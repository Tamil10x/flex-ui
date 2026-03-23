"use client";

import React from "react";
import { NewsletterBlock } from "@/components/flexui/newsletter-block";

function DefaultExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950"><NewsletterBlock /></div>
  );
}

function CustomExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <NewsletterBlock heading="Join the waitlist" subtitle="Be the first to know when we launch." placeholder="your@email.com" buttonText="Join Now" successMessage="You're on the list!" />
    </div>
  );
}

export function NewsletterBlockExamples() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3"><DefaultExample /><p className="text-xs text-zinc-500">Default newsletter form</p></div>
      <div className="flex flex-col gap-3"><CustomExample /><p className="text-xs text-zinc-500">Custom text — waitlist variant</p></div>
    </div>
  );
}
