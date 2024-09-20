import { z } from "zod";

const createScoreSchema = z.object({
    userId: z.string(),
    matchId: z.string(),
    points: z.number(),
});

type ICreateScoreSchema = z.infer<typeof createScoreSchema>;

export { createScoreSchema, ICreateScoreSchema }