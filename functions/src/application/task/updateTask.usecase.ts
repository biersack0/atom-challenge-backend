import {inject, injectable} from "tsyringe";
import {TOKENS} from "@/container/tokens";
import {AppError} from "@/shared/app-error";
import {ITaskRepository} from "@/domain/task/task.repository";
import {IUserRepository} from "@/domain/user/user.repository";
import {ITask} from "@/domain/task/task.entity";

@injectable()
export class UpdateTaskUseCase {
  constructor(
        @inject(TOKENS.ITaskRepository) private taskRepository: ITaskRepository,
        @inject(TOKENS.IUserRepository) private userRepository: IUserRepository
  ) { }

  async execute(task: ITask): Promise<ITask> {
    const user = await this.userRepository.findById(task.userId);
    if (!user) {
      throw new AppError("Usuario no encontrado", 404);
    }

    const updatedTask = await this.taskRepository.update(task);
    return updatedTask;
  }
}
