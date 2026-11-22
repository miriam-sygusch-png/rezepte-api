import express from "express";
import recipeRoutes from "./recipe.routes";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Willkommen bei der Rezepte-API 👋");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/recipes", recipeRoutes);

export default app;