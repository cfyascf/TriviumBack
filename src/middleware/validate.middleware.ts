import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateBody = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const validated = schema.parse(req.body);
    req.body = validated;

    return next();
}