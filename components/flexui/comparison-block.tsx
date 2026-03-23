"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ComparisonPlan {
  name: string;
  featured?: boolean;
  price?: string;
  period?: string;
}

interface ComparisonFeature {
  name: string;
  category?: string;
  values: (boolean | string)[];
}

interface ComparisonBlockProps {
  /** Plans to compare */
  plans: ComparisonPlan[];
  /** Features list */
  features: ComparisonFeature[];
  /** Section heading */
  heading?: string;
  /** Section subtitle */
  subtitle?: string;
  className?: string;
}

export function ComparisonBlock({
  plans,
  features,
  heading = "Compare Plans",
  subtitle,
  className,
}: ComparisonBlockProps) {
  // Group features by category
  const grouped: { category: string; items: ComparisonFeature[] }[] = [];
  let current: { category: string; items: ComparisonFeature[] } | null = null;

  for (const feature of features) {
    const cat = feature.category ?? "Features";
    if (!current || current.category !== cat) {
      current = { category: cat, items: [] };
      grouped.push(current);
    }
    current.items.push(feature);
  }

  return (
    <section className={cn("px-6 py-24", className)}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white">{heading}</h2>
          {subtitle && (
            <p className="mt-3 text-lg text-zinc-400">{subtitle}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[640px] border-collapse">
            {/* Plan header */}
            <thead>
              <tr>
                <th className="pb-6 text-left" />
                {plans.map((plan) => (
                  <th key={plan.name} className="pb-6 text-center">
                    <div
                      className={cn(
                        "inline-flex flex-col items-center rounded-xl px-6 py-3",
                        plan.featured && "border border-white/[0.08] bg-white/[0.03]"
                      )}
                    >
                      <span className="text-sm font-bold text-white">{plan.name}</span>
                      {plan.price && (
                        <span className="mt-1 text-xs text-zinc-500">
                          {plan.price}
                          {plan.period && <span>/{plan.period}</span>}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {grouped.map((group) => (
                <React.Fragment key={group.category}>
                  {/* Category header */}
                  <tr>
                    <td
                      colSpan={plans.length + 1}
                      className="pb-3 pt-8 text-xs font-bold uppercase tracking-wider text-zinc-400"
                    >
                      {group.category}
                    </td>
                  </tr>

                  {group.items.map((feature, fi) => (
                    <tr
                      key={feature.name}
                      className={cn(
                        "border-t border-white/[0.04]",
                        fi === group.items.length - 1 && "border-b border-white/[0.04]"
                      )}
                    >
                      <td className="py-3 pr-4 text-sm text-zinc-300">{feature.name}</td>
                      {feature.values.map((val, vi) => (
                        <td key={vi} className="py-3 text-center">
                          {typeof val === "boolean" ? (
                            val ? (
                              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                                  <path d="M2.5 6l3 3 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                            ) : (
                              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full text-zinc-700">
                                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                                  <path d="M3 9l6-6M9 9L3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                              </span>
                            )
                          ) : (
                            <span className="text-sm text-zinc-400">{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
