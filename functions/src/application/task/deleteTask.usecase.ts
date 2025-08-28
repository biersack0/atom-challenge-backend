import {inject, injectable} from "tsyringe";
import {TOKENS} from "@/container/tokens";
import {AppError} from "@/shared/app-error";
import {ITaskRepository} from "@/domain/task/task.repository";

@injectable()
export class DeleteTaskUseCase {
  constructor(
        @inject(TOKENS.ITaskRepository) private taskRepository: ITaskRepository,
  ) { }

  async execute(taskId: string): Promise<void> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new AppError("Tarea no encontrada", 404);
    }

    await this.taskRepository.delete(taskId);
  }
}
