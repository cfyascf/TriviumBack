import { Request, Response } from "express";
import { addUserService, createMatchService, getMatchByAdmService, getMatchByIdService, getMatchByUserAndFormService, updateMatchService } from "../services/match.service";

export const createMatchController = async (req:Request, res:Response) => {
    const service = await createMatchService(req.body);

    res.status(201).json({ response: service });
}

export const addUserController = async (req:Request, res:Response) => {
    const service = await addUserService(req.body);

    res.status(200).json({ response: service });
}

export const updateMatchController = async (req:Request, res:Response) => {
    const service = await updateMatchService(req.body, res.locals.userid);

    res.status(200).json({ response: service });
}

export const getMatchController = async (req:Request, res:Response) => {
    var service = null;

    if(req.query.id != null) {
        service = await getMatchByIdService(String(req.query.id));
    } 

    if(req.query.admid != null) {
        service = await getMatchByAdmService(String(req.query.admid));
    }

    if(req.query.userid != null && req.query.formid != null) {
        service = await getMatchByUserAndFormService(
            String(req.query.userid), String(req.query.formid)
        );
    }

    res.status(200).json({ response: service });
}