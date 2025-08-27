import { inject, injectable } from "tsyringe";
import { ITaskRepository } from "@/domain/task/task.repository";
import { TOKENS } from "@/container/tokens";
import { ITask } from "@/domain/task/task.entity";
import { IUserRepository } from "@/domain/user/user.repository";
import { AppError } from "@/shared/app-error";

@injectable()
export class GetTasksByUserIdUseCase {
    constructor(
        @inject(TOKENS.ITaskRepository) private taskRepository: ITaskRepository,
        @inject(TOKENS.IUserRepository) private userRepository: IUserRepository
    ) { }

    async execute(userId: string): Promise<ITask[]> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new AppError("Usuario no encontrado", 404);
        }

        const tasks = await this.taskRepository.getTasksByUser(userId);
        return tasks;
    }
}