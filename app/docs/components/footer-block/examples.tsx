"use client";

import React from "react";
import { FooterBlock } from "@/components/flexui/footer-block";

function FullExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <FooterBlock logo="Acme Inc" description="Building the future of web development." columns={[{ title: "Product", links: [{ label: "Features", href: "#" }, { label: "Pricing", href: "#" }] }, { title: "Developers", links: [{ label: "Docs", href: "#" }, { label: "API", href: "#" }] }, { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }] }]} social={[{ label: "GitHub", href: "#" }, { label: "Twitter", href: "#" }]} copyright="© 2026 Acme Inc. All rights reserved." />
    </div>
  );
}

function MinimalExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <FooterBlock logo="Simple" copyright="© 2026 Simple. All rights reserved." />
    </div>
  );
}

export function FooterBlockExamples() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3"><FullExample /><p className="text-xs text-zinc-500">Full footer — brand, columns, social, copyright</p></div>
      <div className="flex flex-col gap-3"><MinimalExample /><p className="text-xs text-zinc-500">Minimal — logo and copyright only</p></div>
    </div>
  );
}
