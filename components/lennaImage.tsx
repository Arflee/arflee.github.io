"use client";

import { textureVertexShader } from "@/config/postProcessingEffects";
import { useThree, useLoader } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { TextureLoader } from "three";
import { useMemo } from "react";
import * as THREE from "three";

export default function LennaImage({
  selectedShader,
  uniforms
}: {
  selectedShader: string;
  uniforms?: Record<string, any>;
}) {
  const { viewport } = useThree();
  const texture = useLoader(TextureLoader, "/Lenna.png");

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          ...uniforms
        },
        vertexShader: textureVertexShader,
        fragmentShader: selectedShader,
      }),
    [selectedShader, uniforms]
  );
  return (
    <>
      <mesh key={selectedShader}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <primitive object={material} attach="material" />
      </mesh>
      <OrthographicCamera makeDefault position={[0, 0, 1]} />
    </>
  );
}
