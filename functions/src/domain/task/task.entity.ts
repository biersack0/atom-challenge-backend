export interface ITask {
    id: string;
    userId: string;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}