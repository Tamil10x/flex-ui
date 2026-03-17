import React from "react";
import { cn } from "@/lib/utils";

interface DocSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function DocSection({ id, title, children, className }: DocSectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 space-y-4", className)}>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

interface DocSubSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function DocSubSection({ id, title, children, className }: DocSubSectionProps) {
  return (
    <div id={id} className={cn("scroll-mt-24 space-y-3", className)}>
      <h3 className="text-lg font-medium text-zinc-200">{title}</h3>
      {children}
    </div>
  );
}
