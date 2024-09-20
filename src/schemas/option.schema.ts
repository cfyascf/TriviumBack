import { z } from "zod";

const createOptionSchema = z.object({
    description: z.string(),
    questionId: z.string(),
    isRight: z.boolean(),
});

type ICreateOptionSchema = z.infer<typeof createOptionSchema>;

const updateOptionSchema = z.object({
    description: z.string().optional(),
    isRight: z.boolean().optional()
});

type IUpdateOptionSchema = z.infer<typeof updateOptionSchema>;


export { createOptionSchema, ICreateOptionSchema, updateOptionSchema, IUpdateOptionSchema }