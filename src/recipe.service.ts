import { RecipeNotFoundError, ValidationError } from "./errors.ts";
import {
    getAllRecipes as getAllFromDb,
    getRecipeById as getByIdFromDb,
    createRecipe as createInDb,
    deleteRecipe as deleteInDb,
} from "./recipe.repo";

export type Zutat = { name: string; menge: string };

export type Rezept = {
    id: number;
    titel: string;
    minuten: number;
    portionen: number;
    zutaten?: Zutat[];        // nur bei getRecipeById gefüllt (Detail-Ansicht)
};


export async function getAllRecipes(): Promise<Rezept[]> {
    return getAllFromDb();
}

export async function getRecipeById(id: number): Promise<Rezept> {
    const rezept = await getByIdFromDb(id);

    if (!rezept) {
        throw new RecipeNotFoundError(id);
    }

    return rezept;
}

let naechsteId = 5;

export async function createRecipe(daten: Omit<Rezept, "id">): Promise<Rezept> {
    if (!daten.titel || daten.titel.trim() === "") {
        throw new ValidationError("Ein Rezept braucht einen Titel");
    }
    return createInDb(daten.titel, daten.minuten, daten.portionen);
}

export async function deleteRecipe(id: number): Promise<void> {
    await getRecipeById(id);
    await deleteInDb(id);
}