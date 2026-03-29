"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { Home, User, Briefcase, Mail } from "lucide-react";

const code = `"use client";

import { FloatingNavbar } from "@/components/flexui/floating-navbar";
import { Home, User, Briefcase, Mail } from "lucide-react";

const items = [
  { label: "Home", href: "#", icon: <Home className="h-4 w-4" /> },
  { label: "About", href: "#about", icon: <User className="h-4 w-4" /> },
  { label: "Work", href: "#work", icon: <Briefcase className="h-4 w-4" /> },
  { label: "Contact", href: "#contact", icon: <Mail className="h-4 w-4" /> },
];

export default function Demo() {
  return (
    <FloatingNavbar
      items={items}
      logo={<span className="text-sm font-bold text-white">Acme</span>}
    />
  );
}`;

const items = [
  { label: "Home", href: "#", icon: <Home className="h-4 w-4" /> },
  { label: "About", href: "#about", icon: <User className="h-4 w-4" /> },
  { label: "Work", href: "#work", icon: <Briefcase className="h-4 w-4" /> },
  { label: "Contact", href: "#contact", icon: <Mail className="h-4 w-4" /> },
];

export function FloatingNavbarPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="relative flex min-h-[350px] w-full flex-col items-center overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
            {/* Static demo since navbar is position:fixed */}
            <div className="flex w-full items-center justify-center rounded-full border border-white/[0.08] bg-zinc-950/80 px-4 py-2 shadow-lg shadow-black/20 backdrop-blur-xl">
              <span className="mr-4 text-sm font-bold text-white">Acme</span>
              <div className="flex items-center gap-1">
                {items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    <span className="text-zinc-500">{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
            <p className="mt-8 text-sm text-zinc-500">
              Scroll down on a real page to see the shrink + glassmorphic effect
            </p>
          </div>
        }
        code={code}
        filename="floating-navbar-demo.tsx"
      />
    </div>
  );
}
