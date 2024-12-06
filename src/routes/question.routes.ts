import { Router } from "express";
import { validateBody } from "../middleware/validate.middleware";
import { createQuestionSchema, updateQuestionSchema } from "../schemas/question.schema";
import { createQuestionController, deleteQuestionController, findQuestionByFormIdController, findQuestionByIdController, updateQuestionController } from "../controllers/question.controller";

const questionRoutes = Router();

questionRoutes
    .post('/', validateBody(createQuestionSchema), createQuestionController)
    .put('/:id', validateBody(updateQuestionSchema), updateQuestionController)
    .delete('/:id', deleteQuestionController)
    .get('/form/:id', findQuestionByFormIdController)
    .get('/:id', findQuestionByIdController)

export default questionRoutes;