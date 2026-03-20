"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface CosmicEyeProps {
  /** Primary eye color */
  color?: string;
  /** Secondary accent color */
  accentColor?: string;
  /** Intensity of the glow (0.5-3) */
  intensity?: number;
  /** Pupil size (0.2-1.0) */
  pupilSize?: number;
  /** Iris width (0.1-0.5) */
  irisWidth?: number;
  /** Outer glow intensity */
  glowIntensity?: number;
  /** Overall scale */
  scale?: number;
  /** Noise pattern scale */
  noiseScale?: number;
  /** How much the pupil follows cursor (0-2) */
  pupilFollow?: number;
  /** Animation speed */
  speed?: number;
  /** Additional className */
  className?: string;
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

// High-quality flame/nebula eye shader using polar-coordinate noise sampling
const FRAGMENT = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform sampler2D uNoiseTex;
uniform float uPupilSize;
uniform float uIrisWidth;
uniform float uGlowIntensity;
uniform float uIntensity;
uniform float uScale;
uniform float uNoiseScale;
uniform vec2 uMouse;
uniform float uPupilFollow;
uniform vec3 uColor;
uniform vec3 uAccent;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y;
  uv /= uScale;
  float t = uTime;

  // Polar coordinates for radial flame patterns
  float polarR = length(uv) * 2.0;
  float polarA = (2.0 * atan(uv.x, uv.y)) / 6.2832 * 0.3;
  vec2 polarUV = vec2(polarR, polarA);

  // Multi-layer noise sampling in polar space — creates flame tendrils
  vec4 n1 = texture2D(uNoiseTex, polarUV * vec2(0.2, 7.0) * uNoiseScale + vec2(-t * 0.08, 0.0));
  vec4 n2 = texture2D(uNoiseTex, polarUV * vec2(0.3, 4.0) * uNoiseScale + vec2(-t * 0.15, 0.0));
  vec4 n3 = texture2D(uNoiseTex, polarUV * vec2(0.1, 5.0) * uNoiseScale + vec2(-t * 0.1, 0.0));
  vec4 n4 = texture2D(uNoiseTex, polarUV * vec2(0.15, 6.0) * uNoiseScale + vec2(-t * 0.12, 0.05));

  float distMask = 1.0 - length(uv);

  // ── Inner iris ring ──────────────────────────────────
  float inner = clamp(-1.0 * ((distMask - 0.7) / uIrisWidth), 0.0, 1.0);
  inner = (inner * distMask - 0.2) / 0.28;
  inner += n1.r - 0.5;
  inner *= 1.4;
  inner = clamp(inner, 0.0, 1.0);

  // ── Outer iris ring ──────────────────────────────────
  float outer = clamp(-1.0 * ((distMask - 0.5) / 0.2), 0.0, 1.0);
  outer = (outer * distMask - 0.1) / 0.38;
  outer += n3.r - 0.5;
  outer *= 1.3;
  outer = clamp(outer, 0.0, 1.0);

  float irisTotal = inner + outer;

  // ── Inner eye glow ──────────────────────────────────
  float innerGlow = distMask - 0.2;
  innerGlow *= n2.r * 2.0;

  // ── Pupil with cursor tracking ──────────────────────
  vec2 pupilOff = uMouse * uPupilFollow * 0.12;
  vec2 pupilUV = uv - pupilOff;
  float pupil = 1.0 - length(pupilUV * vec2(9.0, 2.3));
  pupil *= uPupilSize;
  pupil = clamp(pupil, 0.0, 1.0);
  pupil /= 0.35;

  // ── Outer corona glow ──────────────────────────────
  float corona = 1.0 - length(uv * vec2(0.5, 1.5));
  corona = clamp(corona + 0.5, 0.0, 1.0);
  corona += n3.r - 0.5;
  float bgGlow = corona;

  corona = pow(corona, 2.0);
  corona += distMask;
  corona *= uGlowIntensity;
  corona = clamp(corona, 0.0, 1.0);
  corona *= pow(1.0 - distMask, 2.0) * 2.5;

  // ── Background ambient glow ─────────────────────────
  bgGlow += distMask;
  bgGlow = pow(bgGlow, 0.5);
  bgGlow *= 0.15;

  // ── Color mixing ────────────────────────────────────
  // Blend primary and accent based on radial position
  float radialBlend = smoothstep(0.3, 0.8, length(uv));
  vec3 eyeColor = mix(uColor, uAccent, radialBlend * 0.5 + n4.r * 0.3);

  // Combine all layers
  float flame = clamp(max(irisTotal + innerGlow, corona + bgGlow) - pupil, 0.0, 3.0);
  vec3 col = eyeColor * uIntensity * flame;

  // Add subtle highlight on pupil edge
  float pupilEdge = smoothstep(0.3, 0.35, length(pupilUV * vec2(9.0, 2.3)));
  col += eyeColor * pupilEdge * 0.05 * uIntensity;

  gl_FragColor = vec4(col, 1.0);
}
`;

// Generate high-quality noise texture with multiple octaves
function generateNoise(size: number): Uint8Array {
  const data = new Uint8Array(size * size * 4);

  function hash(x: number, y: number, s: number): number {
    let n = x * 374761393 + y * 668265263 + s * 1274126177;
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
  }

  function noise(px: number, py: number, freq: number, seed: number): number {
    const fx = (px / size) * freq;
    const fy = (py / size) * freq;
    const ix = Math.floor(fx);
    const iy = Math.floor(fy);
    const tx = fx - ix;
    const ty = fy - iy;
    const w = freq | 0;
    const mod = (a: number) => ((a % w) + w) % w;
    const v00 = hash(mod(ix), mod(iy), seed);
    const v10 = hash(mod(ix + 1), mod(iy), seed);
    const v01 = hash(mod(ix), mod(iy + 1), seed);
    const v11 = hash(mod(ix + 1), mod(iy + 1), seed);
    return v00 * (1 - tx) * (1 - ty) + v10 * tx * (1 - ty) + v01 * (1 - tx) * ty + v11 * tx * ty;
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let v = 0;
      let amp = 0.4;
      let total = 0;
      for (let o = 0; o < 8; o++) {
        const f = 32 * (1 << o);
        v += amp * noise(x, y, f, o * 31);
        total += amp;
        amp *= 0.65;
      }
      v /= total;
      v = (v - 0.5) * 2.2 + 0.5;
      v = Math.max(0, Math.min(1, v));
      const val = Math.round(v * 255);
      const i = (y * size + x) * 4;
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }
  }
  return data;
}

function hexToVec3(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16) / 255,
    parseInt(h.substring(2, 4), 16) / 255,
    parseInt(h.substring(4, 6), 16) / 255,
  ];
}

export function CosmicEye({
  color = "#8b5cf6",
  accentColor = "#22d3ee",
  intensity = 1.5,
  pupilSize = 0.6,
  irisWidth = 0.25,
  glowIntensity = 0.35,
  scale = 0.8,
  noiseScale = 1.0,
  pupilFollow = 1.0,
  speed = 1.0,
  className,
}: CosmicEyeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, sx: 0, sy: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    const container = containerRef.current;

    let raf: number;
    let canvas: HTMLCanvasElement | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let glCtx: any = null;

    import("ogl").then(({ Renderer, Program, Mesh, Triangle, Texture }) => {
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

      // High-quality 8-octave noise texture
      const noiseData = generateNoise(256);
      const noiseTex = new Texture(gl, {
        image: noiseData,
        width: 256,
        height: 256,
        generateMipmaps: false,
      });
      noiseTex.minFilter = gl.LINEAR;
      noiseTex.magFilter = gl.LINEAR;
      noiseTex.wrapS = gl.REPEAT;
      noiseTex.wrapT = gl.REPEAT;

      const program = new Program(gl, {
        vertex: VERTEX,
        fragment: FRAGMENT,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height] },
          uNoiseTex: { value: noiseTex },
          uPupilSize: { value: pupilSize },
          uIrisWidth: { value: irisWidth },
          uGlowIntensity: { value: glowIntensity },
          uIntensity: { value: intensity },
          uScale: { value: scale },
          uNoiseScale: { value: noiseScale },
          uMouse: { value: [0, 0] },
          uPupilFollow: { value: pupilFollow },
          uColor: { value: hexToVec3(color) },
          uAccent: { value: hexToVec3(accentColor) },
        },
      });

      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

      function resize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h);
        program.uniforms.uResolution.value = [w * renderer.dpr, h * renderer.dpr, w / h];
      }
      resize();
      window.addEventListener("resize", resize);

      const onMove = (e: MouseEvent) => {
        const r = container.getBoundingClientRect();
        mouseRef.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        mouseRef.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      };
      const onLeave = () => { mouseRef.current.x = 0; mouseRef.current.y = 0; };
      container.addEventListener("mousemove", onMove);
      container.addEventListener("mouseleave", onLeave);

      function tick(t: number) {
        raf = requestAnimationFrame(tick);
        mouseRef.current.sx += (mouseRef.current.x - mouseRef.current.sx) * 0.05;
        mouseRef.current.sy += (mouseRef.current.y - mouseRef.current.sy) * 0.05;
        program.uniforms.uMouse.value = [mouseRef.current.sx, mouseRef.current.sy];
        program.uniforms.uTime.value = t * 0.001 * speed;
        renderer.render({ scene: mesh });
      }
      raf = requestAnimationFrame(tick);

      // Store cleanup
      (container as HTMLElement & { _cleanup?: () => void })._cleanup = () => {
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
      (container as HTMLElement & { _cleanup?: () => void })._cleanup?.();
    };
  }, [mounted, color, accentColor, intensity, pupilSize, irisWidth, glowIntensity, scale, noiseScale, pupilFollow, speed]);

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
