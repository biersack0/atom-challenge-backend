import {inject, injectable} from "tsyringe";
import {ITaskController} from "./task.controller.interface";
import {Request, Response} from "express";
import {CreateTaskUseCase} from "@/application/task/createTask.usecase";
import {TOKENS} from "@/container/tokens";
import {Task} from "@/domain/task/task.value";
import {ITask} from "@/domain/task/task.entity";
import {successResponse} from "@/shared/utils/response.util";
import {GetTasksByUserIdUseCase} from "@/application/task/getTasksByUserId.usecase";
import {UpdateTaskUseCase} from "@/application/task/updateTask.usecase";
import {DeleteTaskUseCase} from "@/application/task/deleteTask.usecase";

@injectable()
export class TaskController implements ITaskController {
  constructor(
        @inject(TOKENS.ICreateTaskUseCase) private createTaskUseCase: CreateTaskUseCase,
        @inject(TOKENS.IGetTasksByUserUseCase) private getTasksByUserUseCase: GetTasksByUserIdUseCase,
        @inject(TOKENS.IUpdateTaskUseCase) private updateTaskUseCase: UpdateTaskUseCase,
        @inject(TOKENS.IDeleteTaskUseCase) private deleteTaskUseCase: DeleteTaskUseCase
  ) { }
  async getTasksByUser(req: Request, res: Response): Promise<object> {
    const {userId} = req.params;
    const tasks = await this.getTasksByUserUseCase.execute(userId);
    return res.status(200).json(successResponse(tasks, "Tareas obtenidas exitosamente"));
  }

  async create(req: Request, res: Response): Promise<object> {
    const {userId, title, description, isCompleted} = req.body as ITask;

    const newTask = new Task({
      userId,
      title,
      description,
      isCompleted,
    });
    const task = await this.createTaskUseCase.execute(newTask);
    return res.status(201).json(successResponse(task, "Tarea creada exitosamente"));
  }

  async updateTask(req: Request, res: Response): Promise<object> {
    const {id, userId, title, description, isCompleted} = req.body as ITask;
    const taskUpdated = new Task({
      id,
      userId,
      title,
      description,
      isCompleted,
    });
    const task = await this.updateTaskUseCase.execute(taskUpdated);
    return res.status(200).json(successResponse(task, "Tarea actualizada exitosamente"));
  }

  async deleteTask(req: Request, res: Response): Promise<object> {
    const {taskId} = req.params;
    await this.deleteTaskUseCase.execute(taskId as string);
    return res.status(200).json(successResponse("", "Tarea eliminada exitosamente"));
  }
}
