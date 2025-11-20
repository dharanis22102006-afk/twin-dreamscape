// src/pages/Home.js
import React from "react";

export default function Home() {
  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
      }}
    >
      <h1
        style={{
          fontSize: "2.8rem",
          fontWeight: "bold",
          marginBottom: "10px",
          marginTop: "0px",
          color: "#ffffff",
          textShadow: "0 4px 14px rgba(0,0,0,0.6)",
        }}
      >
        👋 Welcome to Dharani’s Digital Twin
      </h1>

      <p
        style={{
          fontSize: "1.15rem",
          opacity: 0.92,
          color: "#e6e6e6",
          textShadow: "0 2px 8px rgba(0,0,0,0.45)",
        }}
      >
        Ask me about my projects, contact info, or portfolio!
      </p>
    </div>
  );
}
