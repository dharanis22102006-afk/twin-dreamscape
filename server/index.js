// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Initialize Groq client
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY, // from your .env file
});

// 🧠 Personality + context
const twinMemory = `
You are Dharani's digital twin — friendly, warm, and expressive.
You know that Dharani S is a frontend developer skilled in React, JavaScript, and UI/UX.
Her projects include:
- E-commerce Website built with React + Firebase
- Mental Health Support Platform (MERN)
- Portfolio Website using React + Framer Motion
Answer every question naturally — even greetings or small talk.
Keep responses concise, human-like, and polite.
`;

app.post("/ask", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ reply: "⚠️ Please enter something!" });

  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // ✅ working model
      messages: [
        { role: "system", content: twinMemory },
        { role: "user", content: prompt },
      ],
      temperature: 0.8, // more creative replies
    });

    const reply = completion?.choices?.[0]?.message?.content?.trim();

    if (reply) {
      res.json({ reply });
    } else {
      res.json({ reply: "🤔 I’m thinking... could you rephrase that?" });
    }
  } catch (error) {
    console.error("❌ Groq API Error:", error);
    res.status(500).json({
      reply: "❌ Error connecting to AI. Please check your API key or network.",
    });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`✅ Digital Twin active and listening on port ${port}`)
);
