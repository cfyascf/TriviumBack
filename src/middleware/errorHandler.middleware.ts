import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { ZodError } from "zod";

export const handleError = (err:Error, req:Request, res:Response, next:NextFunction) => {
    if(err instanceof AppError) {
        res.send(err.statusCode).json({ message: err.message });
    }

    if(err instanceof ZodError) {
        res.send(400).json({ message: err.flatten().fieldErrors });
    }

    console.log(err)
    return res.send(500).json({ message: 'Internal server error.' });
}