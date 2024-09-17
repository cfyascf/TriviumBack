import { NextFunction, Request, Response } from "express";
import { createUserService } from "../services/user.service";

export const createUserController = async (req: Request, res: Response) => {
    const service = await createUserService(req.body);

    res.status(201).json({ message: service });
}