"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
}

interface PricingProps {
  /** Brand name */
  brand?: string;
  /** Navigation items */
  navItems?: { label: string; href: string }[];
  /** Hero headline */
  headline?: string;
  /** Hero subtitle */
  subtitle?: string;
  /** Pricing tiers */
  tiers?: PricingTier[];
  /** FAQ items */
  faqItems?: { question: string; answer: string }[];
  /** Trusted-by logos */
  logos?: { name: string }[];
  /** Yearly discount percentage */
  yearlyDiscount?: number;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Animation presets                                                  */
/* ------------------------------------------------------------------ */

const spring = { type: "spring" as const, stiffness: 260, damping: 28 };
const springSmooth = { type: "spring" as const, stiffness: 180, damping: 24 };

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function parsePrice(raw: string): number | null {
  const match = raw.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

function formatPrice(amount: number): string {
  return `$${amount}`;
}

function computeYearlyPrice(raw: string, discount: number): string {
  const num = parsePrice(raw);
  if (num === null) return raw;
  const yearly = Math.round(num * 12 * (1 - discount / 100));
  return `$${yearly}`;
}

function computeYearlyMonthly(raw: string, discount: number): string {
  const num = parsePrice(raw);
  if (num === null) return raw;
  return formatPrice(Math.round(num * (1 - discount / 100)));
}

/* ------------------------------------------------------------------ */
/*  Comparison features for the table                                 */
/* ------------------------------------------------------------------ */

const comparisonFeatures = [
  { name: "Components", values: ["50+", "140+", "Unlimited"] },
  { name: "Themes", values: ["1", "6", "Custom"] },
  { name: "Page templates", values: [false, true, true] },
  { name: "CLI access", values: [false, true, true] },
  { name: "Figma file", values: [false, true, true] },
  { name: "Priority support", values: [false, true, true] },
  { name: "SSO", values: [false, false, true] },
  { name: "SLA guarantee", values: [false, false, true] },
  { name: "Custom components", values: [false, false, true] },
  { name: "Dedicated support", values: [false, false, true] },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function Pricing({
  brand = "FlexUI",
  navItems = [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Docs", href: "#" },
  ],
  headline = "Simple, transparent pricing",
  subtitle = "Choose the plan that's right for you. No hidden fees, cancel anytime.",
  tiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for side projects and learning.",
      features: [
        "50+ components",
        "1 theme",
        "Community support",
        "MIT license",
      ],
      cta: { label: "Get Started", href: "#" },
    },
    {
      name: "Pro",
      price: "$29",
      period: "month",
      description: "Everything you need for production apps.",
      features: [
        "140+ components",
        "6 themes",
        "Page templates",
        "Priority support",
        "CLI access",
        "Figma file",
      ],
      cta: { label: "Start Free Trial", href: "#" },
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams with advanced needs.",
      features: [
        "Everything in Pro",
        "Custom themes",
        "Dedicated support",
        "SLA guarantee",
        "SSO",
        "Custom components",
      ],
      cta: { label: "Contact Sales", href: "#" },
    },
  ],
  faqItems = [
    {
      question: "Can I switch plans later?",
      answer:
        "Yes, you can upgrade or downgrade at any time. Changes take effect on your next billing cycle.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, the Pro plan comes with a 14-day free trial. No credit card required.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.",
    },
    {
      question: "Can I use FlexUI for commercial projects?",
      answer:
        "Absolutely. All plans include a commercial license for unlimited projects.",
    },
  ],
  logos = [
    { name: "Vercel" },
    { name: "Stripe" },
    { name: "Shopify" },
    { name: "Linear" },
    { name: "Notion" },
  ],
  yearlyDiscount = 20,
  className,
}: PricingProps) {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* price helpers */
  function displayPrice(tier: PricingTier) {
    if (!isYearly) return tier.price;
    return computeYearlyMonthly(tier.price, yearlyDiscount);
  }

  function displayPeriod(tier: PricingTier) {
    if (!tier.period || tier.period === "forever") return tier.period;
    return isYearly ? "month, billed yearly" : tier.period;
  }

  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden bg-black text-white selection:bg-violet-500/30",
        className
      )}
    >
      {/* ============================================================ */}
      {/*  GLOBAL BACKGROUND                                           */}
      {/* ============================================================ */}

      {/* Dot grid pattern */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="pointer-events-none fixed left-1/4 top-0 -z-10 h-[600px] w-[600px] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none fixed right-1/4 top-32 -z-10 h-[500px] w-[500px] rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ============================================================ */}
      {/*  NAVBAR                                                      */}
      {/* ============================================================ */}

      <motion.header
        variants={fadeDown}
        initial="hidden"
        animate="visible"
        className="fixed left-0 right-0 top-0 z-50 px-4 pt-4"
      >
        <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-3 shadow-lg shadow-black/20 backdrop-blur-xl">
          {/* Brand */}
          <a href="#" className="text-lg font-bold tracking-tight text-white">
            {brand}
          </a>

          {/* Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
          >
            Get Started
          </a>
        </nav>
      </motion.header>

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}

      <section className="relative z-10 px-6 pb-8 pt-36">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge with shimmer */}
          <motion.div variants={fadeUp} className="mb-6 inline-block">
            <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-sm text-zinc-400 backdrop-blur-sm">
              <span className="relative z-10 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400" />
                Pricing
              </span>
              {/* Shimmer overlay */}
              <motion.span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ translateX: ["-100%", "100%"] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl"
          >
            {headline}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-zinc-400"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Toggle */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex items-center justify-center gap-3"
          >
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                !isYearly ? "text-white" : "text-zinc-500"
              )}
            >
              Monthly
            </span>

            <button
              onClick={() => setIsYearly(!isYearly)}
              className={cn(
                "relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border border-white/[0.08] transition-colors",
                isYearly ? "bg-violet-600" : "bg-white/[0.06]"
              )}
              aria-label="Toggle yearly pricing"
            >
              <motion.span
                className="inline-block h-5 w-5 rounded-full bg-white shadow-md"
                animate={{ x: isYearly ? 22 : 3 }}
                transition={spring}
              />
            </button>

            <span
              className={cn(
                "text-sm font-medium transition-colors",
                isYearly ? "text-white" : "text-zinc-500"
              )}
            >
              Yearly
            </span>

            <AnimatePresence>
              {isYearly && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, x: -8 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -8 }}
                  transition={spring}
                  className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400"
                >
                  Save {yearlyDiscount}%
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  PRICING CARDS                                               */}
      {/* ============================================================ */}

      <section className="relative z-10 px-6 py-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-3"
        >
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              variants={fadeUp}
              className={cn(
                "group relative rounded-2xl p-8 transition-all duration-300",
                tier.featured
                  ? "z-10 scale-[1.03] lg:scale-105"
                  : "border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-white/[0.12]"
              )}
            >
              {/* Featured card: animated gradient border */}
              {tier.featured && (
                <>
                  {/* Glow shadow */}
                  <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-violet-600/20 via-blue-600/20 to-violet-600/20 opacity-60 blur-xl" />

                  {/* Rotating conic border */}
                  <div className="absolute -inset-[1px] -z-10 overflow-hidden rounded-2xl">
                    <motion.div
                      className="absolute -inset-[100%]"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent, rgba(139,92,246,0.6), rgba(99,102,241,0.6), rgba(59,130,246,0.6), transparent 60%)",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>

                  {/* Inner background */}
                  <div className="absolute inset-[1px] -z-10 rounded-2xl bg-zinc-950" />

                  {/* "Most Popular" badge */}
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, ...springSmooth }}
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-violet-500/25"
                  >
                    Most Popular
                  </motion.span>
                </>
              )}

              {/* Plan name */}
              <h3 className="text-lg font-semibold text-white">{tier.name}</h3>

              {/* Price with animated number */}
              <div className="mt-5 flex items-baseline gap-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${tier.name}-${isYearly}`}
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl font-bold tracking-tight text-white"
                  >
                    {displayPrice(tier)}
                  </motion.span>
                </AnimatePresence>
                {tier.period && (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${tier.name}-period-${isYearly}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm text-zinc-500"
                    >
                      /{displayPeriod(tier)}
                    </motion.span>
                  </AnimatePresence>
                )}
              </div>

              {/* Yearly savings callout */}
              <AnimatePresence>
                {isYearly && parsePrice(tier.price) !== null && parsePrice(tier.price)! > 0 && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1 text-xs text-emerald-400"
                  >
                    {computeYearlyPrice(tier.price, yearlyDiscount)}/year
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Description */}
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                {tier.description}
              </p>

              {/* CTA */}
              <a
                href={tier.cta.href}
                className={cn(
                  "mt-6 flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200",
                  tier.featured
                    ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 hover:brightness-110"
                    : "border border-white/[0.1] text-zinc-300 hover:border-white/[0.2] hover:bg-white/[0.04] hover:text-white"
                )}
              >
                {tier.cta.label}
              </a>

              {/* Features */}
              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm text-zinc-400"
                  >
                    <svg
                      className="h-4 w-4 shrink-0 text-emerald-400"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3.5 8l3 3 6-7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  COMPARISON TABLE                                            */}
      {/* ============================================================ */}

      <section className="relative z-10 px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mx-auto max-w-4xl"
        >
          <motion.h2
            variants={fadeUp}
            className="mb-12 text-center text-3xl font-bold text-white"
          >
            Compare Plans
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
          >
            {/* Header row */}
            <div className="grid grid-cols-4 gap-4 border-b border-white/[0.06] px-6 py-4">
              <div className="text-sm font-medium text-zinc-500">Feature</div>
              {tiers.map((t) => (
                <div
                  key={t.name}
                  className={cn(
                    "text-center text-sm font-semibold",
                    t.featured ? "text-violet-400" : "text-white"
                  )}
                >
                  {t.name}
                </div>
              ))}
            </div>

            {/* Feature rows */}
            {comparisonFeatures.map((feature, idx) => (
              <div
                key={feature.name}
                className={cn(
                  "grid grid-cols-4 gap-4 px-6 py-3.5 text-sm",
                  idx % 2 === 0 ? "bg-white/[0.01]" : "bg-transparent"
                )}
              >
                <div className="text-zinc-400">{feature.name}</div>
                {feature.values.map((value, vidx) => (
                  <div
                    key={`${feature.name}-${vidx}`}
                    className="flex items-center justify-center"
                  >
                    {typeof value === "boolean" ? (
                      value ? (
                        <svg
                          className="h-4 w-4 text-emerald-400"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M3.5 8l3 3 6-7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-4 w-4 text-zinc-600"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M4 4l8 8M12 4l-8 8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      )
                    ) : (
                      <span className="text-zinc-300">{value}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  LOGO CLOUD                                                  */}
      {/* ============================================================ */}

      <section className="relative z-10 px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-8 text-sm font-medium uppercase tracking-wider text-zinc-500"
          >
            Trusted by leading teams
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {logos.map((logo, idx) => (
              <motion.span
                key={logo.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, ...springSmooth }}
                className="rounded-full border border-white/[0.06] bg-white/[0.03] px-5 py-2 text-sm text-zinc-400 backdrop-blur-sm transition-colors hover:border-white/[0.12] hover:text-zinc-200"
              >
                {logo.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ SECTION                                                 */}
      {/* ============================================================ */}

      <section className="relative z-10 px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mx-auto max-w-3xl"
        >
          <motion.h2
            variants={fadeUp}
            className="mb-4 text-center text-3xl font-bold text-white"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mb-12 text-center text-zinc-500"
          >
            Can&apos;t find what you&apos;re looking for? Contact our support
            team.
          </motion.p>

          <div className="space-y-3">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="text-sm font-medium text-white">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={spring}
                      className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.1] text-zinc-400"
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M7 1v12M1 7h12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as const }}
                      >
                        <div className="px-6 pb-5 text-sm leading-relaxed text-zinc-400">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  CTA SECTION                                                 */}
      {/* ============================================================ */}

      <section className="relative z-10 px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/[0.06] px-8 py-20 text-center"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-600/10 via-blue-600/10 to-transparent" />
          <div className="absolute -right-20 -top-20 -z-10 h-60 w-60 rounded-full bg-violet-600/20 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 -z-10 h-60 w-60 rounded-full bg-blue-600/20 blur-[80px]" />

          <motion.h2
            variants={fadeUp}
            className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl"
          >
            Start building today
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-md text-zinc-400"
          >
            Join thousands of developers shipping beautiful interfaces with{" "}
            {brand}.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <a
              href="#"
              className="relative inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-8 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:brightness-110"
            >
              Get Started Free
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                      */}
      {/* ============================================================ */}

      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-12">
        {/* Gradient top accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo */}
          <a href="#" className="text-lg font-bold tracking-tight text-white">
            {brand}
          </a>

          {/* Links */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} {brand}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
