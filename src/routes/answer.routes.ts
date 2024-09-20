import { Router } from "express";
import { validateBody } from "../middleware/validate.middleware";
import { createAnswerSchema, getAnswerByQuestionIdByUserSchema } from "../schemas/answer.schema";
import { createAnswerController, getAnswerByQuestionIdByUserController, getAnswerByQuestionIdController } from "../controllers/answer.controller";

const answerRoutes = Router();

answerRoutes
    .post("/", validateBody(createAnswerSchema), createAnswerController)
    .get("/:id", getAnswerByQuestionIdController)
    .get("/", getAnswerByQuestionIdByUserController)

export default answerRoutes;