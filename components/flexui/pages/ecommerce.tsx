"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Product {
  name: string;
  price: string;
  originalPrice?: string;
  image?: string;
  badge?: string;
  href?: string;
}

interface EcommerceProps {
  /** Brand name */
  brand?: string;
  /** Navigation items */
  navItems?: { label: string; href: string }[];
  /** Hero headline */
  headline?: React.ReactNode;
  /** Hero subtitle */
  heroSubtitle?: string;
  /** Products */
  products?: Product[];
  /** Category filters */
  categories?: string[];
  /** Trusted-by logos */
  logos?: { name: string }[];
  /** Footer columns */
  footerColumns?: {
    title: string;
    links: { label: string; href: string }[];
  }[];
  className?: string;
}

/* ---------- animation primitives ---------- */

const spring = { type: "spring" as const, stiffness: 300, damping: 30 };
const springGentle = { type: "spring" as const, stiffness: 200, damping: 25 };

const blurIn = {
  hidden: { opacity: 0, y: 32, filter: "blur(12px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...springGentle, delay: i * 0.07 },
  }),
};

const slideDown = {
  hidden: { opacity: 0, y: -40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...spring, delay: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { ...springGentle, delay: 0.15 + i * 0.08 },
  }),
};

/* ---------- colour palettes for product cards ---------- */

const cardGradients = [
  "from-violet-600/40 via-fuchsia-500/30 to-pink-500/20",
  "from-cyan-500/40 via-blue-500/30 to-indigo-500/20",
  "from-amber-500/40 via-orange-500/30 to-rose-500/20",
  "from-emerald-500/40 via-teal-400/30 to-cyan-400/20",
  "from-rose-500/40 via-pink-500/30 to-fuchsia-500/20",
  "from-sky-500/40 via-indigo-500/30 to-violet-500/20",
  "from-lime-500/40 via-emerald-500/30 to-teal-500/20",
  "from-fuchsia-500/40 via-purple-500/30 to-indigo-500/20",
];

const badgeColors: Record<string, string> = {
  Sale: "bg-rose-500 text-white",
  New: "bg-emerald-500 text-white",
};

/* ---------- inline SVG icons ---------- */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={11} cy={11} r={8} />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="m22 2-11 11" />
    </svg>
  );
}

/* ========================================================================== */
/*  ECOMMERCE PAGE                                                            */
/* ========================================================================== */

