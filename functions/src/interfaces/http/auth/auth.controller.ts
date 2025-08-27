import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IAuthController } from "./auth.controller.interface";
import { LoginUseCase } from "@/application/auth/login.usecase";
import { RegisterUseCase } from "@/application/auth/register.usecase";
import { TOKENS } from "@/container/tokens";
import { successResponse } from "@/shared/utils/response.util";

@injectable()
export class AuthController implements IAuthController {
    constructor(
        @inject(TOKENS.ILoginUseCase) private loginUseCase: LoginUseCase,
        @inject(TOKENS.IRegisterUseCase) private registerUseCase: RegisterUseCase
    ) { }

    async login(req: Request, res: Response) {
        const { email } = req.body;
        const result = await this.loginUseCase.execute(email);
        return res.status(200).json(successResponse(result, "Login exitoso"));
    }

    async register(req: Request, res: Response) {
        const { email } = req.body;
        const result = await this.registerUseCase.execute(email);
        return res.status(200).json(successResponse(result, "Registro exitoso"));
    }
}