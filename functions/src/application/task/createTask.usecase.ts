import { inject, injectable } from "tsyringe";
import { ITaskRepository } from "@/domain/task/task.repository";
import { TOKENS } from "@/container/tokens";
import { ITask } from "@/domain/task/task.entity";
import { IUserRepository } from "@/domain/user/user.repository";
import { AppError } from "@/shared/app-error";

@injectable()
export class CreateTaskUseCase {
    constructor(
        @inject(TOKENS.ITaskRepository) private taskRepository: ITaskRepository,
        @inject(TOKENS.IUserRepository) private userRepository: IUserRepository
    ) { }

    async execute(task: ITask): Promise<ITask> {
        const user = await this.userRepository.findById(task.userId);
        if (!user) {
            throw new AppError("Usuario no encontrado", 404);
        }

        const newTask = await this.taskRepository.create(task);
        return newTask;
    }
}