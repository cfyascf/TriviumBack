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
    
    const form = await Form.findById(id);

    if(!form)
        throw new AppError("Form not found.", 404);

    if(payload.title)
        form.title = payload.title;

    if(payload.description)
        form.description = payload.description;

    await form.save();
    
    return form;
}

export const getFormByIdService = async (id: string) => {
    if(!id)
        throw new AppError('Id is missing.', 404);

    const form = await Form.findById(id);

    if(!form)
        throw new AppError("Form not found.", 404);

    return form;
}

export const deleteFormService = async (id: string) => {
    if(!id)
        throw new AppError('Id is missing.', 404);

    await Form.deleteOne({ _id: id });

    return "Form updated successfully";
}

export const getAllFormService = async () => {
    const forms = await Form.find();

    return forms;
}