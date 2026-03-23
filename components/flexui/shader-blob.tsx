"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface ShaderBlobProps {
  className?: string;
  /** Primary blob color */
  color?: string;
  /** Secondary color for gradient */
  accentColor?: string;
  /** Blob speed */
  speed?: number;
  /** Blob complexity/noise */
  complexity?: number;
  /** React to cursor */
  interactive?: boolean;
}

function hexToVec3(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16) / 255,
    parseInt(h.substring(2, 4), 16) / 255,
    parseInt(h.substring(4, 6), 16) / 255,
  ];
}

const VERTEX = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const FRAGMENT = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uSpeed;
uniform float uComplexity;
uniform float uInteractive;

// Hash-based pseudo-random
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// Smooth noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Fractal Brownian Motion
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - uResolution.xy * 0.5) / min(uResolution.x, uResolution.y);

  float t = uTime * 0.2 * uSpeed;

  // Mouse influence: pull the blob toward cursor
  vec2 mouse = uMouse * uInteractive;
  vec2 offset = mouse * 0.15;
  uv -= offset;

  // Distance from center with noise distortion
  float dist = length(uv);
  float n = fbm(uv * 3.0 * uComplexity + t);
  float n2 = fbm(uv * 2.0 * uComplexity - t * 0.7 + vec2(5.0));
  dist += n * 0.15 * uComplexity;

  // Blob mask with smooth edges
  float blob = 1.0 - smoothstep(0.28, 0.35, dist);

  // Color gradient based on noise
  vec3 col = mix(uColor1, uColor2, n * 0.8 + n2 * 0.2);

  // Apply blob mask
  col *= blob;

  // Inner glow — brighter in center
  float innerGlow = exp(-dist * 4.0) * 0.3;
  col += mix(uColor1, uColor2, 0.5) * innerGlow;

  // Outer glow — emissive halo
  float outerGlow = 1.0 - smoothstep(0.3, 0.6, dist);
  col += uColor1 * 0.12 * outerGlow * (1.0 - blob);

  // Subtle pulsing
  float pulse = 1.0 + 0.05 * sin(uTime * 1.5 * uSpeed);
  col *= pulse;

  // Background — very faint radial
  vec3 bg = mix(uColor1, uColor2, 0.5) * 0.02 * (1.0 - smoothstep(0.0, 1.0, dist));
  col += bg * (1.0 - blob);

  gl_FragColor = vec4(col, 1.0);
}
`;

export function ShaderBlob({
  className,
  color = "#8B5CF6",
  accentColor = "#389CFD",
  speed = 1.0,
  complexity = 1.0,
  interactive = true,
}: ShaderBlobProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, sx: 0, sy: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || !interactive) return;
      const r = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouseRef.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    },
    [interactive]
  );

  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    const container = containerRef.current;

    let raf: number;
    let canvas: HTMLCanvasElement | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let glCtx: any = null;

    import("ogl").then(({ Renderer, Program, Mesh, Triangle }) => {
      if (!container) return;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: false,
      });
      const gl = renderer.gl;
      glCtx = gl;
      canvas = gl.canvas as HTMLCanvasElement;
      container.appendChild(canvas);
      gl.clearColor(0, 0, 0, 1);

      const program = new Program(gl, {
        vertex: VERTEX,
        fragment: FRAGMENT,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [gl.canvas.width, gl.canvas.height] },
          uMouse: { value: [0, 0] },
          uColor1: { value: hexToVec3(color) },
          uColor2: { value: hexToVec3(accentColor) },
          uSpeed: { value: speed },
          uComplexity: { value: complexity },
          uInteractive: { value: interactive ? 1.0 : 0.0 },
        },
      });

      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

      function resize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h);
        program.uniforms.uResolution.value = [w * renderer.dpr, h * renderer.dpr];
      }
      resize();
      window.addEventListener("resize", resize);

      const onLeave = () => {
        mouseRef.current.x = 0;
        mouseRef.current.y = 0;
      };
      container.addEventListener("mousemove", onMove);
      container.addEventListener("mouseleave", onLeave);

      function tick(t: number) {
        raf = requestAnimationFrame(tick);
        mouseRef.current.sx += (mouseRef.current.x - mouseRef.current.sx) * 0.05;
        mouseRef.current.sy += (mouseRef.current.y - mouseRef.current.sy) * 0.05;
        program.uniforms.uMouse.value = [mouseRef.current.sx, mouseRef.current.sy];
        program.uniforms.uTime.value = t * 0.001;
        renderer.render({ scene: mesh });
      }
      raf = requestAnimationFrame(tick);

      (container as HTMLElement & { _sbCleanup?: () => void })._sbCleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        container.removeEventListener("mousemove", onMove);
        container.removeEventListener("mouseleave", onLeave);
        if (canvas && container.contains(canvas)) container.removeChild(canvas);
        glCtx?.getExtension("WEBGL_lose_context")?.loseContext();
      };
    });

    return () => {
      cancelAnimationFrame(raf);
      (container as HTMLElement & { _sbCleanup?: () => void })._sbCleanup?.();
    };
  }, [mounted, color, accentColor, speed, complexity, interactive, onMove]);

  if (!mounted) {
    return <div className={cn("relative w-full h-full min-h-[200px] bg-black", className)} />;
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full min-h-[200px] overflow-hidden bg-black", className)}
      style={{ touchAction: "none" }}
    />
  );
}
