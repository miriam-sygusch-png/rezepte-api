import { getPostgresPool } from "./pool.postgres";
import { Rezept } from "./recipe.service";

const pool = getPostgresPool();

// --- MUSTER (vorgegeben): alle Rezepte lesen (flach, ohne Zutaten) ---
export async function getAllRecipes(): Promise<Rezept[]> {
  const res = await pool.query(
    "SELECT id, titel, minuten, portionen FROM rezepte ORDER BY id"
  );
  return res.rows;              // immer ein Array — auch bei einer Zeile
}

// --- TODO: ein Rezept anlegen ---
export async function createRecipe(titel: string, minuten: number, portionen: number): Promise<Rezept> {
    const sql = "INSERT INTO rezepte (titel, minuten, portionen) VALUES ($1, $2, $3) RETURNING id, titel, minuten, portionen";
    const res = await pool.query(sql, [titel, minuten, portionen])
    return res.rows[0]
 }

// --- TODO: ein Rezept MIT seinen Zutaten lesen (ZWEI Queries, nicht ein JOIN) ---
export async function getRecipeById(id: number): Promise<Rezept | null> {
    // 1) das Rezept:   SELECT ... FROM rezepte WHERE id = $1   -> res.rows[0]
    //    nicht gefunden? -> null zurückgeben.
     const res = await pool.query(
    "SELECT id, titel, minuten, portionen FROM rezepte WHERE id = $1",
    [id]
);

const rezept = res.rows[0];

if(!rezept) {
    return null;
}
// 2) seine Zutaten per JOIN über die Zwischentabelle:
//      SELECT z.name, rz.menge
//      FROM rezept_zutaten rz
//      JOIN zutaten z ON z.id = rz.zutat_id
//      WHERE rz.rezept_id = $1
const zutatenRes = await pool.query(
    `SELECT z.name, rz.menge
     FROM rezept_zutaten rz
     JOIN zutaten z ON z.id = rz.zutat_id
     WHERE rz.rezept_id = $1`,
    [id]
  );

  // Zum Schluss anhängen:  return { ...rezept, zutaten: zutatenRes.rows };
  return {
    ...rezept,
    zutaten: zutatenRes.rows,
  };
 }

// --- TODO: ein Rezept löschen ---
export async function deleteRecipe(id: number): Promise<void> {
    const sql = "DELETE FROM rezepte WHERE id = $1";
    await pool.query(sql, [id]);
 }
// DELETE FROM rezepte WHERE id = $1   (kein RETURNING nötig)
// Die Verknüpfungen in rezept_zutaten verschwinden dank ON DELETE CASCADE
// automatisch mit — siehe aufgabe-2.1 Bonus.