"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type AnnotationType =
  | "circle"
  | "underline"
  | "highlight"
  | "bracket"
  | "arrow"
  | "strikethrough";

interface HandwrittenAnnotationProps {
  children: React.ReactNode;
  className?: string;
  /** Type of annotation */
  type?: AnnotationType;
  /** Annotation color */
  color?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Trigger once on scroll into view */
  once?: boolean;
  /** Whether to animate */
  animate?: boolean;
  /** Padding around the annotation (px) */
  padding?: number;
  /** Side for bracket annotation */
  bracketSide?: "left" | "right";
}

// Deterministic "random" offset based on a seed value
function wobble(seed: number, amount: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return ((x - Math.floor(x)) - 0.5) * amount * 2;
}

function generateCirclePath(
  w: number,
  h: number,
  padding: number
): string {
  const cx = w / 2;
  const cy = h / 2;
  const rx = w / 2 + padding;
  const ry = h / 2 + padding;

  // Wobbly ellipse using cubic bezier curves
  const w1 = wobble(1, 4);
  const w2 = wobble(2, 4);
  const w3 = wobble(3, 3);
  const w4 = wobble(4, 3);
  const w5 = wobble(5, 4);
  const w6 = wobble(6, 4);

  return [
    `M ${cx - rx + w1},${cy + w2}`,
    `C ${cx - rx + w3},${cy - ry + w4} ${cx + rx + w5},${cy - ry + w6} ${cx + rx + wobble(7, 4)},${cy + wobble(8, 3)}`,
    `C ${cx + rx + wobble(9, 4)},${cy + ry + wobble(10, 4)} ${cx - rx + wobble(11, 4)},${cy + ry + wobble(12, 4)} ${cx - rx + w1},${cy + w2}`,
  ].join(" ");
}

function generateUnderlinePath(w: number, h: number, padding: number): string {
  const y = h + padding;
  const segments = 8;
  const segW = w / segments;
  let d = `M ${-padding},${y}`;
  for (let i = 0; i < segments; i++) {
    const x = -padding + segW * (i + 1);
    const cpY = y + wobble(i + 20, 4);
    const cpX = -padding + segW * (i + 0.5);
    d += ` Q ${cpX},${cpY} ${x},${y + wobble(i + 30, 2)}`;
  }
  return d;
}

function generateHighlightPath(
  w: number,
  h: number,
  padding: number
): string {
  const x1 = -padding;
  const x2 = w + padding;
  const y1 = -padding * 0.5;
  const y2 = h + padding * 0.5;
  return `M ${x1},${y1} L ${x2},${y1} L ${x2},${y2} L ${x1},${y2} Z`;
}

function generateBracketPath(
  w: number,
  h: number,
  padding: number,
  side: "left" | "right"
): string {
  const bw = 12;
  const x = side === "left" ? -padding - bw : w + padding + bw;
  const tipX = side === "left" ? -padding - bw - 6 : w + padding + bw + 6;
  const y1 = -padding;
  const y2 = h + padding;
  const midY = (y1 + y2) / 2;

  return [
    `M ${x + wobble(1, 2)},${y1 + wobble(2, 2)}`,
    `Q ${tipX + wobble(3, 3)},${y1 + (midY - y1) * 0.3 + wobble(4, 2)} ${tipX + wobble(5, 2)},${midY}`,
    `Q ${tipX + wobble(6, 3)},${midY + (y2 - midY) * 0.7 + wobble(7, 2)} ${x + wobble(8, 2)},${y2 + wobble(9, 2)}`,
  ].join(" ");
}

function generateArrowPath(
  w: number,
  h: number,
  padding: number
): string {
  // Curved arrow coming from top-right pointing to center-left
  const startX = w + padding + 20;
  const startY = -padding - 15;
  const endX = -padding - 5;
  const endY = h / 2;

  const cp1x = startX + wobble(1, 5);
  const cp1y = startY + 30 + wobble(2, 5);
  const cp2x = endX - 20 + wobble(3, 5);
  const cp2y = endY - 15 + wobble(4, 5);

  // Arrowhead
  const ax1 = endX + 8;
  const ay1 = endY - 7;
  const ax2 = endX + 7;
  const ay2 = endY + 8;

  return [
    `M ${startX},${startY}`,
    `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`,
    `M ${endX},${endY} L ${ax1},${ay1}`,
    `M ${endX},${endY} L ${ax2},${ay2}`,
  ].join(" ");
}

