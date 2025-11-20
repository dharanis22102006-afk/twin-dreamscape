// src/api/ask.js
export async function askTwin(prompt) {
  const res = await fetch("http://localhost:5000/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json();
  return data.reply;
}
