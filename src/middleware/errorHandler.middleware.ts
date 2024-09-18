import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export const handleError = (err:Error, req:Request, res:Response, next:NextFunction) => {
    if(err instanceof AppError) {
        res.status(err.statusCode).json({ message: err.message });
    }

    if(err instanceof ZodError) {
        res.status(400).json({ message: err.flatten().fieldErrors });
    }

    if(err instanceof JsonWebTokenError) {
        res.status(403).json({ message: err.message });
    }

    console.log(err)
    return res.status(500).json({ message: 'Internal server error.' });
}