"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  Expand,
  Scan,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarSections: { heading: string; items: SidebarItem[] }[] = [
  {
    heading: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs/introduction",
        icon: <BookOpen className="h-4 w-4" />,
      },
      {
        title: "Installation",
        href: "/docs/installation",
        icon: <Download className="h-4 w-4" />,
      },
      {
        title: "MCP Server",
        href: "/docs/mcp-server",
        icon: <Server className="h-4 w-4" />,
      },
      {
        title: "Changelog",
        href: "/docs/changelog",
        icon: <FileText className="h-4 w-4" />,
      },
    ],
  },
  {
    heading: "Components",
    items: [
      {
        title: "All Components",
        href: "/docs/components",
        icon: <LayoutGrid className="h-4 w-4" />,
      },
      {
        title: "Magnetic Button",
        href: "/docs/components/magnetic-button",
        icon: <MousePointer className="h-4 w-4" />,
      },
      {
        title: "3D Hover Card",
        href: "/docs/components/three-hover-card",
        icon: <Box className="h-4 w-4" />,
      },
      {
        title: "Floating Panel",
        href: "/docs/components/floating-panel",
        icon: <PanelTop className="h-4 w-4" />,
      },
      {
        title: "Interactive Globe",
        href: "/docs/components/interactive-globe",
        icon: <Globe className="h-4 w-4" />,
      },
      {
        title: "Expandable Card",
        href: "/docs/components/expandable-card",
        icon: <Expand className="h-4 w-4" />,
      },
      {
        title: "Reflective Card",
        href: "/docs/components/reflective-card",
        icon: <Scan className="h-4 w-4" />,
      },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-white/[0.06] py-8 pr-6 lg:block">
      {/* Logo */}
      <Link href="/" className="mb-8 flex items-center gap-2.5 px-3">
        <Image
          src="/logo.png"
          alt="FlexUI"
          width={28}
          height={28}
          className="rounded-lg"
        />
        <span className="text-sm font-bold text-white">
          Flex<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">UI</span>
          <span className="ml-1.5 rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
            v0.1.0
          </span>
        </span>
      </Link>

      {sidebarSections.map((section) => (
        <div key={section.heading} className="mb-6">
          <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {section.heading}
          </h4>
          <nav className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-150",
                    isActive
                      ? "bg-white/[0.06] text-white font-medium"
                      : "text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200"
                  )}
                >
                  <span
                    className={cn(
                      "transition-colors",
                      isActive ? "text-blue-400" : "text-zinc-600"
                    )}
                  >
                    {item.icon}
                  </span>
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </aside>
  );
}
