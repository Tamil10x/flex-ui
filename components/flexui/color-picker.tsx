"use client";

import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  presets?: string[];
  className?: string;
}

const DEFAULT_PRESETS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
  "#3b82f6", "#8b5cf6", "#ec4899", "#ffffff", "#000000",
];

export function ColorPicker({
  value,
  onChange,
  presets = DEFAULT_PRESETS,
  className,
}: ColorPickerProps) {
  const [hex, setHex] = useState(value);

  const handleHexChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setHex(v);
      if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v);
    },
    [onChange]
  );

  const selectColor = useCallback(
    (color: string) => {
      setHex(color);
      onChange(color);
    },
    [onChange]
  );

  return (
    <div
      className={cn(
        "inline-flex flex-col gap-3 rounded-xl border border-white/[0.08] bg-zinc-950/80 p-4 backdrop-blur-xl",
        className
      )}
    >
      <div
        className="h-20 w-full rounded-lg border border-white/[0.08]"
        style={{ backgroundColor: value }}
      />
      <div className="grid grid-cols-5 gap-2">
        {presets.map((color) => (
          <button
            key={color}
            onClick={() => selectColor(color)}
            className={cn(
              "h-8 w-8 rounded-full border-2 transition-transform hover:scale-110",
              value === color ? "border-white" : "border-white/[0.08]"
            )}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500">HEX</span>
        <input
          type="text"
          value={hex}
          onChange={handleHexChange}
          maxLength={7}
          className="w-full rounded-md border border-white/[0.08] bg-zinc-900 px-2 py-1 text-sm text-white outline-none focus:border-white/20"
        />
      </div>
    </div>
  );
}
