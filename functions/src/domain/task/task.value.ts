import { randomUUID } from "crypto";
import { ITask } from "./task.entity";

export class Task implements ITask {
    id: string;
    userId: string;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(task: Partial<ITask> & { userId: string; title: string; description: string }) {
        this.id = task.id ?? randomUUID();
        this.userId = task.userId;
        this.title = task.title;
        this.description = task.description;
        this.isCompleted = task.isCompleted ?? false;
        this.createdAt = task.createdAt ?? new Date();
        this.updatedAt = task.updatedAt ?? new Date();
    }

    complete() {
        this.isCompleted = true;
        this.updatedAt = new Date();
    }
}