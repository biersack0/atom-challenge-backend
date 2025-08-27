import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@/domain/user/user.repository";
import { ILoginResponseDTO } from "./dtos/login-response.dto";
import { IAuthService } from "@/domain/auth/auth.service";
import { TOKENS } from "@/container/tokens";
import { AppError } from "@/shared/app-error";

@injectable()
export class LoginUseCase {
    constructor(
        @inject(TOKENS.IUserRepository) private userRepository: IUserRepository,
        @inject(TOKENS.IAuthService) private authService: IAuthService
    ) { }

    async execute(email: string): Promise<ILoginResponseDTO> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new AppError("Usuario no encontrado", 404);

        const token = this.authService.sign(user);

        const response: ILoginResponseDTO = {
            token,
            user
        }
        return response;
    }
}