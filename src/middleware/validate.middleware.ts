import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../error";

export const validateBody = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const validated = schema.parse(req.body);
    req.body = validated;

    return next();
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const jwt = req.headers.authorization;
    if(!jwt) {
        throw new AppError("JWT token is missing.", 401);
    }

    const [_bearer, token] = jwt.split(" ");

    verify(
        token, 
        String(process.env.SECRET),
        (err:any, decoded:any) => {
            res.locals.userid = decoded.userid
        }); 

    return next();
}