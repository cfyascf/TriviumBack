import { Router } from "express";
import { validateBody } from "../middleware/validate.middleware";
import { createQuestionSchema, updateQuestionSchema } from "../schemas/question.schema";
import { createQuestionController, deleteQuestionController, findQuestionByFormIdController, updateQuestionController } from "../controllers/question.controller";

const questionRoutes = Router();

questionRoutes
    .post('/', validateBody(createQuestionSchema), createQuestionController)
    .put('/:id', validateBody(updateQuestionSchema), updateQuestionController)
    .delete('/:id', deleteQuestionController)
    .get('/:id', findQuestionByFormIdController)

export default questionRoutes;