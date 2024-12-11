import { AppError } from "../error";
import Form from "../models/form.model";
import Option from "../models/option.model";
import Question from "../models/question.model";
import { ICreateQuestionSchema, IUpdateQuestionSchema } from "../schemas/question.schema";

export const createQuestionService = async (payload:ICreateQuestionSchema) => {

    const form = await Form.findById(payload.formId);

    if(!form)
        throw new AppError('Form not found.', 404);

    const question = new Question({
        title: payload.title,
        formId: form
    });

    await question.save();

    const options = payload.options.map(option => {
        return new Option({
            description: option.description,
            isRight: option.isRight,
            questionId: question._id
        });
    });

    await Option.insertMany(options);

    return { question, options };

}

export const updateQuestionService = async (id: string, payload:IUpdateQuestionSchema) => {

    if(!id)
        throw new AppError('Id is missing.', 404);

    const question = await Question.findById(id);

    if(!question)
        throw new AppError("Question not Found.", 404);

    if(payload.title)
        question.title = payload.title;

    await question.save();

    return question;
}

export const deleteQuestionService = async (id: string) => {
    if(!id)
        throw new AppError('Id is missing.', 404);

    await Question.deleteOne({ _id: id });

    return "Question deleted successfully";
}

export const findQuestionByFormIdService = async (id: string) => {
    if(!id)
        throw new AppError('Id is missing.', 404);

    const question = await Question.find({ formId: id });

    return question;
}

export const findQuestionByIdService = async (id: string) => {
    if(!id)
        throw new AppError('Id is missing.', 404);

    const question = await Question.findById(id).lean();
    if (!question) throw new AppError("Question not found.", 404);

    const options = await Option.find({ questionId: question._id }).lean();
    if (!options) throw new AppError("Option not found.", 404);

    return {question, options};
}