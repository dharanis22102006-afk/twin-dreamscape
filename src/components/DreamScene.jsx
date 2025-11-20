// src/components/DreamScene.jsx
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Sparkles, Float } from "@react-three/drei";
import DigitalTwin from "./DigitalTwin";
import FloatingIsland from "./FloatingIsland";

export default function DreamScene() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,             // behind UI (UI uses zIndex 5/10)
        pointerEvents: "none", // allow clicks to pass to UI
      }}
    >
      <Canvas
        camera={{ position: [0, 3, 10], fov: 55 }}
        gl={{ antialias: true, alpha: false }} // solid black background
        style={{ background: "black", width: "100%", height: "100%" }}
      >
        {/* Lighting tuned for visibility */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <pointLight position={[0, 4, 8]} intensity={1.2} color="#a78bfa" />

        {/* Stars */}
        <Stars
          radius={150}
          depth={80}
          count={6000}
          factor={4}
          saturation={0}
          fade
          speed={0.4}
        />

        {/* Sparkles around the twin */}
        <Sparkles
          count={90}
          scale={6}
          size={2}
          speed={0.4}
          color="#c084fc"
          position={[0, 1, 0]}
        />

        <Suspense fallback={null}>
          <FloatingIsland position={[0, -3, 0]} scale={1.2} />
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
            <DigitalTwin position={[0, -0.1, 0]} scale={0.35} />
          </Float>
        </Suspense>

        <OrbitControls enableZoom={true} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.9} />
      </Canvas>
    </div>
  );
}
