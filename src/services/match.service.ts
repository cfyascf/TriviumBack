import { AppError } from "../error";
import Form from "../models/form.model";
import Match, { IMatch } from "../models/match.model";
import User from "../models/user.model";
import { ICreateMatchSchema } from "../schemas/match.schema";

export const createMatchService = async (payload:ICreateMatchSchema) => {
    const pin = getRandom();
    const user = User.findById(payload.admId);
    const form = Form.findById(payload.formId);

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