"use client";
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { cn } from "@/lib/utils";

interface IconCloudProps {
  /** Array of icon React nodes or image URLs */
  icons: React.ReactNode[];
  className?: string;
  /** Rotation speed */
  speed?: number;
  /** Cloud radius */
  radius?: number;
  /** Size of each icon in px */
  iconSize?: number;
}

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

function fibonacciSphere(count: number) {
  const points: { x: number; y: number; z: number }[] = [];
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // -1 to 1
    const r = Math.sqrt(1 - y * y);
    const theta = GOLDEN_RATIO * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push({ x, y, z });
  }
  return points;
}

function rotateY(
  point: { x: number; y: number; z: number },
  angle: number
): { x: number; y: number; z: number } {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos - point.z * sin,
    y: point.y,
    z: point.x * sin + point.z * cos,
  };
}

function rotateX(
  point: { x: number; y: number; z: number },
  angle: number
): { x: number; y: number; z: number } {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x,
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos,
  };
}

export function IconCloud({
  icons,
  className,
  speed = 0.5,
  radius = 200,
  iconSize = 40,
}: IconCloudProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef({ dragging: false, lastX: 0, lastY: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const basePoints = useMemo(
    () => fibonacciSphere(icons.length),
    [icons.length]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePositions = useCallback(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll<HTMLElement>(
      "[data-cloud-icon]"
    );
    items.forEach((el, i) => {
      const point = basePoints[i];
      if (!point) return;
      let rotated = rotateY(point, angleRef.current.y);
      rotated = rotateX(rotated, angleRef.current.x);
      const x = rotated.x * radius;
      const y = rotated.y * radius;
      const z = rotated.z * radius;
      // Map z from [-radius, radius] to [0.4, 1] for scale & opacity
      const normalZ = (rotated.z + 1) / 2; // 0..1
      const scale = 0.4 + normalZ * 0.6;
      const opacity = 0.25 + normalZ * 0.75;
      el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
      el.style.opacity = String(opacity);
      el.style.zIndex = String(Math.round(normalZ * 100));
    });
  }, [basePoints, radius]);

  useEffect(() => {
    if (!mounted) return;

    let running = true;
    const animate = () => {
      if (!running) return;
      if (!dragRef.current.dragging) {
        angleRef.current.y += speed * 0.002;
        // Apply inertia from drag
        angleRef.current.x += velocityRef.current.x;
        angleRef.current.y += velocityRef.current.y;
        velocityRef.current.x *= 0.95;
        velocityRef.current.y *= 0.95;
      }
      updatePositions();
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, speed, updatePositions]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragRef.current.dragging = true;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
      velocityRef.current = { x: 0, y: 0 };
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current.dragging) return;
      const dx = e.clientX - dragRef.current.lastX;
      const dy = e.clientY - dragRef.current.lastY;
      angleRef.current.y += dx * 0.005;
      angleRef.current.x += dy * 0.005;
      velocityRef.current.x = dy * 0.001;
      velocityRef.current.y = dx * 0.001;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
      updatePositions();
    },
    [updatePositions]
  );

  const handlePointerUp = useCallback(() => {
    dragRef.current.dragging = false;
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center",
          className
        )}
        style={{
          width: radius * 2 + iconSize * 2,
          height: radius * 2 + iconSize * 2,
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none",
        className
      )}
      style={{
        width: radius * 2 + iconSize * 2,
        height: radius * 2 + iconSize * 2,
        perspective: "800px",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {icons.map((icon, i) => (
        <span
          key={i}
          data-cloud-icon=""
          className="pointer-events-none absolute flex items-center justify-center transition-none"
          style={{
            width: iconSize,
            height: iconSize,
            left: "50%",
            top: "50%",
            marginLeft: -iconSize / 2,
            marginTop: -iconSize / 2,
            willChange: "transform, opacity",
          }}
        >
          {icon}
        </span>
      ))}
    </div>
  );
}
