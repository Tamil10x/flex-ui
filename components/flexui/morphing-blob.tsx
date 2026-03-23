"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MorphingBlobProps {
  className?: string;
  color?: string;
  /** Gradient end color */
  accentColor?: string;
  /** Morph speed in seconds */
  speed?: number;
  /** Blob size in px */
  size?: number;
  children?: React.ReactNode;
}

// Organic blob shapes defined as cubic bezier path data
// Each shape is roughly circular with organic bumps
const BLOB_SHAPES = [
  "M44.5,22.2C51.4,29.5,57.2,40.5,53.9,48.8C50.6,57.1,38.2,62.7,27.5,60.8C16.8,58.9,7.8,49.5,3.6,38.8C-0.6,28.1,0,16.1,6.3,9.2C12.6,2.3,24.6,-0.5,34.2,3.3C43.8,7.1,37.6,14.9,44.5,22.2Z",
  "M48.2,26.5C53.1,35.2,55.8,47.6,50.4,54.5C45,61.4,31.5,62.8,21.2,58.6C10.9,54.4,3.8,44.6,1.6,34.1C-0.6,23.6,2.1,12.4,9.4,6.3C16.7,0.2,28.6,-0.8,37.5,3.4C46.4,7.6,43.3,17.8,48.2,26.5Z",
  "M46.8,19.5C54.9,26.8,62.3,37.1,59.2,46.2C56.1,55.3,42.5,63.2,30.8,62.4C19.1,61.6,9.3,52.1,4.2,41.3C-0.9,30.5,-1.3,18.4,4.6,10.7C10.5,3,22.7,-0.3,32.6,1.2C42.5,2.7,38.7,12.2,46.8,19.5Z",
  "M50.1,24.8C55.8,33.9,56.4,46.8,50.1,54.1C43.8,61.4,30.6,63.1,20.4,58.2C10.2,53.3,3,41.8,1.2,30.8C-0.6,19.8,3,9.3,10.6,4C18.2,-1.3,29.8,-1.4,38.8,2.8C47.8,7,44.4,15.7,50.1,24.8Z",
  "M47.5,21.8C54.5,29.5,59.8,40.2,56,48.6C52.2,57,39.3,63.1,28.1,61.5C16.9,59.9,7.4,50.6,2.8,39.8C-1.8,29,-1.5,16.7,4.5,9.3C10.5,1.9,22.2,-0.6,32.2,1.8C42.2,4.2,40.5,14.1,47.5,21.8Z",
];

function parsePath(d: string): number[] {
  const nums: number[] = [];
  const regex = /-?[\d.]+/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(d)) !== null) {
    nums.push(parseFloat(match[0]));
  }
  return nums;
}

function interpolateNumbers(a: number[], b: number[], t: number): number[] {
  const result: number[] = [];
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    result.push(a[i] + (b[i] - a[i]) * t);
  }
  return result;
}

function numbersToPath(template: string, nums: number[]): string {
  let idx = 0;
  return template.replace(/-?[\d.]+/g, () => {
    const val = nums[idx++];
    return val !== undefined ? val.toFixed(1) : "0";
  });
}

export function MorphingBlob({
  className,
  color = "#8B5CF6",
  accentColor = "#389CFD",
  speed = 4,
  size = 200,
  children,
}: MorphingBlobProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !pathRef.current) return;

    const parsedShapes = BLOB_SHAPES.map(parsePath);
    const template = BLOB_SHAPES[0];
    const shapeCount = parsedShapes.length;
    const segmentDuration = speed * 1000; // ms per shape transition

    let startTime: number | null = null;

    function animate(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const totalCycle = segmentDuration * shapeCount;
      const cycleProgress = (elapsed % totalCycle) / segmentDuration;

      const currentIndex = Math.floor(cycleProgress) % shapeCount;
      const nextIndex = (currentIndex + 1) % shapeCount;
      const t = cycleProgress - Math.floor(cycleProgress);

      // Smooth easing
      const eased = t * t * (3 - 2 * t);

      const interpolated = interpolateNumbers(
        parsedShapes[currentIndex],
        parsedShapes[nextIndex],
        eased
      );

      if (pathRef.current) {
        pathRef.current.setAttribute("d", numbersToPath(template, interpolated));
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, speed]);

  if (!mounted) {
    return (
      <div
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  const gradientId = `morphing-blob-gradient-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="-5 -5 70 70"
        width={size}
        height={size}
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={accentColor} />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d={BLOB_SHAPES[0]}
          fill={`url(#${gradientId})`}
        />
      </svg>
      {children && (
        <div className="relative z-10 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
