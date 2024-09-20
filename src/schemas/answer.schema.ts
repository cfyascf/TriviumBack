import { z } from "zod";

const createAnswerSchema = z.object({
    optionId: z.string(),
    questionId: z.string(),
    userId: z.string()
});

type ICreateAnswerSchema = z.infer<typeof createAnswerSchema>;

const getAnswerByQuestionIdByUserSchema = z.object({
    userId: z.string()
});

type IGetAnswerSchema = z.infer<typeof getAnswerByQuestionIdByUserSchema>;

export { createAnswerSchema, ICreateAnswerSchema, IGetAnswerSchema, getAnswerByQuestionIdByUserSchema }