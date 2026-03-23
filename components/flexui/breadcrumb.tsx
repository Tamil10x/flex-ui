"use client";

import React from "react";
import { motion } from "framer-motion";
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
    <motion.nav
      aria-label="Breadcrumb"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
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
              {...(i === items.length - 1 ? { "aria-current": "page" as const } : {})}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </motion.nav>
  );
}
