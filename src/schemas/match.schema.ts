import { z } from "zod";

const createMatchSchema = z.object({
    name: z.string().min(3).max(50),
    formId: z.string(),
    admId: z.string()
});

const addUserToMatchSchema = z.object({
    userId: z.string(),
    pin: z.string()
});

const updateMatchSchema = z.object({
    matchId: z.string(),
    formId: z.string()
});

type ICreateMatchSchema = z.infer<typeof createMatchSchema>;
type IAddUserToGroupSchema = z.infer<typeof addUserToMatchSchema>;
type IUpdateMatchSchema = z.infer<typeof updateMatchSchema>;

export { 
    createMatchSchema, ICreateMatchSchema,
    addUserToMatchSchema, IAddUserToGroupSchema,
    updateMatchSchema, IUpdateMatchSchema
};