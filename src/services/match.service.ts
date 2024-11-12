import Form from "../models/form.model";
import Match, { IMatch } from "../models/match.model";
import User from "../models/user.model";
import UserMatch from "../models/userMatch.model";
import { IAddUserToGroupSchema, ICreateMatchSchema, IUpdateMatchSchema } from "../schemas/match.schema";
import { AppError } from "../error";
import Score from "../models/score.model";
import mongoose from "mongoose";

export const createMatchService = async (payload:ICreateMatchSchema) => {
    const pin = getRandom();
    const user = await User.findById(payload.admId);
    if(user == null) {
        throw new AppError("User not found.", 404);
    }

    const form = await Form.findById(payload.formId);
    if(form == null) {
        throw new AppError("Form not found.", 404);
    }

    const match = new Match({
        name: payload.name,
        pin: pin,
        admId: user,
        formId: form
    });

    await match.save();

    return { ...match };
}

const getRandom = () => {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

export const addUserService = async (payload:IAddUserToGroupSchema) => {
    const user = await User.findById(payload.userId);
    if(user == null) {
        throw new AppError("User not found.", 404);
    }

    const match = await Match.findOne({ pin: payload.pin });
    if(match == null) {
        throw new AppError("Match not found.", 404);
    }

    const existing = await UserMatch.find({ userId:payload.userId, matchId: match._id });
    if(existing.length > 0) {
        throw new AppError("User already in match.", 400);
    }

    const userMatch = new UserMatch({
        userId: user,
        matchId: match
    });

    await userMatch.save();

    return {message: "Entering room.", match: match._id };
}

export const updateMatchService = async (payload:IUpdateMatchSchema, userId:string) => {
    const user = await User.findById(userId);
    if(user == null) {
        throw new AppError("No user associated with the token's id.", 401);
    }

    const match = await Match.findById(payload.matchId);
    if(match == null) {
        throw new AppError("Match not found.", 404);
    }

    if(String(match.admId) != userId) {
        throw new AppError("This action can be performed only by the form's adm.", 403);
    } 

    const form = await Form.findById(payload.formId);
    if(form == null) {
        throw new AppError("Form not found.", 404);
    }

    match.formId = form.id;
    await match.save();

    return { ...match };
}

export const getMatchByIdService = async (id: string) => {
    const match = await Match.findById(id);
    
    if (match == null) {
        throw new AppError("Match not found.", 404);
    }

    const userMatches = await UserMatch.find({ matchId: id });
    const usersId = userMatches.map(match => match.userId);

    const users = await User.find({ _id: { $in: usersId } });

    users.forEach(user => {
        user.password = '';
    });

    return { match: match, users: users };
}

export const getMatchByUserService = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User not found.", 404);
    }

    const userMatches = await UserMatch.find({ userId });
    const matchesIds = userMatches.map(match => match.matchId);

    const matches = await Match.find({ _id: { $in: matchesIds } })
        .populate('formId')

    const scores = await Score.find({ matchId: { $in: matchesIds } });

    const matchesWithScores = matches.map(match => {
        const score = scores.find(score => String(score.matchId) === String(match._id));
        return {
            ...match.toObject(),
            score: score || null,
        };
    });

    return matchesWithScores;
};

export const getMatchByAdmService = async (admId:string) => {
    const adm = await User.findById(admId);
    if(adm == null) {
        throw new AppError("Adm's user not found.", 404);
    }

    const matches = await Match.find({ admId });

    return { ...matches };
}

export const getMatchByUserAndFormService = async (userId:string, formId:string) => {
    const user = await User.findById(userId);
    if(user == null) {
        throw new AppError("User not found.", 404);
    }

    const form = await Form.findById(formId);
    if(form == null) {
        throw new AppError("Form not found.", 404);
    }

    const userMatches = await UserMatch.find({ userId });
    const matchesIds = userMatches.map(match => match.matchId);
    const allMatches = await Match.find({ _id: { $in: matchesIds } });
    const matches = allMatches.filter(match => String(match.formId) == formId);

    return { ...matches };
}