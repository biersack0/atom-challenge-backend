import {injectable} from "tsyringe";
import {ITask} from "@/domain/task/task.entity";
import {ITaskRepository} from "@/domain/task/task.repository";
import {AppError} from "@/shared/app-error";
import {Task} from "@/domain/task/task.value";

@injectable()
export class TaskMockRepository implements ITaskRepository {
  private tasks: ITask[] = [];

  async findById(id: string): Promise<ITask | null> {
    const task = this.tasks.find((task) => task.id === id);
    return task || null;
  }

  async getTasksByUser(userId: string): Promise<ITask[]> {
    const tasks = this.tasks.filter((task) => task.userId === userId);
    return tasks;
  }

  async create(task: ITask): Promise<ITask> {
    const newTask = new Task({
      userId: task.userId,
      title: task.title,
      description: task.description || "",
      isCompleted: task.isCompleted ?? false,
    });
    this.tasks.push(newTask);
    return newTask;
  }

  async update(task: ITask): Promise<ITask> {
    const taskIndex = this.tasks.findIndex(({id}) => id === task.id);
    if (taskIndex === -1) {
      throw new AppError("Tarea no encontrada", 404);
    }
    this.tasks[taskIndex] = task;
    return task;
  }

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
