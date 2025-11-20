import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        background: "rgba(255,255,255,0.15)",
        border: "1px solid rgba(255,255,255,0.3)",
        color: "white",
        padding: "8px 14px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "bold",
        backdropFilter: "blur(5px)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => (e.target.style.boxShadow = "0 0 12px rgba(255,255,255,0.7)")}
onMouseLeave={(e) => (e.target.style.boxShadow = "none")}

    >
      ← Back
    </button>
  );
}
