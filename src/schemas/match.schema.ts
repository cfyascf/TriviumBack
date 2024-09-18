import { z } from "zod";

const createMatchSchema = z.object({
    name: z.string().min(3).max(50),
    formId: z.string(),
    admId: z.string()
});

type ICreateMatchSchema = z.infer<typeof createMatchSchema>;

export { createMatchSchema, ICreateMatchSchema };