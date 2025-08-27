import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@/domain/user/user.repository";
import { IAuthService } from "@/domain/auth/auth.service";
import { IRegisterResponseDTO } from "./dtos/register-response.dto";
import { TOKENS } from "@/container/tokens";
import { AppError } from "@/shared/app-error";

@injectable()
export class RegisterUseCase {
    constructor(
        @inject(TOKENS.IUserRepository) private userRepository: IUserRepository,
        @inject(TOKENS.IAuthService) private authService: IAuthService
    ) { }

    async execute(email: string): Promise<IRegisterResponseDTO> {
        const user = await this.userRepository.findByEmail(email);
        if (user) throw new AppError("El usuario ya existe", 404);

        const newUser = await this.userRepository.create(email);
        const token = this.authService.sign(newUser);

        const response: IRegisterResponseDTO = {
            token,
            user: newUser
        }
        return response;
    }
}