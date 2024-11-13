import { Router } from "express";
import { validateBody, validateToken } from "../middleware/validate.middleware";
import { addUserToMatchSchema, createMatchSchema, removeUserFromMatchSchema, updateMatchSchema } from "../schemas/match.schema";
import { addUserController, createMatchController, getMatchController, removeUserFromMatchController, updateMatchController } from "../controllers/match.controller";

const matchRoutes = Router();

matchRoutes
    .post("", validateBody(createMatchSchema), createMatchController)
    .post("/add", validateBody(addUserToMatchSchema), addUserController)
    .post("/remove", validateBody(removeUserFromMatchSchema), removeUserFromMatchController)
    .put("", validateBody(updateMatchSchema), validateToken, updateMatchController)
    .get("", getMatchController);

export default matchRoutes;