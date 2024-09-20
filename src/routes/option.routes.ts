import { Router } from "express";
import { validateBody } from "../middleware/validate.middleware";
import { createOptionSchema, updateOptionSchema } from "../schemas/option.schema";
import { createOptionController, deleteOptionController, getOptionByQuestionIdController, updateOptionController } from "../controllers/option.controller";
import { updateFormController } from "../controllers/form.controller";

const optionRoutes = Router();

optionRoutes
    .post("/", validateBody(createOptionSchema), createOptionController)
    .put("/:id", validateBody(updateOptionSchema), updateOptionController)
    .delete("/:id", deleteOptionController)
    .get("/:id", getOptionByQuestionIdController)

export default optionRoutes;