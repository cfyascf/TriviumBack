import { Request, Response } from 'express';
import { createOptionService, updateOptionService } from "../services/option.service"

export const createOptionController = async (req: Request, res: Response) => {
    const result = await createOptionService(req.body);

    return res.status(201).json({ message: 'Option created successfully', data: result });
}

export const updateOptionController = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const result = await updateOptionService(id, req.body);

    return res.status(200).json({ message: 'Option updated successfully', data: result });
}