export function Ecommerce({
  brand = "FlexShop",
  navItems = [
    { label: "Shop", href: "#shop" },
    { label: "Collections", href: "#" },
    { label: "About", href: "#" },
  ],
  headline = "Premium essentials for modern living",
  heroSubtitle = "Curated products designed with purpose, built to last.",
  products = [
    {
      name: "Wireless Headphones",
      price: "$199",
      originalPrice: "$249",
      badge: "Sale",
    },
    { name: "Minimalist Watch", price: "$349" },
    { name: "Leather Backpack", price: "$159" },
    { name: "Smart Speaker", price: "$129", badge: "New" },
    { name: "Desk Lamp", price: "$89" },
    {
      name: "Mechanical Keyboard",
      price: "$179",
      originalPrice: "$219",
      badge: "Sale",
    },
  ],
  categories = ["All", "Electronics", "Accessories", "Home"],
  logos = [
    { name: "Apple" },
    { name: "Sony" },
    { name: "Samsung" },
    { name: "Bose" },
    { name: "Nike" },
  ],
  footerColumns = [
    {
      title: "Shop",
      links: [
        { label: "All Products", href: "#" },
        { label: "New Arrivals", href: "#" },
        { label: "Best Sellers", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Returns", href: "#" },
        { label: "Shipping", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
      ],
    },
  ],
  className,
}: EcommerceProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState("");

  /* ----- helpers ----- */
  const handleAddToCart = () => setCartCount((c) => c + 1);

  // duplicate logos for seamless marquee
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div
      className={cn(
        "relative min-h-screen overflow-x-hidden bg-zinc-950 text-white selection:bg-violet-500/30",
        className
      )}
    >
      {/* ====== global glow orbs (decorative) ====== */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-violet-600/15 blur-[160px]" />
        <div className="absolute -right-32 top-1/3 h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* =================================================================== */}
      {/*  NAVBAR                                                             */}
      {/* =================================================================== */}
      <motion.header
        variants={slideDown}
        initial="hidden"
        animate="visible"
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-center px-4 pt-4"
      >
        <nav className="flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/[0.08] bg-zinc-950/60 px-6 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {/* logo */}
          <a
            href="#"
            className="text-lg font-bold tracking-tight text-white"
          >
            {brand}
          </a>

          {/* links */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* actions */}
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl p-2 text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
              aria-label="Search"
            >
              <SearchIcon className="h-[18px] w-[18px]" />
            </button>
            <button
              className="relative rounded-xl p-2 text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
              aria-label="Cart"
            >
              <CartIcon className="h-[18px] w-[18px]" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={spring}
                    className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] font-bold text-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* =================================================================== */}
      {/*  HERO                                                               */}
      {/* =================================================================== */}
      <section className="relative z-10 flex min-h-screen items-center px-6 pt-28 pb-20">
        {/* massive gradient orb */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[700px] w-[700px] rounded-full bg-gradient-to-br from-violet-600/20 via-fuchsia-500/15 to-transparent blur-[100px]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
          {/* left: copy */}
          <div className="flex flex-col items-start">
            <motion.span
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ ...springGentle, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-violet-300 backdrop-blur"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400" />
              Free Shipping on $99+
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ ...springGentle, delay: 0.3 }}
              className="text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              {headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ ...springGentle, delay: 0.45 }}
              className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400"
            >
              {heroSubtitle}
            </motion.p>

            <motion.a
              href="#shop"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ ...springGentle, delay: 0.6 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-zinc-950 shadow-lg shadow-white/10 transition-shadow duration-300 hover:shadow-xl hover:shadow-white/20"
            >
              Shop Now
              <ArrowRightIcon className="h-4 w-4" />
            </motion.a>
          </div>

          {/* right: floating product showcase cards */}
          <div className="relative hidden h-[500px] lg:block">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(16px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  y: [0, -10, 0],
                  rotate: [0, i % 2 === 0 ? 2 : -2, 0],
                }}
                transition={{
                  opacity: { ...springGentle, delay: 0.5 + i * 0.15 },
                  scale: { ...springGentle, delay: 0.5 + i * 0.15 },
                  filter: { ...springGentle, delay: 0.5 + i * 0.15 },
                  y: {
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: i * 0.4,
                  },
                  rotate: {
                    duration: 5 + i * 0.7,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: i * 0.3,
                  },
                }}
                className={cn(
                  "absolute rounded-3xl border border-white/[0.1] bg-gradient-to-br p-6 shadow-2xl shadow-black/30 backdrop-blur-sm",
                  i === 0 &&
                    "left-4 top-4 h-56 w-56 from-violet-600/30 via-fuchsia-500/20 to-transparent",
                  i === 1 &&
                    "right-8 top-16 h-48 w-48 from-cyan-500/30 via-blue-500/20 to-transparent",
                  i === 2 &&
                    "bottom-8 left-1/2 -translate-x-1/2 h-44 w-64 from-amber-500/30 via-orange-400/20 to-transparent"
                )}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="h-8 w-8 rounded-lg bg-white/10" />
                  <div>
                    <div className="h-3 w-20 rounded-full bg-white/20" />
                    <div className="mt-2 h-2 w-14 rounded-full bg-white/10" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/*  BRAND LOGOS MARQUEE                                                */}
      {/* =================================================================== */}
      <section className="relative z-10 border-y border-white/[0.06] py-10">
        <div className="mx-auto max-w-6xl px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-zinc-500"
          >
            Trusted by leading brands
          </motion.p>
        </div>

        {/* marquee track */}
        <div className="relative overflow-hidden">
          {/* gradient masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-zinc-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-zinc-950 to-transparent" />

          <motion.div
            animate={{ x: [0, -50 * logos.length * 2] }}
            transition={{
              x: {
                duration: 20 + logos.length * 2,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            className="flex w-max gap-4"
          >
            {marqueeLogos.map((logo, i) => (
              <span
                key={i}
                className="inline-flex shrink-0 items-center rounded-full border border-white/[0.06] bg-white/[0.03] px-6 py-2.5 text-sm font-semibold text-zinc-400 backdrop-blur-sm"
              >
                {logo.name}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =================================================================== */}
      {/*  CATEGORY FILTERS + PRODUCT GRID                                    */}
      {/* =================================================================== */}
      <section id="shop" className="relative z-10 px-6 py-28">
        <div className="mx-auto max-w-6xl">
          {/* section heading */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={springGentle}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Curated for you
            </h2>
            <p className="mt-3 text-zinc-500">
              Explore our hand-picked selection of premium products.
            </p>
          </motion.div>

          {/* category pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springGentle, delay: 0.1 }}
            className="mb-10 flex flex-wrap justify-center gap-2"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200",
                  activeCategory === cat
                    ? "bg-white text-zinc-950 shadow-lg shadow-white/10"
                    : "border border-white/[0.08] text-zinc-400 hover:border-white/[0.15] hover:text-white"
                )}
                layout
                transition={spring}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* product grid */}
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {products.map((product, i) => (
                <motion.div
                  key={product.name}
                  custom={i}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                  viewport={{ once: true, amount: 0.15 }}
                  layout
                  whileHover={{
                    scale: 1.02,
                    boxShadow:
                      "0 20px 60px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900/50 backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.12]"
                >
                  {/* gradient visual instead of image */}
                  <div
                    className={cn(
                      "relative aspect-square bg-gradient-to-br",
                      cardGradients[i % cardGradients.length]
                    )}
                  >
                    {/* decorative shapes inside card visual */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-24 w-24 rounded-3xl bg-white/[0.07] shadow-inner backdrop-blur-sm transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                    </div>
                    <div className="absolute bottom-4 right-4 h-12 w-12 rounded-2xl bg-white/[0.05] backdrop-blur-sm transition-transform duration-500 group-hover:-rotate-6" />

                    {/* badge */}
                    {product.badge && (
                      <span
                        className={cn(
                          "absolute left-4 top-4 rounded-lg px-3 py-1 text-xs font-bold shadow-lg",
                          badgeColors[product.badge] ||
                            "bg-white text-zinc-950"
                        )}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* info */}
                  <div className="p-5">
                    <h3 className="text-[15px] font-semibold text-white">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2.5">
                      <span className="text-base font-bold text-white">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-zinc-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <motion.button
                      onClick={handleAddToCart}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white hover:shadow-[0_0_24px_-4px_rgba(139,92,246,0.3)]"
                    >
                      <CartIcon className="h-4 w-4" />
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* =================================================================== */}
      {/*  FEATURED PRODUCT BANNER                                            */}
      {/* =================================================================== */}
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={springGentle}
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-900/40 backdrop-blur-sm"
          >
            {/* decorative floating shapes */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-fuchsia-600/15 blur-[70px]" />

            <div className="relative grid items-center gap-12 p-10 sm:p-16 lg:grid-cols-2">
              {/* left: text */}
              <div>
                <span className="mb-4 inline-flex rounded-full bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-300">
                  Featured
                </span>
                <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  {products[0]?.name || "Premium Collection"}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-400">
                  Crafted with precision and designed for those who
                  appreciate the finer things. Experience unmatched quality
                  in every detail.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-3xl font-extrabold text-white">
                    {products[0]?.price || "$299"}
                  </span>
                  {products[0]?.originalPrice && (
                    <span className="text-lg text-zinc-500 line-through">
                      {products[0].originalPrice}
                    </span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-zinc-950 shadow-lg shadow-white/10 transition-shadow hover:shadow-xl hover:shadow-white/20"
                >
                  Add to Cart
                  <ArrowRightIcon className="h-4 w-4" />
                </motion.button>
              </div>

              {/* right: gradient visual */}
              <div className="relative hidden h-80 lg:block">
                {/* main gradient card */}
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 3, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="absolute inset-4 rounded-3xl bg-gradient-to-br from-violet-600/40 via-fuchsia-500/30 to-pink-500/20 shadow-2xl shadow-violet-500/10"
                >
                  <div className="flex h-full items-center justify-center">
                    <div className="h-28 w-28 rounded-3xl bg-white/[0.08] backdrop-blur-sm" />
                  </div>
                </motion.div>

                {/* floating accent shapes */}
                <motion.div
                  animate={{ y: [0, 8, 0], rotate: [0, -6, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -right-4 top-8 h-20 w-20 rounded-2xl border border-white/[0.08] bg-cyan-500/20 backdrop-blur-sm"
                />
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -left-2 bottom-4 h-16 w-16 rounded-xl border border-white/[0.06] bg-amber-500/15 backdrop-blur-sm"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =================================================================== */}
      {/*  NEWSLETTER CTA                                                     */}
      {/* =================================================================== */}
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={springGentle}
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-900/40 p-10 text-center backdrop-blur-sm sm:p-14"
          >
            {/* glow border effect */}
            <div className="pointer-events-none absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-violet-600/20 via-fuchsia-500/20 to-cyan-500/20 opacity-60" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[22px] bg-zinc-900/90" />

            {/* glow orb */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[60px]" />

            <div className="relative">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Get 10% off
              </h2>
              <p className="mx-auto mt-3 max-w-md text-base text-zinc-400">
                Subscribe to our newsletter for exclusive deals, new
                arrivals, and insider-only discounts.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEmail("");
                }}
                className="mx-auto mt-8 flex max-w-md gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-white placeholder-zinc-500 outline-none backdrop-blur-sm transition-colors focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-zinc-950 shadow-lg shadow-white/10 transition-shadow hover:shadow-xl hover:shadow-white/20"
                >
                  Subscribe
                  <SendIcon className="h-3.5 w-3.5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =================================================================== */}
      {/*  FOOTER                                                             */}
      {/* =================================================================== */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm">
        {/* gradient top border glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-5">
            {/* brand column */}
            <div className="md:col-span-2">
              <a
                href="#"
                className="text-xl font-bold tracking-tight text-white"
              >
                {brand}
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
                Premium essentials for modern living. Curated with care,
                built to endure.
              </p>

              {/* payment icons placeholder */}
              <div className="mt-6 flex gap-2">
                {["Visa", "MC", "Amex", "PayPal"].map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold text-zinc-500"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* link columns */}
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-zinc-500 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* copyright */}
          <div className="mt-16 border-t border-white/[0.06] pt-8 text-center text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} {brand}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
