import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import * as THREE from 'three';

const GOLD = '#e8b65a';
const GOLD_BRIGHT = '#ffd97a';

const tri = (points: [number, number][]): [number, number, number][] =>
  [...points, points[0]].map(([x, y]) => [x, y, 0]);

const circle = (radius: number, segments = 96): [number, number, number][] => {
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    pts.push([Math.cos(t) * radius, Math.sin(t) * radius, 0]);
  }
  return pts;
};

const petalPoints = (segs = 32): [number, number, number][] => {
  const pts: [number, number, number][] = [];
  for (let j = 0; j <= segs; j++) {
    const t = (j / segs) * Math.PI * 2;
    pts.push([Math.cos(t) * 0.18, 2.4 + Math.sin(t) * 0.35, 0]);
  }
  return pts;
};

const SriYantraMesh: React.FC = () => {
  const group = useRef<THREE.Group>(null);

  const up = useMemo(
    () => [
      tri([[0, 2.2], [1.9, -1.1], [-1.9, -1.1]]),
      tri([[0, 1.7], [1.55, -0.85], [-1.55, -0.85]]),
      tri([[0, 1.25], [1.2, -0.6], [-1.2, -0.6]]),
      tri([[0, 0.85], [0.85, -0.4], [-0.85, -0.4]]),
    ],
    [],
  );
  const down = useMemo(
    () => [
      tri([[0, -2.0], [1.9, 0.95], [-1.9, 0.95]]),
      tri([[0, -1.55], [1.55, 0.75], [-1.55, 0.75]]),
      tri([[0, -1.15], [1.2, 0.55], [-1.2, 0.55]]),
      tri([[0, -0.75], [0.85, 0.35], [-0.85, 0.35]]),
      tri([[0, -0.4], [0.5, 0.2], [-0.5, 0.2]]),
    ],
    [],
  );
  const circles = useMemo(() => [circle(2.55), circle(2.75), circle(3.05)], []);
  const square = useMemo(() => {
    const s = 3.3;
    return [
      [-s, -s, 0],
      [s, -s, 0],
      [s, s, 0],
      [-s, s, 0],
      [-s, -s, 0],
    ] as [number, number, number][];
  }, []);
  const petal = useMemo(() => petalPoints(), []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.3) * 0.4;
    group.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    group.current.rotation.z = t * 0.05;
  });

  return (
    <group ref={group}>
      {/* Glowing bindu */}
      <mesh>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshBasicMaterial color={GOLD_BRIGHT} />
      </mesh>
      <pointLight color={GOLD_BRIGHT} intensity={2} distance={4} />

      {up.map((pts, i) => (
        <Line key={`u${i}`} points={pts} color={GOLD} lineWidth={1.5} transparent opacity={0.95} />
      ))}
      {down.map((pts, i) => (
        <Line key={`d${i}`} points={pts} color={GOLD_BRIGHT} lineWidth={1.5} transparent opacity={0.85} />
      ))}
      {circles.map((pts, i) => (
        <Line key={`c${i}`} points={pts} color={GOLD} lineWidth={1} transparent opacity={0.55 - i * 0.1} />
      ))}
      {Array.from({ length: 16 }).map((_, i) => (
        <group key={`p${i}`} rotation={[0, 0, (i * Math.PI * 2) / 16]}>
          <Line points={petal} color={GOLD} lineWidth={1} transparent opacity={0.45} />
        </group>
      ))}
      <Line points={square} color={GOLD} lineWidth={1} transparent opacity={0.3} />
    </group>
  );
};

const SriYantra3D: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.6} />
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <SriYantraMesh />
      </Float>
    </Canvas>
  );
};

export default SriYantra3D;
