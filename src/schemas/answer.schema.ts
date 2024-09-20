import { z } from "zod";

const createAnswerSchema = z.object({
    optionId: z.string(),
    questionId: z.string(),
    userId: z.string()
});

type ICreateAnswerSchema = z.infer<typeof createAnswerSchema>;


export { createAnswerSchema, ICreateAnswerSchema };