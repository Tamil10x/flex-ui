"use client";

import React from "react";
import { BrowserFrame } from "@/components/flexui/browser-frame";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

// ─── Landing page mockup ────────────────────────────────────────────────────
function LandingPageDemo() {
  return (
    <BrowserFrame url="https://myapp.com">
      <div className="bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-8 text-center">
        <h2 className="text-xl font-bold text-white">Welcome to MyApp</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Build faster with modern tools
        </p>
        <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
          Get Started
        </button>
      </div>
    </BrowserFrame>
  );
}

// ─── No nav demo ────────────────────────────────────────────────────────────
function NoNavDemo() {
  return (
    <BrowserFrame url="https://docs.flexui.dev" showNav={false}>
      <div className="flex h-[200px] items-center justify-center bg-zinc-950">
        <p className="text-sm text-zinc-500">
          Minimal frame without navigation buttons
        </p>
      </div>
    </BrowserFrame>
  );
}

// ─── Dashboard mockup ───────────────────────────────────────────────────────
function DashboardDemo() {
  return (
    <BrowserFrame url="https://dashboard.flexui.dev/analytics">
      <div className="bg-zinc-950 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Analytics</h3>
          <span className="text-xs text-zinc-500">Last 7 days</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Views", value: "12.4k" },
            { label: "Users", value: "3.2k" },
            { label: "Revenue", value: "$8.9k" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3"
            >
              <p className="text-xs text-zinc-500">{stat.label}</p>
              <p className="mt-1 text-lg font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

const examples = [
  {
    id: "bf-landing",
    title: "Landing Page",
    tag: "Mockup",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    description: "Showcase a landing page design inside a browser frame.",
    preview: <LandingPageDemo />,
    code: `<BrowserFrame url="https://myapp.com">
  <div className="bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-8 text-center">
    <h2 className="text-xl font-bold text-white">Welcome to MyApp</h2>
    <p className="mt-2 text-sm text-zinc-400">Build faster with modern tools</p>
    <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white">
      Get Started
    </button>
  </div>
</BrowserFrame>`,
    filename: "landing-page.tsx",
  },
  {
    id: "bf-nonav",
    title: "No Navigation",
    tag: "Minimal",
    tagColor: "bg-zinc-800 text-zinc-400 border-zinc-700",
    description: "Minimal browser frame without back/forward/refresh buttons.",
    preview: <NoNavDemo />,
    code: `<BrowserFrame url="https://docs.flexui.dev" showNav={false}>
  <div className="flex h-[200px] items-center justify-center bg-zinc-950">
    <p className="text-sm text-zinc-500">
      Minimal frame without navigation buttons
    </p>
  </div>
</BrowserFrame>`,
    filename: "no-nav.tsx",
  },
  {
    id: "bf-dashboard",
    title: "Dashboard Mockup",
    tag: "Dashboard",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    description: "Analytics dashboard inside a browser frame.",
    preview: <DashboardDemo />,
    code: `<BrowserFrame url="https://dashboard.flexui.dev/analytics">
  <div className="bg-zinc-950 p-6">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-white">Analytics</h3>
      <span className="text-xs text-zinc-500">Last 7 days</span>
    </div>
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
          <p className="text-xs text-zinc-500">{stat.label}</p>
          <p className="mt-1 text-lg font-bold text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  </div>
</BrowserFrame>`,
    filename: "dashboard.tsx",
  },
];

export function BrowserFrameExamples() {
  return <ShowcaseGrid items={examples} />;
}
