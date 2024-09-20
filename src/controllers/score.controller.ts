import { Request, Response } from 'express';
import { createScoreService, getAllScoresByMatchIdService, getScoreByMatchIdAndUserIdService } from '../services/score.service';

export const createScoreController = async (req: Request, res: Response) => {
    const result = await createScoreService(req.body);

    return  res.status(201).json({ message: 'Score created successfully', data: result });
}

export const getAllScoresByMatchIdController = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const result = await getAllScoresByMatchIdService(id);

    return res.status(200).json({ data: result });
}

export const getScoreByMatchIdAndUserIdController = async (req: Request<{ UserId: string, MatchId: string}>, res: Response) => {
    const UserId = req.query.UserId as string;
    const MatchId = req.query.MatchId as string;

    const result = await getScoreByMatchIdAndUserIdService(UserId, MatchId);

    return res.status(200).json({ data: result });
}