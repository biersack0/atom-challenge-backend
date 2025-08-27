import { Request, Response } from "express";
import { LoginUseCase } from "@/application/auth/login.usecase";
import { IAuthController } from "./auth.controller.interface";
import { RegisterUseCase } from "@/application/auth/register.usecase";

export class AuthController implements IAuthController {
    constructor(private loginUseCase: LoginUseCase, private registerUseCase: RegisterUseCase) { }

    async login(req: Request, res: Response) {
        const { email } = req.body;
        try {
            const result = await this.loginUseCase.execute(email);
            return res.status(200).json(result);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }

    async register(req: Request, res: Response) {
        const { email } = req.body;
        try {
            const result = await this.registerUseCase.execute(email);
            return res.status(200).json(result);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}