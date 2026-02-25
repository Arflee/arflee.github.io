"use client";

import { OrbitControls, AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import BusinessCard from "./businessCard";
import { Suspense } from "react";
import ShootingStars from "./shootingStars";

export default function BusinessCardScene() {
  return (
    <>
      <OrbitControls
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        enableZoom={false}
      />
      {/* <ShootingStars/> */}
      <hemisphereLight intensity={0.4} groundColor="gray" />

      <directionalLight
        position={[3, 5, 3]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <directionalLight
        position={[-3, 3, -3]}
        intensity={0.8}
        color="#ffffff"
      />

      <directionalLight
        position={[0, 3, -5]}
        intensity={0.6}
        color="#ffffff"
      />

      {/* Circular soft shadows */}
      <AccumulativeShadows
        temporal
        frames={100}
        alphaTest={0.5}
        opacity={0.6}
        scale={12}
        position={[0, -5 / 6, 0]} // bottom of RoundedBox
      >
        <RandomizedLight
          amount={8}         // number of soft lights
          radius={2.5}       // smaller radius = tighter circle
          intensity={1.5}    // lower intensity for softer shadow
          ambient={0.5}      // ambient contribution
          position={[1, 5, -3]} // slightly above & around card
        />
      </AccumulativeShadows>

        <BusinessCard />
    </>
  );
}