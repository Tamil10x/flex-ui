"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedInputProps {
  label: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  /** Accent color for focus state */
  accentColor?: string;
}

export function AnimatedInput({
  label,
  type = "text",
  value: controlledValue,
  onChange,
  className,
  accentColor = "#3b82f6",
}: AnimatedInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = `animated-input-${label.replace(/\s+/g, "-").toLowerCase()}`;

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isActive = isFocused || value.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div
      className={cn("relative w-full", className)}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Label */}
      <motion.label
        htmlFor={inputId}
        animate={{
          y: isActive ? -24 : 0,
          x: isActive ? -4 : 0,
          scale: isActive ? 0.75 : 1,
          color: isFocused ? accentColor : isActive ? "#a1a1aa" : "#71717a",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="pointer-events-none absolute left-3 top-3 origin-top-left text-sm font-medium text-zinc-500"
      >
        {label}
      </motion.label>

      {/* Input */}
      <input
        ref={inputRef}
        id={inputId}
        type={type}
        value={value}
        onChange={handleChange}
        aria-label={label}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "w-full rounded-lg border bg-white/[0.03] px-3 pt-3 pb-2 text-sm text-zinc-100 outline-none transition-colors duration-200",
          isFocused
            ? "border-transparent"
            : "border-white/[0.08] hover:border-white/[0.15]"
        )}
        style={{
          boxShadow: isFocused
            ? `0 0 0 2px ${accentColor}40, 0 0 0 1px ${accentColor}`
            : undefined,
        }}
      />

      {/* Animated underline */}
      <div className="relative h-[2px] overflow-hidden">
        <motion.div
          animate={{
            scaleX: isFocused ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className="absolute inset-0 origin-center"
          style={{ backgroundColor: accentColor }}
        />
      </div>
    </div>
  );
}
