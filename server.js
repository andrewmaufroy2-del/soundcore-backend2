import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// ✅ Active CORS pour toutes les origines et méthodes
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// ✅ Gérer les requêtes OPTIONS (préflight)
app.options("*", cors());

app.post("/generate", async (req, res) => {
    const { prompt } = req.body;

    try {
        // Test : mp3 fixe
        res.json({
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur" });
    }
});

app.listen(process.env.PORT || 3000, () => console.log("Backend SoundCore lancé"));
