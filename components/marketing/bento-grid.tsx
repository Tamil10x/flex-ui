"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={cn(
        "grid auto-rows-[minmax(200px,auto)] gap-4",
        "grid-cols-1 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
