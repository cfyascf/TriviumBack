import { AppError } from "../error";
import Match from "../models/match.model";
import Score from "../models/score.model";
import User from "../models/user.model";
import UserMatch from "../models/userMatch.model";
import { ICreateScoreSchema } from "../schemas/score.schema";

export const createScoreService = async (payload:ICreateScoreSchema) => {

    const user = await User.findById(payload.userId);
    if (!user) throw new AppError("User not found.", 404);

    const match = await Match.findById(payload.matchId);
    if (!match) throw new AppError("Match not found.", 404);

    const userMatch = await UserMatch.find({ userId: user, matchId: match });
    if (!userMatch) throw new AppError("UserMatch not found.", 404);

    const score = new Score({
        userId: user,
        matchId: match,
        points: payload.points
    });

    await score.save();

    return score;
}

export const getAllScoresByMatchIdService = async (id: string) => {

    if(!id || id === "") throw new AppError("Id is missing.", 404);

    const scores = await Score.find({ matchId: id });
    if (!scores) throw new AppError("Scores not found.", 404);

    return scores;
}

export const getScoreByMatchIdAndUserIdService = async (userId: string, matchId: string) => {

    if(!matchId) throw new AppError("MatchId is missing.", 404); 
    if(!userId) throw new AppError("UserId is missing.", 404); 

    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found.", 404);

    const match = await Match.findById(matchId);
    if (!match) throw new AppError("Match not found.", 404);

    const userMatch = await UserMatch.find({ userId: user, matchId: match });
    if (!userMatch) throw new AppError("UserMatch not found.", 404);

    const score = await Score.find({ matchId: matchId, userId: userId });
    if (!score) throw new AppError("Score not found.", 404);

    return score;
}