"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CountdownProps {
  targetDate: Date | string;
  className?: string;
  onComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="block text-2xl font-bold tabular-nums text-white"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">{label}</span>
    </div>
  );
}

export function Countdown({ targetDate, className, onComplete }: CountdownProps) {
  const target = targetDate instanceof Date ? targetDate : new Date(targetDate);
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft(target));
  const completedRef = React.useRef(false);

  const tick = useCallback(() => {
    const t = calcTimeLeft(target);
    setTime(t);
    if (!completedRef.current && t.days + t.hours + t.minutes + t.seconds === 0) {
      completedRef.current = true;
      onComplete?.();
    }
  }, [target, onComplete]);

  useEffect(() => {
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <Digit value={time.days} label="Days" />
      <span className="text-xl text-zinc-600">:</span>
      <Digit value={time.hours} label="Hours" />
      <span className="text-xl text-zinc-600">:</span>
      <Digit value={time.minutes} label="Min" />
      <span className="text-xl text-zinc-600">:</span>
      <Digit value={time.seconds} label="Sec" />
    </div>
  );
}
