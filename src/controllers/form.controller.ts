import { Request, Response } from 'express';
import { ICreateFormSchema } from "../schemas/form.schema";
import { createFormService } from "../services/form.service";

export const createFormController = async (req: Request<{}, {}, ICreateFormSchema>, res: Response) => {
    try {
        const result = await createFormService(req.body);

        return res.status(201).json({ message: 'Form created successfully', data: result });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// export const updateFormController = async (req:) => {
//     try {

//     } catch (error) {

//     }
// }