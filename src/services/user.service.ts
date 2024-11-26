import User from "../models/user.model";
import UserMatch from "../models/userMatch.model";
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
        const newPassword = await hashPasswordService(payload.password);
        user.password = newPassword;
    }

    await user.save();
    user.password = "";

    return { ...user };
}

export const getUserByMatchService = async (matchId:string) => {
    const userMatchs = await UserMatch.find({ matchId });
    const usersIds = userMatchs.map(match => match.userId);
    const users = await User.find({ _id: { $in: usersIds } });

    return { ...users };
}

export const getUserByIdService = async (id:string) => {
    const user = await User.findById(id);
    if(user == null) {
        throw new AppError("User not found.", 404);
    }

    return { ...user };
}

export const deleteUserService = async (id:string) => {
    const user = await User.findByIdAndDelete(id);

    return { ...user };
}

export const getAllUserService = async (search: string | null) => {
    var users = null;

    if (search == null) {
        users = await User.find();
    }

    if (search != null) {
        users = await User.find({ fullname: { $regex: search, $options: 'i' } });
    }

    return { users: users }
}