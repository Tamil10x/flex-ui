"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  className?: string;
  /** Accent color for active input */
  accentColor?: string;
}

export function OTPInput({
  length = 6,
  onComplete,
  className,
  accentColor = "#3b82f6",
}: OTPInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [completedIndices, setCompletedIndices] = useState<Set<number>>(
    new Set()
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset when length changes
  useEffect(() => {
    setValues(Array(length).fill(""));
    setCompletedIndices(new Set());
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const focusInput = useCallback((index: number) => {
    if (index >= 0 && index < (inputRefs.current?.length ?? 0)) {
      inputRefs.current[index]?.focus();
    }
  }, []);

  const handleChange = useCallback(
    (index: number, value: string) => {
      // Only allow single digit
      const char = value.slice(-1);
      if (char && !/^[0-9]$/.test(char)) return;

      const newValues = [...values];
      newValues[index] = char;
      setValues(newValues);

      if (char) {
        setCompletedIndices((prev) => new Set(prev).add(index));
        // Auto-focus next input
        if (index < length - 1) {
          focusInput(index + 1);
        }
        // Check if complete
        const code = newValues.join("");
        if (code.length === length && newValues.every((v) => v !== "")) {
          onComplete?.(code);
        }
      }
    },
    [values, length, focusInput, onComplete]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const newValues = [...values];
        if (values[index]) {
          // Clear current input
          newValues[index] = "";
          setValues(newValues);
          setCompletedIndices((prev) => {
            const next = new Set(prev);
            next.delete(index);
            return next;
          });
        } else if (index > 0) {
          // Move to previous input and clear it
          newValues[index - 1] = "";
          setValues(newValues);
          setCompletedIndices((prev) => {
            const next = new Set(prev);
            next.delete(index - 1);
            return next;
          });
          focusInput(index - 1);
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        focusInput(index - 1);
      } else if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault();
        focusInput(index + 1);
      }
    },
    [values, length, focusInput]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text/plain")
        .replace(/\D/g, "")
        .slice(0, length);

      if (!pastedData) return;

      const newValues = [...values];
      const newCompleted = new Set(completedIndices);

      for (let i = 0; i < pastedData.length; i++) {
        newValues[i] = pastedData[i];
        newCompleted.add(i);
      }

      setValues(newValues);
      setCompletedIndices(newCompleted);

      // Focus the next empty input or the last filled one
      const nextIndex = Math.min(pastedData.length, length - 1);
      focusInput(nextIndex);

      // Check if complete
      if (
        pastedData.length >= length &&
        newValues.every((v) => v !== "")
      ) {
        onComplete?.(newValues.join(""));
      }
    },
    [values, length, completedIndices, focusInput, onComplete]
  );

  return (
    <div role="group" aria-label="One-time password input" className={cn("flex items-center gap-2 sm:gap-3", className)}>
      {Array.from({ length }).map((_, index) => {
        const isActive = activeIndex === index;
        const isFilled = values[index] !== "";
        const justCompleted = completedIndices.has(index) && isFilled;

        return (
          <motion.div
            key={index}
            className="relative"
            animate={
              justCompleted
                ? { scale: [1, 1.1, 1] }
                : { scale: 1 }
            }
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
              duration: 0.3,
            }}
          >
            {/* Active glow effect */}
            {isActive && (
              <motion.div
                layoutId="otp-focus-glow"
                className="absolute -inset-[2px] rounded-xl"
                style={{
                  boxShadow: `0 0 20px ${accentColor}40, 0 0 40px ${accentColor}20`,
                  border: `2px solid ${accentColor}`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}

            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={values[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              className={cn(
                "relative z-10 h-12 w-10 sm:h-14 sm:w-12 rounded-lg text-center text-lg sm:text-xl font-semibold",
                "outline-none transition-all duration-200",
                "backdrop-blur-xl",
                "bg-white/[0.05] text-white",
                "border",
                isActive
                  ? "border-transparent"
                  : isFilled
                    ? "border-white/[0.15]"
                    : "border-white/[0.08]",
                !isActive && "hover:border-white/[0.12] hover:bg-white/[0.08]"
              )}
              aria-label={`Digit ${index + 1} of ${length}`}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
