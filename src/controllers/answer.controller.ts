import { Request, Response } from 'express';
import { createAnswerService, getAnswerByQuestionIdService } from '../services/answer.service';

export const createAnswerController = async (req: Request, res: Response) => {
    const result = await createAnswerService(req.body);

    return res.status(201).json({ message: 'Answer created successfully', data: result });
}

export const getAnswerByQuestionIdController = async (req: Request<{ id: string }>, res: Response) => {
    const result = await getAnswerByQuestionIdService(req.params.id);

    return res.status(201).json({ data: result });
}