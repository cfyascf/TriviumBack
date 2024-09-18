import { Request, Response } from 'express';
import { ICreateFormSchema, IUpdateFormSchema } from "../schemas/form.schema";
import { createFormService, deleteFormService, getAllFormService, getFormByIdService, updateFormService } from "../services/form.service";

export const createFormController = async (req: Request<{}, {}, ICreateFormSchema>, res: Response) => {
    const result = await createFormService(req.body);

    return res.status(201).json({ message: 'Form created successfully', data: result });
};

export const updateFormController = async (req: Request<{ id: string }, {}, IUpdateFormSchema>, res: Response) => {
    const { id } = req.params;
    const result = await updateFormService(id, req.body);

    return res.status(200).json({ message: 'Form updated successfully', data: result });
}

export const getFormByIdController = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const result = await getFormByIdService(id);

    return res.status(200).json({ data: result });
}

export const deleteFormController = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const result = await deleteFormService(id);

    return res.status(204).json({ message: result });
}

export const getAllFormController = async (req: Request, res: Response) => {
    const result = await getAllFormService();

    return res.status(200).json({ data: result });
}