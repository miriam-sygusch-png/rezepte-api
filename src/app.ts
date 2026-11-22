import express from "express";
import recipeRoutes from "./recipe.routes";
import { logger } from "./logger.middleware";
import { errorHandler } from "./error.middleware";

const app = express();
app.use(express.json());

app.use(logger);              // vor den Routen -> sieht jede Anfrage


app.get("/", (req, res) => {
    res.send("Willkommen bei der Rezepte-API 👋");
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/recipes", recipeRoutes);

app.use((req, res) => {
    res.status(404).json({
        fehler: `Route ${req.method} ${req.url} existiert nicht`,
    });
});

app.use(errorHandler); //muss hinter alle Routen

export default app;