import { Router } from "express";
import { validateBody } from "../middleware/validate.middleware";
import { createFormSchema, updateFormSchema } from "../schemas/form.schema";
import { createFormController, updateFormController } from "../controllers/form.controller";

const formRoutes = Router();

formRoutes
    .post('/', validateBody(createFormSchema), createFormController)
    .put('/:id', validateBody(updateFormSchema), updateFormController);

export default formRoutes;