"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
  social?: { label: string; href: string }[];
}

interface TeamBlockProps {
  /** Team members */
  members: TeamMember[];
  /** Section heading */
  heading?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Grid columns */
  columns?: 2 | 3 | 4;
  className?: string;
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export function TeamBlock({
  members,
  heading = "Meet the Team",
  subtitle,
  columns = 3,
  className,
}: TeamBlockProps) {
  const colClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className={cn("px-6 py-24", className)}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white">{heading}</h2>
          {subtitle && (
            <p className="mt-3 text-lg text-zinc-400">{subtitle}</p>
          )}
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className={cn("grid gap-6", colClass[columns])}
        >
          {members.map((member, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group rounded-2xl border border-white/[0.06] bg-zinc-950/50 p-6 text-center transition-all duration-300 hover:border-white/[0.12] hover:bg-zinc-900/30"
            >
              {/* Avatar */}
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-zinc-900">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-zinc-500">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                )}
              </div>

              <h3 className="text-sm font-semibold text-white">{member.name}</h3>
              <p className="mt-1 text-xs text-zinc-500">{member.role}</p>

              {member.social && member.social.length > 0 && (
                <div className="mt-4 flex justify-center gap-2">
                  {member.social.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      className="rounded-md border border-white/[0.06] px-2 py-1 text-[10px] text-zinc-500 transition-colors hover:border-white/[0.12] hover:text-white"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
