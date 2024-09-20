import { z } from "zod";

const createQuestionSchema = z.object({
    title: z.string(),
    formId: z.string()
});

type ICreateQuestionSchema = z.infer<typeof createQuestionSchema>;

const updateQuestionSchema = z.object({
    title: z.string().optional()
});

type IUpdateQuestionSchema = z.infer<typeof updateQuestionSchema>;

export { createQuestionSchema, ICreateQuestionSchema, updateQuestionSchema, IUpdateQuestionSchema }