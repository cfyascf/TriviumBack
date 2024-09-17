import bcrypt from 'bcryptjs';
import User from "../models/user.model";
import { ICreateUserSchema, IUpdateUserSchema } from "../schemas/user.schema";
import { AppError } from "../error";

export const createUserService = async (payload:ICreateUserSchema) => {
    const existingEmail = await User.find({ email: payload.email });

    if(existingEmail.length != 0) {
        throw new AppError('Email is already in use.', 405);
    }

    const salt = await bcrypt.genSalt(12);
    const passhash = await bcrypt.hash(payload.password, salt);
    payload.password = passhash;
    await User.create(payload);

    return "User created successfully";
}

export const updateUserService = async (payload:IUpdateUserSchema) => {
    const user = await User.findById(payload.id);
    if(!user) {
        throw new AppError("User not found.", 404);
    }

    if(payload.fullname) {
        user.fullname = payload.fullname;
    }

    if(payload.email) {
        user.email = payload.email;
    }

    if(payload.password) {
        user.password = payload.password;
    }

    await user.save();
    user.password = "";

    return { ...user };
}