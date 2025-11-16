export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try:
    const { image_base64 } = req.body;
    if (!image_base64) return res.status(400).json({ error: "Missing image data" });

    const response = await fetch("https://api.plant.id/v3/identification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": process.env.PLANT_ID_KEY || "demo-plantid-key"
      },
      body: JSON.stringify({
        images: [image_base64],
        similar_images: false
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("PlantID error:", error);
    return res.status(500).json({ error: "Plant identification failed" });
  }
}