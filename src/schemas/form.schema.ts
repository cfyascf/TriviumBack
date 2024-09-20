import { z } from "zod";

const createFormSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
});

type ICreateFormSchema = z.infer<typeof createFormSchema>;

const updateFormSchema = z.object({
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
});

type IUpdateFormSchema = z.infer<typeof updateFormSchema>;

export { createFormSchema, ICreateFormSchema, IUpdateFormSchema, updateFormSchema };