import bcrypt from 'bcryptjs';
import pkg from 'jsonwebtoken';
import 'dotenv/config'
import User from "../models/user.model";
import { ILoginSchema } from "../schemas/auth.schema";
import { AppError } from "../error";

const { sign } = pkg;

export const loginService = async (payload:ILoginSchema) => {
    const user = await User.findOne({ email: payload.email }).select("-password");
    if(user == null) {
        throw new AppError("Email not registered.", 401);
    }

    if(!await bcrypt.compare(payload.password, user.password)) {
        throw new AppError("Wrong password.", 403);
    }

    const token = sign(
        {
            userid: user.id
        },
        String(process.env.SECRET),
        {
            expiresIn: String(process.env.EXPIRES_IN)
        }
    )

    return { token, ...user };
}