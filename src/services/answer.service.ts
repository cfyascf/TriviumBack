import { AppError } from "../error";
import Answer from "../models/answer.model";
import Option, { IOption } from "../models/option.model";
import Question, { IQuestion } from "../models/question.model";
import User from "../models/user.model";
import { ICreateAnswerSchema, IGetAnswerSchema } from "../schemas/answer.schema";
import { getOptionByQuestionIdService } from "./option.service";

export const createAnswerService = async (payload:ICreateAnswerSchema) => {

    const option = await Option.findById(payload.optionId);
    if(!option)throw new AppError("Option not found.", 404);

    const question = await Question.findById(payload.questionId);
    if(!question) throw new AppError("Question not found.", 404);

    const user = await User.findById(payload.userId);
    if(!user) throw new AppError("User not found.", 404);

    const options = await getOptionByQuestionIdService(payload.questionId);
    const isOptionValid = options.some(opt => opt.id.toString() === option.id.toString());
    if(!isOptionValid) throw new AppError("Option not registered in this question.", 404);
        
    const answer = new Answer({
        optionId: option,
        questionId: question,
        userId: user
    });

    await answer.save();

    return answer;
}

export const getAnswerByQuestionIdService = async (id: string) =>  {
    
    if(!id) throw new AppError("Id is missing.", 404);

    const answer = await Answer.find({ questionId: id });

    if(!answer) throw new AppError("Option not found.", 404);

    return answer;
}

export const getAnswerByQuestionIdByUserService = async (UserId: string, QuestionId: string) =>  {
    
    if(!UserId || UserId === "" || !QuestionId || QuestionId === "") throw new AppError("Id is missing.", 404);

    const user = await User.findById(UserId);
    if(!user) throw new AppError("User not found.", 404);

    const question = await Question.find({ id: QuestionId });
    if(!question) throw new AppError("Question not found.", 404);

    const answer = await Answer.find({ questionId: QuestionId, userId: UserId });
    if(!answer) throw new AppError("Option not found.", 404);

    return answer;
}