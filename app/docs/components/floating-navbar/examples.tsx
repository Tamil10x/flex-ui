"use client";

import React from "react";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Home, User, Briefcase, Mail, Settings, Star, Zap } from "lucide-react";

// ─── Minimal Navbar ─────────────────────────────────────────────────────────
function MinimalNavbarPreview() {
  const items = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="flex items-center justify-center rounded-full border border-white/[0.08] bg-zinc-950/80 px-4 py-2 backdrop-blur-xl">
      <div className="flex items-center gap-1">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── With Icons Navbar ──────────────────────────────────────────────────────
function IconsNavbarPreview() {
  const items = [
    { label: "Home", href: "#", icon: <Home className="h-3.5 w-3.5" /> },
    { label: "About", href: "#about", icon: <User className="h-3.5 w-3.5" /> },
    { label: "Work", href: "#work", icon: <Briefcase className="h-3.5 w-3.5" /> },
    { label: "Contact", href: "#contact", icon: <Mail className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="flex items-center justify-center rounded-full border border-white/[0.08] bg-zinc-950/80 px-4 py-2 backdrop-blur-xl">
      <span className="mr-4 text-sm font-bold text-white">Acme</span>
      <div className="flex items-center gap-1">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <span className="text-zinc-500">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Branded Navbar ─────────────────────────────────────────────────────────
function BrandedNavbarPreview() {
  const items = [
    { label: "Features", href: "#features", icon: <Star className="h-3.5 w-3.5" /> },
    { label: "Pricing", href: "#pricing", icon: <Zap className="h-3.5 w-3.5" /> },
    { label: "Settings", href: "#settings", icon: <Settings className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="flex items-center justify-center rounded-full border border-purple-500/20 bg-zinc-950/80 px-4 py-2 backdrop-blur-xl">
      <span className="mr-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-sm font-bold text-transparent">
        Brand
      </span>
      <div className="flex items-center gap-1">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-purple-500/10 hover:text-purple-300"
          >
            <span className="text-purple-500/60">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

const examples = [
  {
    id: "fn-minimal",
    title: "Minimal",
    tag: "Basic",
    tagColor: "bg-zinc-800 text-zinc-400 border-zinc-700",
    description: "Text-only nav items without icons or logo.",
    preview: <MinimalNavbarPreview />,
    code: `<FloatingNavbar
  items={[
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ]}
/>`,
    filename: "minimal.tsx",
  },
  {
    id: "fn-icons",
    title: "With Icons & Logo",
    tag: "Icons",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    description: "Nav items with icons and a logo element.",
    preview: <IconsNavbarPreview />,
    code: `<FloatingNavbar
  items={[
    { label: "Home", href: "#", icon: <Home className="h-4 w-4" /> },
    { label: "About", href: "#about", icon: <User className="h-4 w-4" /> },
    { label: "Work", href: "#work", icon: <Briefcase className="h-4 w-4" /> },
    { label: "Contact", href: "#contact", icon: <Mail className="h-4 w-4" /> },
  ]}
  logo={<span className="text-sm font-bold text-white">Acme</span>}
/>`,
    filename: "with-icons.tsx",
  },
  {
    id: "fn-branded",
    title: "Branded Theme",
    tag: "Theme",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    description: "Custom branded colors with gradient logo.",
    preview: <BrandedNavbarPreview />,
    code: `<FloatingNavbar
  items={[
    { label: "Features", href: "#features", icon: <Star className="h-4 w-4" /> },
    { label: "Pricing", href: "#pricing", icon: <Zap className="h-4 w-4" /> },
    { label: "Settings", href: "#settings", icon: <Settings className="h-4 w-4" /> },
  ]}
  logo={
    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-sm font-bold text-transparent">
      Brand
    </span>
  }
  className="border-purple-500/20"
/>`,
    filename: "branded.tsx",
  },
];

export function FloatingNavbarExamples() {
  return <ShowcaseGrid items={examples} />;
}
