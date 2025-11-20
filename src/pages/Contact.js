import React from "react";
import BackButton from "../components/BackButton";

export default function Contact() {
  return (
    <div style={{ textAlign: "center" }}>
      <BackButton />
      <h1>📞 Contact Me</h1>
      <p>Email: dharanis22102006@example.com</p>
      <p>Phone: +91 98765 43210</p>
      <a href="https://linkedin.com/in/dharanis22102006" target="_blank" rel="noreferrer">
        🔗 LinkedIn
      </a>{" "}
      |{" "}
      <a href="https://github.com/dharanis22102006-afk" target="_blank" rel="noreferrer">
        💻 GitHub
      </a>
    </div>
  );
}
