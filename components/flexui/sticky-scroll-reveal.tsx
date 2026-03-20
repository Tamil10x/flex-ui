"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickySection {
  title: string;
  description: string;
  content?: React.ReactNode;
}

interface StickyScrollRevealProps {
  sections: StickySection[];
  className?: string;
}

function SectionItem({
  section,
  index,
  total,
  scrollYProgress,
}: {
  section: StickySection;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;

  const opacity = useTransform(scrollYProgress, [start, mid, end], [0.3, 1, 0.3]);
  const y = useTransform(scrollYProgress, [start, mid, end], [20, 0, -20]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="py-20 first:pt-0 last:pb-0"
    >
      <h3 className="text-2xl font-bold tracking-tight text-white">
        {section.title}
      </h3>
      <p className="mt-3 max-w-md text-base leading-relaxed text-zinc-400">
        {section.description}
      </p>
    </motion.div>
  );
}

export function StickyScrollReveal({
  sections,
  className,
}: StickyScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, sections.length - 1]
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ minHeight: `${sections.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto flex w-full max-w-6xl gap-12 px-6 lg:gap-20">
          {/* Left column — scrolling text */}
          <div className="flex-1">
            {sections.map((section, i) => (
              <SectionItem
                key={i}
                section={section}
                index={i}
                total={sections.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* Right column — sticky glass panel */}
          <div className="hidden flex-1 items-center lg:flex">
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl">
              {/* Glass shimmer */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02]" />
              {sections.map((section, i) => (
                <StickyContentPanel
                  key={i}
                  section={section}
                  index={i}
                  activeIndex={activeIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StickyContentPanel({
  section,
  index,
  activeIndex,
}: {
  section: StickySection;
  index: number;
  activeIndex: ReturnType<typeof useTransform<number>>;
}) {
  const opacity = useTransform(activeIndex, (latest: number) => {
    const distance = Math.abs(latest - index);
    return distance < 0.5 ? 1 : 0;
  });

  return (
    <motion.div
      style={{ opacity }}
      className={cn(
        "absolute inset-0 flex items-center justify-center p-8",
        index === 0 ? "relative" : "absolute"
      )}
    >
      {section.content ?? (
        <div className="flex h-full min-h-[200px] w-full items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <span className="text-sm text-zinc-500">
            {section.title}
          </span>
        </div>
      )}
    </motion.div>
  );
}
