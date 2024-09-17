import { Request, Response } from 'express';
import { ICreateFormSchema, IUpdateFormSchema } from "../schemas/form.schema";
import { createFormService, updateFormService } from "../services/form.service";

export const createFormController = async (req: Request<{}, {}, ICreateFormSchema>, res: Response) => {
    const result = await createFormService(req.body);

    return res.status(201).json({ message: 'Form created successfully', data: result });
};

export const updateFormController = async (req: Request<{ id: string }, {}, IUpdateFormSchema>, res: Response) => {
    const { id } = req.params;
    const result = await updateFormService(id, req.body);

    return res.status(201).json({ message: 'Form updated successfully', data: result });
}