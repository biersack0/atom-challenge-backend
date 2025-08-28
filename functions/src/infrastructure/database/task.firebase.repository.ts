import { injectable } from "tsyringe";
import admin from "@/config/firebase";
import { ITask } from "@/domain/task/task.entity";
import { ITaskRepository } from "@/domain/task/task.repository";
import { AppError } from "@/shared/app-error";
import { Timestamp } from "firebase-admin/firestore";

const COLLECTION = "tasks";

@injectable()
export class TaskFirebaseRepository implements ITaskRepository {
  private db = admin.firestore();
  async findById(id: string): Promise<ITask | null> {
    const task = await this.db.collection(COLLECTION).doc(id).get();
    return task.data() as ITask || null;
  }

  async getTasksByUser(userId: string): Promise<ITask[]> {
    const tasks = await this.db.collection(COLLECTION).where("userId", "==", userId).get();
    const taskList = tasks.docs.map((doc) => doc.data() as ITask);

    return taskList.sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }

      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
  }

  async create(task: ITask): Promise<ITask> {
    const now = Timestamp.fromDate(new Date());
    const taskId = this.db.collection(COLLECTION).doc().id;

    const taskData: ITask = {
      id: taskId,
      userId: task.userId,
      title: task.title,
      description: task.description || "",
      isCompleted: task.isCompleted ?? false,
      createdAt: now.toDate(),
      updatedAt: now.toDate(),
    };

    await this.db.collection(COLLECTION).doc(taskId).set(taskData);
    return taskData;
  }
  async update(task: ITask): Promise<ITask> {
    const taskRef = this.db.collection(COLLECTION).doc(task.id);
    const doc = await taskRef.get();

    if (!doc.exists) {
      throw new AppError("Tarea no encontrada", 404);
    }

    const taskData = {
      ...task,
      updatedAt: new Date(),
    };
    await taskRef.update(taskData);
    return taskData;
  }

  async delete(id: string): Promise<void> {
    await this.db.collection(COLLECTION).doc(id).delete();
  }
}
