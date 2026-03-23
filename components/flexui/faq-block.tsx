"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps {
  /** FAQ items */
  items: FAQItem[];
  /** Section heading */
  heading?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Layout variant */
  layout?: "single" | "two-column";
  className?: string;
}

function FAQAccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-sm font-medium text-white">{item.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/[0.08] text-zinc-400"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-zinc-400">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQBlock({
  items,
  heading = "Frequently Asked Questions",
  subtitle,
  layout = "single",
  className,
}: FAQBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  const midpoint = Math.ceil(items.length / 2);
  const col1 = layout === "two-column" ? items.slice(0, midpoint) : items;
  const col2 = layout === "two-column" ? items.slice(midpoint) : [];

  return (
    <section className={cn("px-6 py-24", className)}>
      <div className="mx-auto max-w-4xl">
        {/* Header */}
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

        {/* FAQ list */}
        <div className={cn(layout === "two-column" && "grid gap-x-12 md:grid-cols-2")}>
          <div>
            {col1.map((item, i) => (
              <FAQAccordionItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
          {col2.length > 0 && (
            <div>
              {col2.map((item, i) => (
                <FAQAccordionItem
                  key={i + midpoint}
                  item={item}
                  isOpen={openIndex === i + midpoint}
                  onToggle={() => toggle(i + midpoint)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
