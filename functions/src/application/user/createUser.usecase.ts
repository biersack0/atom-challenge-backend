import { injectable, inject } from "tsyringe";
import { IUser } from "@/domain/user/user.entity";
import { IUserRepository } from "@/domain/user/user.repository";

@injectable()
export class CreateUserUseCase {
    constructor(@inject("IUserRepository") private userRepository: IUserRepository) { }

    async execute(email: string): Promise<IUser> {
        return this.userRepository.create(email);
    }
}