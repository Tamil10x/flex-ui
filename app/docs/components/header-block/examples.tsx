"use client";

import React from "react";
import { HeaderBlock } from "@/components/flexui/header-block";

function GlassmorphicExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <HeaderBlock logo="Acme" navItems={[{ label: "Products", href: "#" }, { label: "Blog", href: "#" }]} cta={{ label: "Sign Up", href: "#" }} variant="glassmorphic" sticky={false} />
    </div>
  );
}

function SolidExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <HeaderBlock logo="DarkUI" navItems={[{ label: "Docs", href: "#" }, { label: "Components", href: "#" }]} variant="solid" sticky={false} />
    </div>
  );
}

function TransparentExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-b from-zinc-900 to-zinc-950 p-12">
      <HeaderBlock logo="Minimal" navItems={[{ label: "About", href: "#" }, { label: "Work", href: "#" }]} cta={{ label: "Contact", href: "#" }} variant="transparent" sticky={false} />
    </div>
  );
}

export function HeaderBlockExamples() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3"><GlassmorphicExample /><p className="text-xs text-zinc-500">Glassmorphic — blurred background with border on scroll</p></div>
      <div className="flex flex-col gap-3"><SolidExample /><p className="text-xs text-zinc-500">Solid — opaque dark background</p></div>
      <div className="flex flex-col gap-3"><TransparentExample /><p className="text-xs text-zinc-500">Transparent — no background, great over hero sections</p></div>
    </div>
  );
}
