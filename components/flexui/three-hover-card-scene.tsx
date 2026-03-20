"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Edges } from "@react-three/drei";
import type { Mesh, Group } from "three";
import * as THREE from "three";

interface SceneProps {
  mouse: { x: number; y: number };
}

// ─── Central wireframe polyhedron with glowing edges ────────────────────────
function CoreGeo({ mouse }: SceneProps) {
  const outerRef = useRef<Mesh>(null);
  const innerRef = useRef<Mesh>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smooth mouse follow
    target.current.x += (mouse.x * 0.5 - target.current.x) * 0.04;
    target.current.y += (mouse.y * 0.5 - target.current.y) * 0.04;

    if (outerRef.current) {
      outerRef.current.rotation.x = target.current.y + t * 0.08;
      outerRef.current.rotation.y = target.current.x + t * 0.12;
      outerRef.current.rotation.z = t * 0.05;
      const s = 1 + Math.sin(t * 0.9) * 0.02;
      outerRef.current.scale.setScalar(s);
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.15;
      innerRef.current.rotation.y = t * 0.2;
      innerRef.current.rotation.z = -t * 0.1;
      const is = 0.62 + Math.sin(t * 1.4) * 0.03;
      innerRef.current.scale.setScalar(is);
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.06} floatIntensity={0.3}>
      <group>
        {/* Outer wireframe dodecahedron */}
        <mesh ref={outerRef}>
          <dodecahedronGeometry args={[1.3, 0]} />
          <meshStandardMaterial
            color="#0a0a0a"
            transparent
            opacity={0.05}
            roughness={0.5}
          />
          <Edges
            threshold={15}
            color="#38bdf8"
            linewidth={1}
          />
        </mesh>

        {/* Inner solid icosahedron — glowing core */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#6d28d9"
            emissiveIntensity={1.5}
            roughness={0.1}
            metalness={0.9}
          />
          <Edges threshold={15} color="#a78bfa" linewidth={1} />
        </mesh>

        {/* Center point light for inner glow */}
        <pointLight
          color="#7c3aed"
          intensity={2}
          distance={4}
          position={[0, 0, 0]}
        />
      </group>
    </Float>
  );
}

// ─── Floating crystal shards ────────────────────────────────────────────────
function Shards() {
  const groupRef = useRef<Group>(null);

  const shards = useMemo(() => {
    const s = (n: number) => {
      const x = Math.sin(n * 9301 + 49297) * 49297;
      return x - Math.floor(x);
    };
    const items = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const r = 2 + s(i * 7 + 1) * 0.6;
      const y = (s(i * 7 + 2) - 0.5) * 2;
      items.push({
        pos: [
          Math.cos(angle) * r,
          y,
          Math.sin(angle) * r,
        ] as [number, number, number],
        rot: [
          s(i * 7 + 3) * Math.PI,
          s(i * 7 + 4) * Math.PI,
          s(i * 7 + 5) * Math.PI,
        ] as [number, number, number],
        scale: 0.06 + s(i * 7 + 6) * 0.08,
        speed: 0.3 + s(i * 7 + 7) * 0.5,
        color: ["#38bdf8", "#a78bfa", "#818cf8", "#67e8f9"][i % 4],
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.04;

    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += 0.005 * shards[i].speed;
      child.rotation.z += 0.003 * shards[i].speed;
      child.position.y =
        shards[i].pos[1] + Math.sin(t * shards[i].speed + i) * 0.15;
    });
  });

  return (
    <group ref={groupRef}>
      {shards.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={s.rot} scale={s.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={s.color}
            emissive={s.color}
            emissiveIntensity={3}
            roughness={0.2}
            metalness={0.8}
          />
          <Edges threshold={15} color={s.color} linewidth={1} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Orbital rings ──────────────────────────────────────────────────────────
function Orbits() {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.06;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.08;
  });

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.004, 16, 128, Math.PI * 1.4]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={3}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh rotation={[1.2, 0.6, 0]}>
        <torusGeometry args={[1.7, 0.003, 16, 128, Math.PI * 1.1]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#a78bfa"
          emissiveIntensity={3}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

// ─── Dust particles ─────────────────────────────────────────────────────────
function Dust() {
  const ref = useRef<Group>(null);

  const particles = useMemo(() => {
    const s = (n: number) => {
      const x = Math.sin(n * 9301 + 49297) * 49297;
      return x - Math.floor(x);
    };
    const colors = ["#38bdf8", "#a78bfa", "#67e8f9", "#818cf8"];
    return Array.from({ length: 30 }).map((_, i) => {
      const theta = s(i * 5 + 1) * Math.PI * 2;
      const phi = Math.acos(2 * s(i * 5 + 2) - 1);
      const r = 2.5 + s(i * 5 + 3) * 1.5;
      return {
        pos: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ] as [number, number, number],
        size: 0.008 + s(i * 5 + 4) * 0.012,
        color: colors[Math.floor(s(i * 5 + 5) * colors.length)],
      };
    });
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <group ref={ref}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshStandardMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={4}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Scene ──────────────────────────────────────────────────────────────────
export function ThreeHoverCardScene({ mouse }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 38 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-3, -1, 4]} intensity={0.4} color="#38bdf8" />
      <pointLight position={[0, 3, 3]} intensity={1} color="#a78bfa" distance={10} />
      <pointLight position={[-3, -2, 2]} intensity={0.4} color="#38bdf8" distance={8} />

      <CoreGeo mouse={mouse} />
      <Shards />
      <Orbits />
      <Dust />

      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.15}
        scale={8}
        blur={2.5}
        far={4}
        color="#7c3aed"
      />
    </Canvas>
  );
}
