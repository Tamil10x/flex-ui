"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface SocialLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface FooterBlockProps {
  /** Brand logo or name */
  logo?: React.ReactNode;
  /** Brand description */
  description?: string;
  /** Link columns */
  columns?: FooterColumn[];
  /** Social media links */
  social?: SocialLink[];
  /** Copyright text */
  copyright?: string;
  className?: string;
}

export function FooterBlock({
  logo = "FlexUI",
  description,
  columns = [],
  social = [],
  copyright,
  className,
}: FooterBlockProps) {
  return (
    <footer
      className={cn(
        "border-t border-white/[0.06] px-6 py-16",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <div className="text-lg font-bold text-white">{logo}</div>
            {description && (
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
                {description}
              </p>
            )}
            {social.length > 0 && (
              <div className="mt-6 flex gap-3">
                {social.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] text-zinc-500 transition-all hover:border-white/[0.12] hover:text-white"
                    aria-label={s.label}
                  >
                    {s.icon ?? <span className="text-xs">{s.label[0]}</span>}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-500 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        {copyright && (
          <div className="mt-12 border-t border-white/[0.06] pt-6">
            <p className="text-xs text-zinc-600">{copyright}</p>
          </div>
        )}
      </div>
    </footer>
  );
}
