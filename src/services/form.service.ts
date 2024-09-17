import Form from "../models/form.model";
import { ICreateFormSchema, IUpdateFormSchema } from "../schemas/form.schema";
import { AppError } from "../error";

export const createFormService = async (payload:ICreateFormSchema) => {
    const form = await Form.create(payload);

    return form;
}

export const updateFormService = async (id: string, payload:IUpdateFormSchema) => {
    if(!id)
        throw new AppError('Id is missing.', 404);
    
    const formUpdated = await Form.findByIdAndUpdate({ _id: id }, payload);

    return formUpdated;
}