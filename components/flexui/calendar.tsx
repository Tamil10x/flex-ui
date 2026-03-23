"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface CalendarProps {
  selected?: Date;
  onChange: (date: Date) => void;
  className?: string;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function Calendar({ selected, onChange, className }: CalendarProps) {
  const [viewing, setViewing] = useState(selected ?? new Date());
  const year = viewing.getFullYear();
  const month = viewing.getMonth();

  const cells = useMemo(() => {
    const first = new Date(year, month, 1).getDay();
    const total = new Date(year, month + 1, 0).getDate();
    const arr: (number | null)[] = Array(first).fill(null);
    for (let d = 1; d <= total; d++) arr.push(d);
    return arr;
  }, [year, month]);

  const isSelected = (d: number) =>
    selected &&
    selected.getFullYear() === year &&
    selected.getMonth() === month &&
    selected.getDate() === d;

  const isToday = (d: number) => {
    const t = new Date();
    return t.getFullYear() === year && t.getMonth() === month && t.getDate() === d;
  };

  const nav = (dir: number) => setViewing(new Date(year, month + dir, 1));

  return (
    <div
      className={cn(
        "w-72 rounded-xl border border-white/[0.08] bg-zinc-950/80 p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_0_20px_-8px_rgba(139,92,246,0.1)]",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <button onClick={() => nav(-1)} className="text-zinc-400 hover:text-white">&larr;</button>
        <span className="text-sm font-medium text-white">
          {viewing.toLocaleString("default", { month: "long" })} {year}
        </span>
        <button onClick={() => nav(1)} className="text-zinc-400 hover:text-white">&rarr;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {DAYS.map((d) => (
          <span key={d} className="py-1 text-zinc-500">{d}</span>
        ))}
        {cells.map((d, i) =>
          d ? (
            <button
              key={i}
              onClick={() => onChange(new Date(year, month, d))}
              className={cn(
                "rounded-md py-1 text-sm transition-colors",
                isSelected(d) && "bg-white text-black font-semibold",
                !isSelected(d) && isToday(d) && "text-cyan-400",
                !isSelected(d) && "text-zinc-300 hover:bg-white/10"
              )}
            >
              {d}
            </button>
          ) : (
            <span key={i} />
          )
        )}
      </div>
    </div>
  );
}
