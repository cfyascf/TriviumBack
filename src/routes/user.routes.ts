import { Router } from "express";
import { createUserController, deleteUserController, getAllUsersController, getUserByIdController, getUserByMatchController, updateUserController } from "../controllers/user.controller";
import { validateBody, validateToken } from "../middleware/validate.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

const userRoutes = Router();

userRoutes
    .post("", createUserController)
    .put("", validateBody(updateUserSchema), validateToken, updateUserController)
    .get("/match", getUserByMatchController)
    .get("", getUserByIdController)
    .delete("", validateToken, deleteUserController)
    .get("/all", getAllUsersController)

export default userRoutes;