import { User } from "@/domain/user/user.entity";
import { IUserRepository } from "@/domain/user/user.repository";

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);
        if (user) return user;
        return await this.userRepository.create(email);
    }
}
