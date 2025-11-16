export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { text, voice } = req.body;
    if (!text) return res.status(400).json({ error: "Missing text" });

    const voiceToUse = voice || "536f4c29-1fb4-45a4-9bea-efe7b51f46c2";

    const response = await fetch("https://api.superbrain.chat/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "sb-api-key": process.env.SUPERBRAIN_KEY || "demo-key",
      },
      body: JSON.stringify({ text, voice_id: voiceToUse }),
    });

    const audio = await response.arrayBuffer();
    res.setHeader("Content-Type", "audio/mpeg");
    return res.send(Buffer.from(audio));
  } catch (error) {
    console.error("TTS error:", error);
    return res.status(500).json({ error: "TTS processing failed" });
  }
}