// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import DreamScene from "./components/DreamScene";
import AsteroidTransition from "./components/AsteroidTransition";
import { askTwin } from "./api/ask";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import About from "./pages/About";

function AppWrapper() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(() => {
    const saved = localStorage.getItem("twin_chat");
    return saved ? JSON.parse(saved) : [];
  });

  const [transitioning, setTransitioning] = useState(false);
  const [nextRoute, setNextRoute] = useState(null);

  useEffect(() => {
    localStorage.setItem("twin_chat", JSON.stringify(chat));
  }, [chat]);

  const handleSend = async () => {
    if (!message.trim()) {
      setChat((prev) => [...prev, { sender: "twin", text: "⚠️ Please enter something!" }]);
      return;
    }

    // push user message and placeholder
    setChat((prev) => [...prev, { sender: "user", text: message }]);
    setMessage("");
    setChat((prev) => [...prev, { sender: "twin", text: "Thinking..." }]);

    try {
      const res = await askTwin(message);
      console.log("DEBUG /ask raw response:", res);

      // normalize reply extraction (support multiple shapes)
      let replyText = "😕 I didn’t quite get that.";
      if (!res) {
        replyText = "🤔 No response from server.";
      } else if (typeof res === "string") {
        replyText = res;
      } else if (res.reply) {
        replyText = res.reply;
      } else if (res.data && res.data.reply) {
        replyText = res.data.reply;
      } else if (res.data && typeof res.data === "string") {
        replyText = res.data;
      }

      // intent detection
      const lower = message.toLowerCase();
      const wantsProjects = lower.includes("project");
      const wantsContact = lower.includes("contact") || lower.includes("reach");
      const wantsAbout = lower.includes("about") || lower.includes("profile") || lower.includes("who");

      // override reply and trigger transition BEFORE updating chat so user sees "Opening..."
      if (wantsProjects) {
        replyText = "🚀 Opening projects...";
        setNextRoute("/projects");
        setTransitioning(true);
        console.log("🚀 Project command detected. Playing transition...");
      } else if (wantsContact) {
        replyText = "📞 Opening contact page...";
        setNextRoute("/contact");
        setTransitioning(true);
        console.log("📞 Contact command detected. Playing transition...");
      } else if (wantsAbout) {
        replyText = "💫 Opening about page...";
        setNextRoute("/about");
        setTransitioning(true);
        console.log("💫 About command detected. Playing transition...");
      }

      // replace Thinking... with replyText
      setChat((prev) => {
        const updated = [...prev];
        if (updated.length > 0) {
          updated[updated.length - 1] = { sender: "twin", text: replyText };
        } else {
          updated.push({ sender: "twin", text: replyText });
        }
        return updated;
      });
    } catch (err) {
      console.error("handleSend error:", err);
      setChat((prev) => {
        const updated = [...prev];
        if (updated.length > 0) {
          updated[updated.length - 1] = { sender: "twin", text: "❌ Error connecting to twin." };
        } else {
          updated.push({ sender: "twin", text: "❌ Error connecting to twin." });
        }
        return updated;
      });
    }
  };

  const handleClearChat = () => {
    localStorage.removeItem("twin_chat");
    setChat([]);
  };

  return (
    <>
      {/* Asteroid animation overlay */}
      {transitioning && (
        <AsteroidTransition
          onComplete={() => {
            console.log("🌠 Asteroid finished, navigating to:", nextRoute);
            setTransitioning(false);
            if (nextRoute) navigate(nextRoute);
            setNextRoute(null);
          }}
        />
      )}

      <div
        className="App"
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* 3D scene placed behind UI */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
          <DreamScene />
        </div>

        {/* Chat UI (on top) */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 60, // ensure chat is above Page card
            pointerEvents: "auto",
          }}
        >
          {/* Chat messages */}
          <div
            id="chat-scroll"
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginBottom: "12px",
              background: "rgba(0,0,0,0.45)",
              padding: "10px",
              borderRadius: "10px",
              width: "320px",
              backdropFilter: "blur(8px)",
            }}
          >
            {chat.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  background:
                    msg.sender === "user"
                      ? "linear-gradient(90deg, #8b5cf6, #ec4899)"
                      : "rgba(255,255,255,0.12)",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  maxWidth: "80%",
                  fontSize: "0.95rem",
                  boxShadow:
                    msg.sender === "user"
                      ? "0 0 8px rgba(236,72,153,0.3)"
                      : "0 0 6px rgba(255,255,255,0.05)",
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input area */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.06)",
              padding: "10px 16px",
              borderRadius: "12px",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <input
              type="text"
              value={message}
              placeholder="Ask your twin..."
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                outline: "none",
                fontSize: "1rem",
                width: "220px",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
                border: "none",
                color: "white",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Send
            </button>
          </div>

          {/* Clear chat */}
          {chat.length > 0 && (
            <button
              onClick={handleClearChat}
              style={{
                marginTop: "10px",
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#f87171",
                padding: "6px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              🧹 Clear Chat
            </button>
          )}
        </div>
      </div>

      {/* Routes with PageWrapper */}
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 50,
        background: "transparent",
        pointerEvents: "none", // Let 3D scene be clickable where needed
        display: "flex",
        justifyContent: "center", // center horizontally
        alignItems: "flex-start",  // ⬅⬅⬅ put pages at TOP
        paddingTop: "50px",        // ⬅⬅⬅ adjust heading vertical position
      }}
    >
      <div
        style={{
          pointerEvents: "auto",
          width: "min(1000px, 92%)",
          borderRadius: "16px",
          padding: "28px",
          backdropFilter: "blur(6px)",
          background: "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.32))",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          color: "#ffffff",
          textShadow: "0 2px 10px rgba(0,0,0,0.6)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}


export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
