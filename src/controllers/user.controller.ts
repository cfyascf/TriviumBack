import { NextFunction, Request, Response } from "express";
import { createUserService, updateUserService } from "../services/user.service";

export const createUserController = async (req: Request, res: Response) => {
    const service = await createUserService(req.body);

    res.status(201).json({ message: service });
}

export const updateUserController = async (req: Request, res: Response) => {
    const service = await updateUserService(req.body);

    res.status(200).json({ user: service });
}