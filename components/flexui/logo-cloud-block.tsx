"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoItem {
  name: string;
  logo?: React.ReactNode;
  href?: string;
}

interface LogoCloudBlockProps {
  /** Logos to display */
  logos: LogoItem[];
  /** Section heading */
  heading?: string;
  /** Layout variant */
  variant?: "grid" | "marquee";
  /** Marquee speed in seconds (full cycle) */
  speed?: number;
  className?: string;
}

function MarqueeRow({ logos, speed, reverse }: { logos: LogoItem[]; speed: number; reverse?: boolean }) {
  const doubled = [...logos, ...logos];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex shrink-0 gap-12"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex h-12 shrink-0 items-center justify-center px-4"
          >
            {item.logo ?? (
              <span className="whitespace-nowrap text-lg font-bold text-zinc-600 transition-colors hover:text-zinc-400">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function LogoCloudBlock({
  logos,
  heading = "Trusted by industry leaders",
  variant = "marquee",
  speed = 30,
  className,
}: LogoCloudBlockProps) {
  return (
    <section className={cn("px-6 py-24", className)}>
      <div className="mx-auto max-w-5xl">
        {heading && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-10 text-center text-sm font-medium uppercase tracking-wider text-zinc-500"
          >
            {heading}
          </motion.p>
        )}

        {variant === "marquee" ? (
          <div className="space-y-8">
            <MarqueeRow logos={logos} speed={speed} />
            {logos.length > 5 && <MarqueeRow logos={logos} speed={speed * 1.2} reverse />}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8"
          >
            {logos.map((item) => (
              <div key={item.name} className="flex h-12 items-center justify-center px-4">
                {item.href ? (
                  <a href={item.href} className="text-zinc-600 transition-colors hover:text-zinc-400">
                    {item.logo ?? <span className="text-lg font-bold">{item.name}</span>}
                  </a>
                ) : (
                  <div className="text-zinc-600">
                    {item.logo ?? <span className="text-lg font-bold">{item.name}</span>}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
