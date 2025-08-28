import {Request, Response} from "express";

export interface IUserController {
    validateUser(req: Request, res: Response): Promise<object>;
    createUser(req: Request, res: Response): Promise<object>;
}
