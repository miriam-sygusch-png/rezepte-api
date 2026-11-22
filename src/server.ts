import express from "express";

const rezepte = [
  {
    id: 1,
    titel: "Spaghetti Carbonara",
    minuten: 20,
    portionen: 2,
    vegetarisch: false,
    bewertung: 4.8,
    zutaten: ["250g Spaghetti", "100g Guanciale oder Speck", "3 Eigelb", "50g Pecorino", "Schwarzer Pfeffer"],
    anleitung: "Nudeln kochen, Speck knusprig braten, alles mit der Eigelb-Käse-Mischung und etwas Nudelwasser cremig rühren."
  },
  {
    id: 2,
    titel: "Linsencurry mit Kokosmilch",
    minuten: 30,
    portionen: 4,
    vegetarisch: true,
    bewertung: 4.9,
    zutaten: ["200g rote Linsen", "400ml Kokosmilch", "1 Dose gehackte Tomaten", "1 Zwiebel", "2 EL Currypulver"],
    anleitung: "Zwiebeln andünsten, Currypulver kurz mitrösten, Linsen, Tomaten und Kokosmilch zugeben und 20 Minuten köcheln lassen."
  },
  {
    id: 3,
    titel: "Pfannkuchen",
    minuten: 15,
    portionen: 2,
    vegetarisch: true,
    bewertung: 4.5,
    zutaten: ["200g Mehl", "2 Eier", "300ml Milch", "1 Prise Salz", "Butter zum Braten"],
    anleitung: "Alle Zutaten glatt rühren, Teig 5 Minuten ruhen lassen und nacheinander goldbraun in der Pfanne ausbacken."
  },
  {
    id: 4,
    titel: "Ofengemüse mit Feta",
    minuten: 40,
    portionen: 3,
    vegetarisch: true,
    bewertung: 4.7,
    zutaten: ["1 Zucchini", "2 Paprika", "500g Kartoffeln", "200g Feta", "3 EL Olivenöl", "Rosmarin"],
    anleitung: "Gemüse würfeln, mit Öl und Gewürzen mischen, 25 Minuten bei 200 Grad backen, dann Feta darüber bröckeln und weitere 10 Minuten backen."
  }
];

const app = express();
app.use(express.json());        // erlaubt dem Server, JSON im Request-Body zu lesen


// Begrüßung auf der Startseite
app.get("/", (req, res) => {
    res.send("Willkommen bei der Rezepte-API 👋");
});

// Health-Check: läuft der Server?
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.get("/recipes", (req, res) => {
    res.json(rezepte);
});

app.get("/recipes/:id", (req, res) => {
  const id = Number(req.params.id);
  const rezept = rezepte.find((r) => r.id === id);

  if (!rezept) {
    return res.status(404).json({ fehler: "Rezept nicht gefunden" });
  }

  res.json(rezept);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});