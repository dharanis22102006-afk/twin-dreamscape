// src/components/DigitalTwin.jsx
import React from "react";
import { Float } from "@react-three/drei";

export default function DigitalTwin(props) {
  return (
    <Float
      speed={2}
rotationIntensity={1}
floatIntensity={2}
     // how much it moves up/down
    >
      <group {...props} scale={0.5}>
        {/* glowing head */}
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="#9b5de5" emissive="#7c3aed" />
        </mesh>

        {/* body */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.4, 0.5, 1.5, 32]} />
          <meshStandardMaterial color="#a78bfa" emissive="#6d28d9" />
        </mesh>
      </group>
    </Float>
  );
}
