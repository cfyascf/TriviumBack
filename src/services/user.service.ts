import bcrypt from 'bcryptjs';
import User from "../models/user.model";
import { ICreateUserSchema, IUpdateUserSchema } from "../schemas/user.schema";
import { AppError } from "../error";
import { hashPasswordService } from './password.service';

export const createUserService = async (payload:ICreateUserSchema) => {
    const existingEmail = await User.find({ email: payload.email });

    if(existingEmail.length != 0) {
        throw new AppError('Email is already in use.', 405);
    }

    payload.password = await hashPasswordService(payload.password);
    await User.create(payload);

    return "User created successfully";
}

export const updateUserService = async (payload:IUpdateUserSchema, userid:string) => {
    const user = await User.findById(userid);
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
        user.password = await hashPasswordService(user.password);
    }

    await user.save();
    user.password = "";

    return { ...user };
}