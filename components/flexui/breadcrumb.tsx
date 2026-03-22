"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export function Breadcrumb({
  items,
  separator = "/",
  className,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-2 text-sm", className)}
    >
      {items.map((item, i) => (
        <React.Fragment key={item.label}>
          {i > 0 && (
            <span className="text-zinc-600">{separator}</span>
          )}
          {item.href && i < items.length - 1 ? (
            <a
              href={item.href}
              className="text-zinc-400 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ) : (
            <span
              className={cn(
                i === items.length - 1 ? "text-white font-medium" : "text-zinc-400"
              )}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
