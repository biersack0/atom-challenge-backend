import { Request, Response } from "express";

export interface ITaskController {
    getTasksByUser(req: Request, res: Response): Promise<object>;
    create(req: Request, res: Response): Promise<object>;
    updateTask(req: Request, res: Response): Promise<object>;
    deleteTask(req: Request, res: Response): Promise<object>;
}