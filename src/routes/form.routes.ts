import { Router } from "express";
import { validateBody } from "../middleware/validate.middleware";
import { createFormSchema } from "../schemas/form.schema";
import { createFormController } from "../controllers/form.controller";

const formRoutes = Router();

formRoutes
    .post('/create', validateBody(createFormSchema), createFormController);

export default formRoutes;