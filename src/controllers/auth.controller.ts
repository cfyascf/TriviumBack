import { Response, Request } from "express"
import { loginService } from "../services/auth.service"
import { ILoginSchema } from "../schemas/auth.schema";

interface IServiceReturn {
    token:string
}

export const loginController = async (req:Request<{}, {}, ILoginSchema>, res:Response) => {
    const service = await loginService(req.body);

    return res.status(200).json({ message: service });
}