"use client";
import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InfiniteCanvasProps {
  children: ReactNode;
  className?: string;
  /** Initial zoom level */
  initialZoom?: number;
  /** Min zoom */
  minZoom?: number;
  /** Max zoom */
  maxZoom?: number;
  /** Show grid background */
  showGrid?: boolean;
  /** Grid size in px */
  gridSize?: number;
}

export function InfiniteCanvas({
  children,
  className,
  initialZoom = 1,
  minZoom = 0.3,
  maxZoom = 3,
  showGrid = true,
  gridSize = 40,
}: InfiniteCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(initialZoom);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const lastTouchDist = useRef<number | null>(null);
  const lastTouchCenter = useRef<{ x: number; y: number } | null>(null);

  // ── Mouse drag ──────────────────────────────────────────────
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      setIsDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    },
    [pan]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPan({ x: dragStart.current.panX + dx, y: dragStart.current.panY + dy });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ── Mouse wheel zoom toward cursor ─────────────────────────
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      const delta = -e.deltaY * 0.001;
      const newZoom = Math.min(maxZoom, Math.max(minZoom, zoom * (1 + delta)));
      const scale = newZoom / zoom;

      // Zoom toward cursor position
      const newPanX = cursorX - scale * (cursorX - pan.x);
      const newPanY = cursorY - scale * (cursorY - pan.y);

      setZoom(newZoom);
      setPan({ x: newPanX, y: newPanY });
    },
    [zoom, pan, minZoom, maxZoom]
  );

  // ── Touch: pinch to zoom, two-finger drag ──────────────────
  const getTouchDist = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getTouchCenter = (touches: React.TouchList) => ({
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2,
  });

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        lastTouchDist.current = getTouchDist(e.touches);
        lastTouchCenter.current = getTouchCenter(e.touches);
      } else if (e.touches.length === 1) {
        setIsDragging(true);
        dragStart.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          panX: pan.x,
          panY: pan.y,
        };
      }
    },
    [pan]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2 && lastTouchDist.current !== null && lastTouchCenter.current !== null) {
        e.preventDefault();
        const container = containerRef.current;
        if (!container) return;

        const newDist = getTouchDist(e.touches);
        const newCenter = getTouchCenter(e.touches);
        const scale = newDist / lastTouchDist.current;
        const newZoom = Math.min(maxZoom, Math.max(minZoom, zoom * scale));
        const actualScale = newZoom / zoom;

        const rect = container.getBoundingClientRect();
        const cx = lastTouchCenter.current.x - rect.left;
        const cy = lastTouchCenter.current.y - rect.top;

        const dx = newCenter.x - lastTouchCenter.current.x;
        const dy = newCenter.y - lastTouchCenter.current.y;

        setPan({
          x: cx - actualScale * (cx - pan.x) + dx,
          y: cy - actualScale * (cy - pan.y) + dy,
        });
        setZoom(newZoom);

        lastTouchDist.current = newDist;
        lastTouchCenter.current = newCenter;
      } else if (e.touches.length === 1 && isDragging) {
        const dx = e.touches[0].clientX - dragStart.current.x;
        const dy = e.touches[0].clientY - dragStart.current.y;
        setPan({ x: dragStart.current.panX + dx, y: dragStart.current.panY + dy });
      }
    },
    [zoom, pan, isDragging, minZoom, maxZoom]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    lastTouchDist.current = null;
    lastTouchCenter.current = null;
  }, []);

  // ── Double-click to reset ──────────────────────────────────
  const handleDoubleClick = useCallback(() => {
    setPan({ x: 0, y: 0 });
    setZoom(initialZoom);
  }, [initialZoom]);

  // Stop dragging if mouse leaves the window
  useEffect(() => {
    const handleGlobalUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalUp);
    return () => window.removeEventListener("mouseup", handleGlobalUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-zinc-950",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
    >
      {/* Grid background */}
      {showGrid && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize * zoom}px ${gridSize * zoom}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px`,
          }}
        />
      )}

      {/* Transform layer */}
      <motion.div
        className="origin-top-left"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        }}
        transition={{ duration: 0 }}
      >
        {children}
      </motion.div>

      {/* Zoom indicator */}
      <div className="pointer-events-none absolute bottom-4 right-4 rounded-lg border border-white/[0.06] bg-zinc-900/80 px-3 py-1.5 text-xs font-mono text-zinc-400 backdrop-blur-sm">
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
}
