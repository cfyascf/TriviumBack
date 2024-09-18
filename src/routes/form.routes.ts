import { Router } from "express";
import { validateBody } from "../middleware/validate.middleware";
import { createFormSchema, updateFormSchema } from "../schemas/form.schema";
import { createFormController, deleteFormController, getAllFormController, getFormByIdController, updateFormController } from "../controllers/form.controller";

const formRoutes = Router();

formRoutes
    .post('/', validateBody(createFormSchema), createFormController)
    .put('/:id', validateBody(updateFormSchema), updateFormController)
    .get('/:id', getFormByIdController)
    .delete('/:id', deleteFormController)
    .get('/', getAllFormController)

export default formRoutes;