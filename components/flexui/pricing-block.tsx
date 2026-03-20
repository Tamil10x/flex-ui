"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingTier {
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  highlighted?: boolean;
  cta?: string;
}

interface PricingBlockProps {
  tiers: PricingTier[];
  className?: string;
}

function AnimatedPrice({ value }: { value: number }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as const }}
        className="inline-block tabular-nums"
      >
        ${value}
      </motion.span>
    </AnimatePresence>
  );
}

export function PricingBlock({ tiers, className }: PricingBlockProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className={cn("relative px-6 py-24", className)}>
      {/* Toggle */}
      <div className="mx-auto mb-14 flex items-center justify-center">
        <div className="relative flex items-center rounded-full border border-white/[0.08] bg-zinc-950/80 p-1 backdrop-blur-xl">
          <button
            onClick={() => setBilling("monthly")}
            className={cn(
              "relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200",
              billing === "monthly" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={cn(
              "relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200",
              billing === "yearly" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Yearly
            <span className="ml-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
              Save 20%
            </span>
          </button>

          {/* Animated pill */}
          <motion.div
            layoutId="pricing-pill"
            className="absolute inset-y-1 rounded-full bg-white/[0.08]"
            style={{
              left: billing === "monthly" ? "4px" : undefined,
              right: billing === "yearly" ? "4px" : undefined,
              width: billing === "monthly" ? "calc(50% - 4px)" : "calc(50% - 4px)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] as const }}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-2xl border backdrop-blur-xl",
              tier.highlighted
                ? "border-transparent bg-zinc-950/90"
                : "border-white/[0.08] bg-zinc-950/80"
            )}
          >
            {/* Gradient border for highlighted */}
            {tier.highlighted && (
              <div className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-blue-500/50 via-cyan-500/30 to-purple-500/50 [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] p-[1px]" />
            )}

            {/* Popular badge */}
            {tier.highlighted && (
              <div className="absolute right-4 top-4 z-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/25">
                Popular
              </div>
            )}

            {/* Card content */}
            <div className="relative z-10 flex flex-1 flex-col p-6">
              {/* Name */}
              <h3 className="text-lg font-bold text-white">{tier.name}</h3>
              <p className="mt-1 text-sm text-zinc-500">{tier.description}</p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-white">
                  <AnimatedPrice
                    value={billing === "monthly" ? tier.price.monthly : tier.price.yearly}
                  />
                </span>
                <span className="text-sm text-zinc-500">
                  /{billing === "monthly" ? "mo" : "yr"}
                </span>
              </div>

              {/* CTA */}
              <a
                href="#"
                className={cn(
                  "mt-6 flex h-10 items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200",
                  tier.highlighted
                    ? "bg-white text-zinc-950 shadow-lg shadow-white/10 hover:bg-zinc-200"
                    : "border border-white/[0.12] bg-white/[0.03] text-zinc-300 hover:border-white/[0.2] hover:bg-white/[0.06] hover:text-white"
                )}
              >
                {tier.cta || "Get Started"}
              </a>

              {/* Divider */}
              <div className="my-6 h-px bg-white/[0.06]" />

              {/* Features */}
              <ul className="flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-zinc-400"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
