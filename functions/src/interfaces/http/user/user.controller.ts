import {inject, injectable} from "tsyringe";
import {Request, Response} from "express";
import {TOKENS} from "@/container/tokens";
import {IUserController} from "./user.controller.interface";
import {CreateUserUseCase} from "@/application/user/createUser.usecase";
import {successResponse} from "@/shared/utils/response.util";
import {ValidateUserUseCase} from "@/application/user/validateUser.usecase";

@injectable()
export class UserController implements IUserController {
  constructor(
        @inject(TOKENS.IFindByEmailUseCase) private findByEmailUseCase: ValidateUserUseCase,
        @inject(TOKENS.ICreateUserUseCase) private createUserUseCase: CreateUserUseCase
  ) { }
  async validateUser(req: Request, res: Response): Promise<object> {
    const {email} = req.body;
    await this.findByEmailUseCase.execute(email);

    return res.status(200).json(successResponse("", "Usuario encontrado"));
  }

  async createUser(req: Request, res: Response): Promise<object> {
    const {email} = req.body;
    const user = await this.createUserUseCase.execute(email);

    return res.status(201).json(successResponse({
      success: true,
      data: user,
    }));
  }
}
