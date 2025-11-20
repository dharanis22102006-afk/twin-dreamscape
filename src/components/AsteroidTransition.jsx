// src/components/AsteroidTransition.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function AsteroidTransition({ onComplete }) {
  // auto finish after animation duration (match transition duration below)
  useEffect(() => {
    const timer = setTimeout(onComplete, 900);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    // top-level wrapper to center origin and allow transform across screen
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none", // doesn't block clicks
        zIndex: 2147483647, // very high so it's above canvas/UI
      }}
    >
      {/* glowing asteroid body */}
      <motion.div
        initial={{ x: "-120vw", y: "-30vh", rotate: -35, scale: 0.6, opacity: 0.98 }}
        animate={{ x: "120vw", y: "30vh", rotate: 140, scale: 1.15, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: 160,
          height: 160,
          left: "0",
          top: "0",
          borderRadius: "50%",
          background: "radial-gradient(circle, #ffcc66 0%, #ff9900 45%, #7a3912 100%)",
          boxShadow: "0 0 60px 20px rgba(255,140,0,0.75)",
          filter: "saturate(1.1)",
          transformOrigin: "center",
        }}
      />

      {/* particle tail (simple CSS-based trailing blur) */}
      <motion.div
        initial={{ x: "-100vw", y: "-20vh", opacity: 0.6, scale: 0.9 }}
        animate={{ x: "110vw", y: "40vh", opacity: 0.18, scale: 1.1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "60vw",
          height: 18,
          top: 0,
          left: 0,
          background: "linear-gradient(90deg, rgba(255,200,120,0.9), rgba(255,140,60,0.2), rgba(255,140,60,0))",
          filter: "blur(12px)",
          borderRadius: 9999,
          transformOrigin: "center",
        }}
      />
    </div>
  );
}
