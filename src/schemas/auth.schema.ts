import { z } from "zod";

const loginSchema = z.object({
    email: z.string(),
    password: z.string()
});

type ILoginSchema = z.infer<typeof loginSchema>;

export { loginSchema, ILoginSchema };