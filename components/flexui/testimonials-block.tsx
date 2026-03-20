"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

interface TestimonialsBlockProps {
  testimonials: Testimonial[];
  className?: string;
  /** Layout style */
  variant?: "grid" | "marquee";
}

// ─── Star icon ──────────────────────────────────────────────────────────────

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

// ─── Stars rating ───────────────────────────────────────────────────────────

function StarsRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="h-4 w-4 text-amber-400" />
      ))}
    </div>
  );
}

// ─── Avatar ─────────────────────────────────────────────────────────────────

function Avatar({ author, avatar }: { author: string; avatar?: string }) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={author}
        className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10"
      />
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white ring-2 ring-white/10">
      {initials}
    </div>
  );
}

// ─── Testimonial Card ───────────────────────────────────────────────────────

function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.05]",
        className
      )}
    >
      <StarsRating />
      <p className="mt-4 text-sm leading-relaxed text-zinc-300">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3">
        <Avatar author={testimonial.author} avatar={testimonial.avatar} />
        <div>
          <p className="text-sm font-semibold text-white">
            {testimonial.author}
          </p>
          <p className="text-xs text-zinc-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Grid variant ───────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

function GridLayout({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <motion.div
      className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {testimonials.map((t, i) => (
        <motion.div key={i} variants={cardVariants} className="break-inside-avoid">
          <TestimonialCard testimonial={t} />
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Marquee variant ────────────────────────────────────────────────────────

function MarqueeLayout({ testimonials }: { testimonials: Testimonial[] }) {
  // Duplicate for seamless loop
  const items = [...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

      <div className="flex animate-[marquee-scroll_40s_linear_infinite] gap-4 hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <div key={i} className="w-[350px] shrink-0">
            <TestimonialCard testimonial={t} />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

// ─── TestimonialsBlock ──────────────────────────────────────────────────────

export function TestimonialsBlock({
  testimonials,
  className,
  variant = "grid",
}: TestimonialsBlockProps) {
  return (
    <div className={cn("w-full", className)}>
      {variant === "grid" ? (
        <GridLayout testimonials={testimonials} />
      ) : (
        <MarqueeLayout testimonials={testimonials} />
      )}
    </div>
  );
}
