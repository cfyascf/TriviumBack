import { NextFunction, Request, Response } from "express";
import { createUserService, deleteUserService, getAllUserService, getUserByIdService, getUserByMatchService, updateUserService } from "../services/user.service";

export const createUserController = async (req: Request, res: Response) => {
    const service = await createUserService(req.body);

    res.status(201).json({ message: service });
}

export const updateUserController = async (req: Request, res: Response) => {
    const service = await updateUserService(req.body, res.locals.userid);

    res.status(200).json({ data: service });
}

export const getUserByMatchController = async (req: Request, res: Response) => {
    const service = await getUserByMatchService(String(req.query.id));

    res.status(200).json({ data: service });
}

export const getUserByIdController = async (req: Request, res: Response) => {
    const service = await getUserByIdService(String(req.query.id));

    res.status(200).json({ data: service });
}

export const deleteUserController = async (req: Request, res: Response) => {
    const service = await deleteUserService(res.locals.userid);

    res.status(200).json({ data: service });
}

export const getAllUsersController = async (req:Request, res:Response) => {
    var service = null;

    if (req.query.search != null) {
        service = await getAllUserService(String(req.query.search));
    } else {
        service = await getAllUserService(null);
    }

    res.status(200).json({ data: service });
}