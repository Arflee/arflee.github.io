"use client";

import { RoundedBox, Text } from "@react-three/drei";

export default function BusinessCard() {
  const linkedIn = "https://www.linkedin.com/in/arflee/";
  const github = "https://github.com/Arflee";

  const openUrl = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <group position={[0, 0, 0]}>
      <RoundedBox
        args={[3, 5 / 3, 0.015]}
        radius={0.007}
        steps={1}
        smoothness={4}
        bevelSegments={4}
        creaseAngle={0.4}
        castShadow
      >
        <meshPhysicalMaterial
          roughness={0.5}
          metalness={0.05}
          color="#f3f3f3"
        />
      </RoundedBox>

      <Text
        position={[0, 0.25, 0.008]}
        fontSize={0.18}
        color="#111111"
        anchorX="center"
        anchorY="middle"
      >
        Matvei Sushinskii
      </Text>

      <Text
        position={[0, 0, 0.008]}
        fontSize={0.12}
        color="#0077b5"
        anchorX="center"
        anchorY="middle"
        onClick={() => openUrl(linkedIn)}
        onPointerOver={(e) => (document.body.style.cursor = "pointer")}
        onPointerOut={(e) => (document.body.style.cursor = "default")}
      >
        LinkedIn
      </Text>

      <Text
        position={[0, -0.25, 0.008]}
        fontSize={0.12}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        onClick={() => openUrl(github)}
        onPointerOver={(e) => (document.body.style.cursor = "pointer")}
        onPointerOut={(e) => (document.body.style.cursor = "default")}
      >
        Github
      </Text>
    </group>
  );
}