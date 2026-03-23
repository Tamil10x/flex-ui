"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, Github } from "lucide-react";
import { ThemeSwitcher } from "@/components/docs/theme-switcher";

const navLinks = [
  { href: "/docs/introduction", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "/templates", label: "Templates", badge: "New" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/studio", label: "Studio", badge: "AI" },
  { href: "/blog", label: "Blog" },
  { href: "/showcase", label: "Showcase" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="FlexUI"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-lg font-bold text-white">
            FLEX
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              UI
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
              {"badge" in link && link.badge && (
                <span className="rounded bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-cyan-400 ring-1 ring-cyan-500/20">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
          <div className="mx-2 h-4 w-px bg-white/10" />
          <ThemeSwitcher />
          <Link
            href="https://github.com/flexui/flexui"
            target="_blank"
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:text-white"
          >
            <Github className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="rounded-lg p-2 text-zinc-400 transition-colors hover:text-white md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:text-white"
              >
                {link.label}
                {"badge" in link && link.badge && (
                  <span className="rounded bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-cyan-400 ring-1 ring-cyan-500/20">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
