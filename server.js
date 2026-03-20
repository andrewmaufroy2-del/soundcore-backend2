import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { prompt, genre, style, bpm } = req.body;

  try {
    // Appel réel à Suno API
    const sunoRes = await fetch("https://api.suno.ai/v1/generate/audio", {
      method: "POST",
      headers: {
        "Authorization": "Bearer c3b5f6f829b7408045d297f13cc2e989",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        genre,
        style,
        bpm
      })
    });

    const data = await sunoRes.json();

    // Suno retourne souvent un URL temporaire du mp3
    res.json({ audioUrl: data.audio_url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur génération" });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Backend SoundCore lancé"));
