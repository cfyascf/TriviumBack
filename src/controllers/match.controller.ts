import { Request, Response } from "express";
import { createMatchService } from "../services/match.service";

export const createMatchController = async (req: Request, res: Response) => {
    const service = await createMatchService(req.body);

    res.status(201).json({ message: service });
}