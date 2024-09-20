import { Router } from "express";
import { validateBody } from "../middleware/validate.middleware";
import { createAnswerSchema } from "../schemas/answer.schema";
import { createAnswerController, getAnswerByQuestionIdController } from "../controllers/answer.controller";

const answerRoutes = Router();

answerRoutes
    .post("/", validateBody(createAnswerSchema), createAnswerController)
    .get("/:id", getAnswerByQuestionIdController);

export default answerRoutes;