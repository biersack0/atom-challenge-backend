import { Request, Response } from "express";
import { IUserController } from "./user.controller.interface";
import { CreateUserUseCase } from "@/application/user/createUser.usecase";
import { successResponse } from "@/shared/utils/response.util";

export class UserController implements IUserController {
    constructor(private createUserUseCase: CreateUserUseCase) { }

    async createUser(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;
        const user = await this.createUserUseCase.execute(email);

        return res.status(201).json(successResponse({
            success: true,
            data: user
        }));
    }
}