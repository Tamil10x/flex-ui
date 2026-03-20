"use client";
import { useCallback, useRef, useState } from "react";
import { useMotionValue } from "framer-motion";

export function useMousePosition() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const percentX = useMotionValue(0);
  const percentY = useMotionValue(0);
  const [isInside, setIsInside] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    x.set(px);
    y.set(py);
    percentX.set(px / rect.width - 0.5);
    percentY.set(py / rect.height - 0.5);
  }, [x, y, percentX, percentY]);

  const handleMouseEnter = useCallback(() => setIsInside(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsInside(false);
    percentX.set(0);
    percentY.set(0);
  }, [percentX, percentY]);

  return {
    ref,
    x, y,
    percentX, percentY,
    isInside,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
