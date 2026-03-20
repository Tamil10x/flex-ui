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
  Sparkles,
  Lightbulb,
  Type,
  Hash,
  Search,
  Monitor,
  PanelBottomOpen,
  Bell,
  Layers,
  MoveHorizontal,
  RotateCw,
  Waves,
  Palette,
  Shuffle,
  Eye,
  SplitSquareHorizontal,
  Grid3x3,
  Circle,
  Zap,
  Star,
  Blend,
  Activity,
  Sun,
  CircleDot,
  ArrowUpDown,
  Pin,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  isNew?: boolean;
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
      {
        title: "AI Studio",
        href: "/studio",
        icon: <Sparkles className="h-4 w-4" />,
        isNew: true,
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
      {
        title: "Spotlight Card",
        href: "/docs/components/spotlight-card",
        icon: <Lightbulb className="h-4 w-4" />,
      },
      {
        title: "Shimmer Button",
        href: "/docs/components/shimmer-button",
        icon: <Sparkles className="h-4 w-4" />,
      },
      {
        title: "Text Reveal",
        href: "/docs/components/text-reveal",
        icon: <Type className="h-4 w-4" />,
      },
      {
        title: "Number Ticker",
        href: "/docs/components/number-ticker",
        icon: <Hash className="h-4 w-4" />,
      },
      {
        title: "Dock Menu",
        href: "/docs/components/dock-menu",
        icon: <Monitor className="h-4 w-4" />,
      },
      {
        title: "Drawer",
        href: "/docs/components/drawer",
        icon: <PanelBottomOpen className="h-4 w-4" />,
      },
      {
        title: "Toast",
        href: "/docs/components/toast",
        icon: <Bell className="h-4 w-4" />,
      },
      {
        title: "Animated Tabs",
        href: "/docs/components/animated-tabs",
        icon: <Layers className="h-4 w-4" />,
      },
      {
        title: "Marquee",
        href: "/docs/components/marquee",
        icon: <MoveHorizontal className="h-4 w-4" />,
      },
      {
        title: "Flip Words",
        href: "/docs/components/flip-words",
        icon: <RotateCw className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Wavy Text",
        href: "/docs/components/wavy-text",
        icon: <Waves className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Typewriter Text",
        href: "/docs/components/typewriter-text",
        icon: <Type className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Gradient Text",
        href: "/docs/components/gradient-text",
        icon: <Palette className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Text Scramble",
        href: "/docs/components/text-scramble",
        icon: <Shuffle className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Blur Text",
        href: "/docs/components/blur-text",
        icon: <Eye className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Split Text",
        href: "/docs/components/split-text",
        icon: <SplitSquareHorizontal className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Rotating Text",
        href: "/docs/components/rotating-text",
        icon: <RotateCw className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Grid Pattern",
        href: "/docs/components/grid-pattern",
        icon: <Grid3x3 className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Dot Pattern",
        href: "/docs/components/dot-pattern",
        icon: <Circle className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Beams Background",
        href: "/docs/components/beams-background",
        icon: <Zap className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Stars Background",
        href: "/docs/components/stars-background",
        icon: <Star className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Mesh Gradient",
        href: "/docs/components/mesh-gradient",
        icon: <Blend className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Wavy Background",
        href: "/docs/components/wavy-background",
        icon: <Activity className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Aurora Background",
        href: "/docs/components/aurora-background",
        icon: <Sun className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Particle Field",
        href: "/docs/components/particle-field",
        icon: <CircleDot className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Parallax Scroll",
        href: "/docs/components/parallax-scroll",
        icon: <ArrowUpDown className="h-4 w-4" />,
        isNew: true,
      },
      {
        title: "Sticky Scroll Reveal",
        href: "/docs/components/sticky-scroll-reveal",
        icon: <Pin className="h-4 w-4" />,
        isNew: true,
      },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-white/[0.06] py-8 pr-6 lg:block">
      {/* Logo */}
      <Link href="/" className="mb-4 flex items-center gap-2.5 px-3">
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

      {/* Search trigger */}
      <button
        onClick={() => {
          document.dispatchEvent(
            new KeyboardEvent("keydown", { key: "k", metaKey: true })
          );
        }}
        className="mb-6 flex w-full items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-zinc-500 transition-colors hover:border-white/[0.1] hover:bg-white/[0.05] hover:text-zinc-400"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium">
          ⌘K
        </kbd>
      </button>

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
                  {item.isNew && (
                    <span className="ml-auto rounded bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-cyan-400 ring-1 ring-cyan-500/20">
                      New
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </aside>
  );
}
