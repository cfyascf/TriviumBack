import { Router } from "express";
import { createUserController, updateUserController } from "../controllers/user.controller";
import { validateBody } from "../middleware/validate.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

const userRoutes = Router();

userRoutes
    .post("/", validateBody(createUserSchema), createUserController)
    .put("/", validateBody(updateUserSchema), updateUserController);

export default userRoutes;