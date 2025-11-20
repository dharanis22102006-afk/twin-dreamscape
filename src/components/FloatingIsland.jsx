import React from "react";
import { Float } from "@react-three/drei";

export default function FloatingIsland({ position = [0, -2, 0] }) {
  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh position={position}>
        <cylinderGeometry args={[3, 5, 1.5, 32]} />
        <meshStandardMaterial color="#4ade80" emissive="#16a34a" />
      </mesh>
    </Float>
  );
}
