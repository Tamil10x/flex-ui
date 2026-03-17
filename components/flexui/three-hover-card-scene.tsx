"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Icosahedron,
  MeshDistortMaterial,
  Float,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import type { Mesh } from "three";

interface SceneProps {
  mouse: { x: number; y: number };
}

function RotatingGeo({ mouse }: SceneProps) {
  const meshRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Smooth auto-rotation
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.25;

    // Mouse-reactive tilt
    meshRef.current.rotation.x += mouse.y * delta * 1.5;
    meshRef.current.rotation.z += mouse.x * delta * 1.5;

    // Breathing scale
    const breathe = 1 + Math.sin(t * 1.5) * 0.03;
    meshRef.current.scale.setScalar(breathe);

    // Ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.3;
      ringRef.current.rotation.y += delta * 0.4;
      ringRef.current.rotation.z = Math.cos(t * 0.3) * 0.2;
    }
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        {/* Main icosahedron */}
        <Icosahedron ref={meshRef} args={[1.2, 4]}>
          <MeshDistortMaterial
            color="#4f8fff"
            roughness={0.15}
            metalness={0.95}
            distort={0.25}
            speed={2.5}
          />
        </Icosahedron>

        {/* Orbiting ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.9, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Glow sphere */}
        <mesh scale={1.6}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#4f8fff"
            transparent
            opacity={0.02}
            emissive="#4f8fff"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Particles() {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={ref as React.RefObject<never>}>
      {Array.from({ length: 40 }).map((_, i) => {
        const theta = (i / 40) * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2.5 + Math.random() * 1.5;
        return (
          <mesh
            key={i}
            position={[
              r * Math.sin(phi) * Math.cos(theta),
              r * Math.sin(phi) * Math.sin(theta),
              r * Math.cos(phi),
            ]}
          >
            <sphereGeometry args={[0.008 + Math.random() * 0.012, 8, 8]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function ThreeHoverCardScene({ mouse }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      {/* Lighting rig */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-3, -2, 4]} intensity={0.4} color="#38bdf8" />
      <pointLight position={[0, 2, 3]} intensity={0.8} color="#4f8fff" distance={8} />
      <pointLight position={[-2, -1, 2]} intensity={0.3} color="#a78bfa" distance={6} />

      <RotatingGeo mouse={mouse} />
      <Particles />

      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.25}
        scale={8}
        blur={2}
        far={4}
        color="#4f8fff"
      />
    </Canvas>
  );
}
