import Form from "../models/form.model";
import { ICreateFormSchema } from "../schemas/form.schema";

export const createFormService = async (payload:ICreateFormSchema) => {
    const form = await Form.create(payload);

    return form;
}