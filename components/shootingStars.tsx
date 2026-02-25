"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    // Adjust UVs for aspect ratio and tilt the coordinates
    vec2 uv = vUv;
    uv.x *= uResolution.x / uResolution.y;
    
    // Rotate coordinate system to make stars fall diagonally
    vec2 rotatedUv = vec2(uv.x + uv.y, uv.y - uv.x);
    
    // Tile the space
    vec2 gridId = floor(rotatedUv * 10.0);
    vec2 gridUv = fract(rotatedUv * 10.0) - 0.5;

    // Random values per grid cell
    float h = hash(gridId);
    float speed = 0.5 + h * 2.0;
    float delay = h * 10.0;
    
    // Animation logic
    float t = mod(uTime * speed + delay, 4.0);
    
    // Define the star (a line that moves)
    float line = smoothstep(0.05, 0.0, length(gridUv - vec2(0.0, 1.5 - t * 2.0)));
    float tail = smoothstep(0.8, 0.0, gridUv.y + (1.5 - t * 2.0)) * step(gridUv.y + (1.5 - t * 2.0), 0.0);
    
    // Combine and add color
    float finalStar = line * tail;
    vec3 color = vec3(0.8, 0.9, 1.0) * finalStar;

    gl_FragColor = vec4(color, finalStar);
  }
`;

export default function ShootingStars() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();

  const uniforms = useRef({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  });

  useFrame((state) => {
    uniforms.current.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -100]} scale={[viewport.width * 2, viewport.height * 2, 1]}>
      <planeGeometry />
      <shaderMaterial
        transparent
        depthWrite={false}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}