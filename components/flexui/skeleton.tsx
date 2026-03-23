"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  rounded?: boolean;
}

export function Skeleton({ width, height, className, rounded }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-white/[0.06]",
        rounded ? "rounded-full" : "rounded-md",
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
}
