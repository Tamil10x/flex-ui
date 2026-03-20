"use client";

import React, { useMemo, useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparklineChartProps {
  data: number[];
  className?: string;
  color?: string;
  height?: number;
  width?: number;
  showArea?: boolean;
  animate?: boolean;
}

function buildSmoothPath(
  points: { x: number; y: number }[]
): string {
  if (points.length < 2) return "";
  const d: string[] = [`M ${points[0].x},${points[0].y}`];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    const tension = 0.3;
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    d.push(`C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`);
  }
  return d.join(" ");
}

export function SparklineChart({
  data,
  className,
  color = "#38bdf8",
  height = 60,
  width = 200,
  showArea = false,
  animate = true,
}: SparklineChartProps) {
  const uid = useId();
  const gradientId = `sparkline-grad-${uid}`;

  const { linePath, areaPath, totalLength } = useMemo(() => {
    if (data.length < 2) return { linePath: "", areaPath: "", totalLength: 0 };

    const padding = 2;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((v, i) => ({
      x: padding + (i / (data.length - 1)) * (width - padding * 2),
      y: padding + (1 - (v - min) / range) * (height - padding * 2),
    }));

    const line = buildSmoothPath(points);

    // Approximate path length
    let len = 0;
    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      len += Math.sqrt(dx * dx + dy * dy);
    }

    const area = `${line} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`;

    return { linePath: line, areaPath: area, totalLength: len };
  }, [data, width, height]);

  if (data.length < 2) return null;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={cn("overflow-visible", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>

      {showArea && (
        <motion.path
          d={areaPath}
          fill={`url(#${gradientId})`}
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 0.6 }}
        />
      )}

      <motion.path
        d={linePath}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={
          animate
            ? { strokeDasharray: totalLength, strokeDashoffset: totalLength }
            : undefined
        }
        animate={animate ? { strokeDashoffset: 0 } : undefined}
        transition={
          animate
            ? { duration: 1.2, ease: "easeOut" }
            : undefined
        }
      />
    </svg>
  );
}
