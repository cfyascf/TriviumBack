import { Router } from "express";
import { validateBody } from "../middleware/validate.middleware";
import { createMatchSchema } from "../schemas/match.schema";
import { createMatchController } from "../controllers/match.controller";

const matchRoutes = Router();

matchRoutes
    .post("", validateBody(createMatchSchema), createMatchController);

export default matchRoutes;