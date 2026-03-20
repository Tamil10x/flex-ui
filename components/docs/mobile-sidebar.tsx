"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Download,
  Server,
  FileText,
  MousePointer,
  Box,
  LayoutGrid,
  PanelTop,
  Globe,
  Menu,
  X,
} from "lucide-react";

const items = [
  { title: "Introduction", href: "/docs/introduction", icon: <BookOpen className="h-4 w-4" /> },
  { title: "Installation", href: "/docs/installation", icon: <Download className="h-4 w-4" /> },
  { title: "MCP Server", href: "/docs/mcp-server", icon: <Server className="h-4 w-4" /> },
  { title: "Changelog", href: "/docs/changelog", icon: <FileText className="h-4 w-4" /> },
  { title: "All Components", href: "/docs/components", icon: <LayoutGrid className="h-4 w-4" /> },
  { title: "Magnetic Button", href: "/docs/components/magnetic-button", icon: <MousePointer className="h-4 w-4" /> },
  { title: "3D Hover Card", href: "/docs/components/three-hover-card", icon: <Box className="h-4 w-4" /> },
  { title: "Floating Panel", href: "/docs/components/floating-panel", icon: <PanelTop className="h-4 w-4" /> },
  { title: "Interactive Globe", href: "/docs/components/interactive-globe", icon: <Globe className="h-4 w-4" /> },
];

export function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="mb-4 flex items-center gap-2 rounded-lg border border-white/[0.08] bg-zinc-950 px-3 py-2 text-sm text-zinc-400"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        Navigation
      </button>
      {open && (
        <nav className="mb-6 flex flex-col gap-0.5 rounded-xl border border-white/[0.08] bg-zinc-950 p-2">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all",
                  isActive
                    ? "bg-white/[0.06] text-white font-medium"
                    : "text-zinc-400 hover:text-zinc-200"
                )}
              >
                <span className={cn(isActive ? "text-blue-400" : "text-zinc-600")}>
                  {item.icon}
                </span>
                {item.title}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
