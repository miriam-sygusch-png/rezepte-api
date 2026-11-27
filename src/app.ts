import express from "express";
import recipeRoutes from "./recipe.routes.ts";
import { logger } from "./logger.middleware.ts";
import { errorHandler } from "./error.middleware.ts";
import { getPostgresPool } from "./pool.postgres";

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

const pool = getPostgresPool();
const res = await pool.query("SELECT NOW()");   // simpelste mögliche Query
console.log("DB sagt:", res.rows[0]);           // { now: 2026-11-... }

export default app;