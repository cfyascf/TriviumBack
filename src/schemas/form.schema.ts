import { z } from "zod";

const createFormSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
});

type ICreateFormSchema = z.infer<typeof createFormSchema>;

export { createFormSchema, ICreateFormSchema };