import { User } from "@/domain/user/user.entity";
import { IUserRepository } from "@/domain/user/user.repository";

export class LoginUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }
}
