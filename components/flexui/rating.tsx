"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: number;
  className?: string;
}

function Star({ filled, hovered, size }: { filled: boolean; hovered: boolean; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={filled || hovered ? "#facc15" : "transparent"}
        stroke={filled || hovered ? "#facc15" : "#52525b"}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Rating({ value, onChange, max = 5, size = 24, className }: RatingProps) {
  const [hoverIdx, setHoverIdx] = useState(-1);
  const interactive = !!onChange;

  const handleClick = useCallback(
    (i: number) => { if (onChange) onChange(i + 1); },
    [onChange]
  );

  return (
    <div
      className={cn("inline-flex gap-1", className)}
      onMouseLeave={() => setHoverIdx(-1)}
    >
      {Array.from({ length: max }, (_, i) => (
        <motion.button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => handleClick(i)}
          onMouseEnter={() => interactive && setHoverIdx(i)}
          whileHover={interactive ? { scale: 1.2 } : undefined}
          whileTap={interactive ? { scale: 0.9 } : undefined}
          className="cursor-pointer disabled:cursor-default"
        >
          <Star
            filled={i < value}
            hovered={hoverIdx >= 0 && i <= hoverIdx}
            size={size}
          />
        </motion.button>
      ))}
    </div>
  );
}
