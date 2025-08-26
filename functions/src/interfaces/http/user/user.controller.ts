import { Request, Response } from "express";
import { CreateUserUseCase } from "@/application/user/createUser.usecase";

export class UserController {
    constructor(private createUserUseCase: CreateUserUseCase) { }

    async createUser(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const user = await this.createUserUseCase.execute(email);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ message: "Error al crear el usuario." });
        }
    }
}