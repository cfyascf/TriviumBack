import { Router } from "express";
import { validateBody } from "../middleware/validate.middleware";
import { loginSchema } from "../schemas/auth.schema";
import { loginController } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes
    .post("", validateBody(loginSchema), loginController);

export default authRoutes;