import { Router } from "express";
import { validateBody } from "../middleware/validate.middleware";
import { createScoreSchema } from "../schemas/score.schema";
import { createScoreController, getAllScoresByMatchIdController, getScoreByMatchIdAndUserIdController } from "../controllers/score.controller";

const scoreRoutes = Router();

scoreRoutes
    .post("/", validateBody(createScoreSchema), createScoreController)
    .get("/:id", getAllScoresByMatchIdController)
    .get("/", getScoreByMatchIdAndUserIdController)

export default scoreRoutes;