function generateStrikethroughPath(
  w: number,
  h: number,
  padding: number
): string {
  const y = h / 2;
  const segments = 6;
  const segW = (w + padding * 2) / segments;
  let d = `M ${-padding},${y + wobble(40, 3)}`;
  for (let i = 0; i < segments; i++) {
    const x = -padding + segW * (i + 1);
    const cpY = y + wobble(i + 50, 5);
    const cpX = -padding + segW * (i + 0.5);
    d += ` Q ${cpX},${cpY} ${x},${y + wobble(i + 60, 2)}`;
  }
  return d;
}

function getAnnotationPath(
  type: AnnotationType,
  w: number,
  h: number,
  padding: number,
  bracketSide: "left" | "right"
): string {
  switch (type) {
    case "circle":
      return generateCirclePath(w, h, padding);
    case "underline":
      return generateUnderlinePath(w, h, padding);
    case "highlight":
      return generateHighlightPath(w, h, padding);
    case "bracket":
      return generateBracketPath(w, h, padding, bracketSide);
    case "arrow":
      return generateArrowPath(w, h, padding);
    case "strikethrough":
      return generateStrikethroughPath(w, h, padding);
    default:
      return "";
  }
}

export function HandwrittenAnnotation({
  children,
  className,
  type = "circle",
  color = "#EF4444",
  strokeWidth = 2,
  duration = 0.8,
  once = true,
  animate: shouldAnimate = true,
  padding = 6,
  bracketSide = "left",
}: HandwrittenAnnotationProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isInView = useInView(containerRef, { once, amount: 0.5 });

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    setDimensions({ width, height });
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const { width: w, height: h } = dimensions;

  const isHighlight = type === "highlight";

  // Calculate viewBox with extra room for arrow / bracket / circle overshoot
  const extraPad = type === "arrow" ? 30 : type === "bracket" ? 24 : padding + 4;
  const vbX = -extraPad;
  const vbY = -extraPad;
  const vbW = w + extraPad * 2;
  const vbH = h + extraPad * 2;

  const pathD = useMemo(
    () => (w > 0 && h > 0 ? getAnnotationPath(type, w, h, padding, bracketSide) : ""),
    [type, w, h, padding, bracketSide]
  );

  const isReady = w > 0 && h > 0 && pathD;

  return (
    <span
      ref={containerRef}
      className={cn("relative inline-block", className)}
    >
      {/* SVG overlay */}
      {isReady && (
        <svg
          className="pointer-events-none absolute inset-0"
          style={{
            overflow: "visible",
            left: vbX,
            top: vbY,
            width: vbW,
            height: vbH,
          }}
          viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isHighlight ? (
            <motion.path
              d={pathD}
              fill={color}
              fillOpacity={0}
              initial={shouldAnimate ? { fillOpacity: 0 } : { fillOpacity: 0.2 }}
              animate={
                shouldAnimate && isInView
                  ? { fillOpacity: 0.2 }
                  : shouldAnimate
                  ? { fillOpacity: 0 }
                  : undefined
              }
              transition={{ duration, ease: "easeOut" }}
            />
          ) : (
            <motion.path
              d={pathD}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
              animate={
                shouldAnimate && isInView
                  ? { pathLength: 1, opacity: 1 }
                  : shouldAnimate
                  ? { pathLength: 0, opacity: 0 }
                  : undefined
              }
              transition={{
                pathLength: { duration, ease: "easeOut" },
                opacity: { duration: 0.1 },
              }}
            />
          )}
        </svg>
      )}

      {/* Content — rendered on top */}
      <span className="relative z-10">{children}</span>
    </span>
  );
}
