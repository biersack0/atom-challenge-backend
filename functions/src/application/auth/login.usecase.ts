import { IAuthService } from "@/domain/auth/auth.service";
import { IUserRepository } from "@/domain/user/user.repository";
import { AuthResponseDTO } from "./login-response.dto";

export class LoginUseCase {
    constructor(
        private userRepository: IUserRepository,
        private authService: IAuthService
    ) { }

    async execute(email: string): Promise<AuthResponseDTO> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("Usuario no encontrado");

        const token = this.authService.sign(user);

        const response: AuthResponseDTO = {
            token,
            user
        }

        return response;
    }
}