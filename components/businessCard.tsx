"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export default function BusinessCard() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle float
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.08;
  });

  const scale = Math.min(viewport.width / 8, 1);

  return (
    <group ref={groupRef} scale={scale}>
      <RoundedBox args={[5.4, 3.2, 0.06]} radius={0.12} smoothness={6}>
        <meshStandardMaterial
          color="#fefefe"
          metalness={0.1}
          roughness={0.8}
          envMapIntensity={1.5}
        />
      </RoundedBox>

      <Text
        position={[-0.3, 0.45, 0.04]}
        fontSize={0.52}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        Your Name
      </Text>

      {/* Title */}
      <Text
        position={[-0.3, 0.0, 0.04]}
        fontSize={0.18}
        color="#c9a84c"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
      >
        FULL STACK ENGINEER
      </Text>

      {/* Contact info */}
      <Text
        position={[-0.3, -0.5, 0.04]}
        fontSize={0.13}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        hello@yourname.dev  ·  github.com/yourname
      </Text>
    </group>
  );
}