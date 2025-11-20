import React from "react";
import BackButton from "../components/BackButton";

export default function Projects() {
  return (
    <div style={{ textAlign: "center" }}>
      <BackButton />
      <h1>📁 Projects</h1>
      <p>Here are some of my featured works!</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>🛒 E-commerce Website — React + Firebase</li>
        <li>💬 Mental Health Platform — MERN Stack</li>
        <li>🎨 Portfolio Website — React + Framer Motion</li>
      </ul>
    </div>
  );
}
