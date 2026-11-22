import { Request, Response, NextFunction } from "express";
import { getAllRecipes, getRecipeById } from "./recipe.service";

export async function getRecipesHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const rezepte = await getAllRecipes();
        res.json(rezepte);
    } catch (err) {
        next(err);
    }
}

export async function getRecipeHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const rezept = await getRecipeById(id);

        if (!rezept) {
            return res.status(404).json({ fehler: "Rezept nicht gefunden" });
        }

        res.json(rezept);
    } catch (err) {
        next(err);
    }
}