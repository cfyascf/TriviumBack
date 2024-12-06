import { Request, Response } from 'express';
import { createQuestionService, deleteQuestionService, findQuestionByFormIdService, findQuestionByIdService, updateQuestionService } from '../services/question.service';

export const createQuestionController = async (req: Request, res: Response) => {
    const result = await createQuestionService(req.body);

    return res.status(201).json({ message: 'Question created successfully', data: result });
}

export const updateQuestionController = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const result = await updateQuestionService(id, req.body);

    return res.status(200).json({ message: 'Question updated successfully', data: result });
}

export const deleteQuestionController = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const result = await deleteQuestionService(id);

    return res.status(204).json({ message: result });
}

export const findQuestionByFormIdController = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const result = await findQuestionByFormIdService(id);

    return res.status(200).json({ data: result });
}

export const findQuestionByIdController = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const result = await findQuestionByIdService(id);

    return res.status(200).json({ data: result });
}