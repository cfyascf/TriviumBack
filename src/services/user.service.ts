import bcrypt from 'bcryptjs';
// import { omit } from "lodash";
import User from "../models/user.model";
import { ICreateUserSchema } from "../schemas/user.schema";
import { AppError } from "../error";

export const createUserService = async (payload:ICreateUserSchema) => {
    const existingEmail = await User.find({ email: payload.email });

    if(existingEmail.length != 0) {
        throw new AppError('Email is already in use.', 405);
    }

    const salt = await bcrypt.genSalt(12);
    const passhash = await bcrypt.hash(payload.password, salt);
    payload.password = passhash;
    const user = await User.create(payload);

    return "User created successfully";
}