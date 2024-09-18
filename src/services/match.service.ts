import { AppError } from "../error";
import Match from "../models/match.model";
import { ICreateMatchSchema } from "../schemas/match.schema";

export const createMatchService = async (payload:ICreateMatchSchema) => {
    const pin = getRandom();
}

const getRandom = () => {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}