import { ITask } from "./task.entity";

export interface ITaskRepository {
    getTasksByUser(userId: string): Promise<ITask[]>;
    findById(id: string): Promise<ITask | null>;
    create(task: ITask): Promise<ITask>;
    update(task: ITask): Promise<ITask>;
    delete(id: string): Promise<void>;
}