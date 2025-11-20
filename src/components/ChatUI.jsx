import React, { useState } from "react";

export default function ChatUI({ onSend }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  async function submit() {
    if (!text) return;
    const userMsg = { role: "user", content: text };
    setMessages(m => [...m, userMsg]);
    setText("");
    const reply = await onSend(text);
    setMessages(m => [...m, { role: "assistant", content: reply }]);
  }

  return (
    <div className="absolute bottom-10 left-8 w-96 bg-white/10 backdrop-blur-md rounded-xl p-3 text-white">
      <div className="h-40 overflow-auto">
        {messages.map((m, i) => <div key={i} className={m.role==="user"?"text-right":"text-left"}>{m.content}</div>)}
      </div>
      <div className="flex gap-2 mt-2">
        <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 p-2 rounded-md bg-white/20" />
        <button onClick={submit} className="px-3 py-2 rounded bg-white/30">Send</button>
      </div>
    </div>
  );
}
