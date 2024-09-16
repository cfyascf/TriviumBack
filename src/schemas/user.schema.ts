import { z } from "zod";

const createUserSchema = z.object({
    fullname: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: 'Password must contain at least eight characters, one uppercase letter, one lowercase letter, one number and one special character:' }
    ),
    role: z.number()
});

type ICreateUserSchema = z.infer<typeof createUserSchema>;

export { createUserSchema, ICreateUserSchema }