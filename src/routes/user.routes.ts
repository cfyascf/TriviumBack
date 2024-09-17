import { Router } from "express";
import { createUserController } from "../controllers/user.controller";
import { validateBody } from "../middleware/validate.middleware";
import { createUserSchema } from "../schemas/user.schema";

const userRoutes = Router();

userRoutes
    .post("/create", validateBody(createUserSchema), createUserController);

export default userRoutes;