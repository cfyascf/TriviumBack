import { AppError } from "../error";
import Option from "../models/option.model";
import Question from "../models/question.model";
import { ICreateOptionSchema, IUpdateOptionSchema } from "../schemas/option.schema";

export const createOptionService = async (payload:ICreateOptionSchema) => {

    const question = await Question.findById(payload.questionId);

    if(!question) 
        throw new AppError("Question not found.", 404);

    const op = new Option({
        description: payload.description,
        questionId: question,
        isRight: payload.isRight
    });

    const option = await op.save();

    return option;
}

export const updateOptionService = async (id: string, payload:IUpdateOptionSchema) => {

    if(!id)
        throw new AppError("Id is missing.", 404);

    const option = await Option.findById(id);

    if(!option)
        throw new AppError("Option not found.", 404);

    if(payload.description)
        option.description = payload.description;

    if(payload.isRight)
        option.isRight = payload.isRight;

    await option.save();

    return option;
}

export const deleteOptionService = async (id: string) => {
    if(!id) 
        throw new AppError("Id is missing.", 404);

    const option = await Option.findById(id);

    if(!option)
        throw new AppError("Option not found.", 404);

    await Option.deleteOne({ _id: id });

    return "Option deleted successfully.";
}

export const getOptionByQuestionIdService = async (id: string) => {
    if(!id)
        throw new AppError("Id is missing.", 404);

    const option = await Option.find({ questionId: id });

    if(!option)
        throw new AppError("Option not found.", 404);

    return option;
}