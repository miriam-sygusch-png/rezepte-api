import { Router } from "express";
import { getRecipesHandler, getRecipeHandler, 
createRecipeHandler, deleteRecipeHandler, } from "./recipe.controller";
import { requireApiKey } from "./auth.middleware";

const router = Router();
router.get("/", getRecipesHandler);
router.get("/:id", getRecipeHandler);
router.post("/", createRecipeHandler);
router.delete("/:id", requireApiKey, deleteRecipeHandler);

export default router;