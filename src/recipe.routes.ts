import { Router } from "express";
import { getRecipesHandler, getRecipeHandler, 
createRecipeHandler, deleteRecipeHandler, } from "./recipe.controller";

const router = Router();
router.get("/", getRecipesHandler);
router.get("/:id", getRecipeHandler);
router.post("/", createRecipeHandler);
router.delete("/:id", deleteRecipeHandler);

export default router;