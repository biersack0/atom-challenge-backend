import { IUser } from "./user.entity";

export interface IUserRepository {
    findById(id: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    create(email: string): Promise<IUser>;
}