export type Rezept = { id: number; titel: string; minuten: number; portionen: number };

let rezepte: Rezept[] = [
    { id: 1, titel: "Spaghetti Carbonara", minuten: 20, portionen: 2 },
    { id: 2, titel: "Linsen-Curry", minuten: 35, portionen: 4 },
    { id: 3, titel: "Pfannkuchen", minuten: 15, portionen: 2,},
    { id: 4, titel: "Ofengemüse mit Feta", minuten: 40, portionen: 3,}
];

export async function getAllRecipes(): Promise<Rezept[]> {
    return rezepte;
}

export async function getRecipeById(id: number): Promise<Rezept | null> {
    const gefunden = rezepte.find((r) => r.id === id);
    return gefunden ?? null;
}

let naechsteId = 5;

export async function createRecipe(daten: Omit<Rezept, "id">): Promise<Rezept> {
    const neues: Rezept = { id: naechsteId++, ...daten };
    rezepte.push(neues);
    return neues;
}

export async function deleteRecipe(id: number): Promise<boolean> {
    const laengeVorher = rezepte.length;
    rezepte = rezepte.filter((r) => r.id !== id);
    return rezepte.length < laengeVorher;
}