import {injectable, inject} from "tsyringe";
import {TOKENS} from "@/container/tokens";
import {IUser} from "@/domain/user/user.entity";
import {IUserRepository} from "@/domain/user/user.repository";
import {AppError} from "@/shared/app-error";

@injectable()
export class CreateUserUseCase {
  constructor(@inject(TOKENS.IUserRepository) private userRepository: IUserRepository) { }

  async execute(email: string): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new AppError("Usuario ya existe", 400);
    }
    return this.userRepository.create(email);
  }
}
