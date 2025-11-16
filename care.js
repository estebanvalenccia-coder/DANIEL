export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const response = await fetch("https://api.superbrain.chat/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "sb-api-key": process.env.SUPERBRAIN_KEY || "demo-key",
      },
      body: JSON.stringify({
        model: "superbrain-ai",
        messages: [
          { role: "system", content: "Eres HerencIA, experto en plantas y diagnóstico botánico." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Care error:", error);
    return res.status(500).json({ error: "Plant care assistant failed" });
  }
}