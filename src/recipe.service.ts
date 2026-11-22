export type Rezept = { id: number; titel: string; minuten: number; portionen: number };

let rezepte: Rezept[] = [
    { id: 1, titel: "Spaghetti Carbonara", minuten: 20, portionen: 2 },
    { id: 2, titel: "Linsen-Curry", minuten: 35, portionen: 4 },
];

export async function getAllRecipes(): Promise<Rezept[]> {
    return rezepte;
}

export async function getRecipeById(id: number): Promise<Rezept | null> {
    const gefunden = rezepte.find((r) => r.id === id);
    return gefunden ?? null;
}