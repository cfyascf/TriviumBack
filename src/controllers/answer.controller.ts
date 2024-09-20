import { Request, Response } from 'express';
import { createAnswerService, getAnswerByQuestionIdByUserService, getAnswerByQuestionIdService } from '../services/answer.service';

export const createAnswerController = async (req: Request, res: Response) => {
    const result = await createAnswerService(req.body);

    return res.status(201).json({ message: 'Answer created successfully', data: result });
}

export const getAnswerByQuestionIdController = async (req: Request<{ id: string }>, res: Response) => {
    const result = await getAnswerByQuestionIdService(req.params.id);

    return res.status(200).json({ data: result });
}

export const getAnswerByQuestionIdByUserController = async (req: Request<{ UserId: string, QuestionId: string }>, res: Response) => {
    const userId = req.query.UserId as string;
    const questionId = req.query.QuestionId as string;

    const result = await getAnswerByQuestionIdByUserService(userId, questionId);

    return res.status(200).json({ data: result });
}