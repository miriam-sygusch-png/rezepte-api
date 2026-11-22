import { Router } from "express";
import { getRecipesHandler, getRecipeHandler } from "./recipe.controller";

const router = Router();
router.get("/", getRecipesHandler);
router.get("/:id", getRecipeHandler);

export default router;