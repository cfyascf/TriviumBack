import { Response, Request } from "express"
import { loginService } from "../services/auth.service"
import { ILoginSchema } from "../schemas/auth.schema";

export const loginController = async (req:Request, res:Response) => {
    const service = await loginService(req.body);

    return res.status(200).json({ token: service.token, user: service.user });
}