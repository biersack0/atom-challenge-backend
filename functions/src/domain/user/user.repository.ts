import { IUser } from "./user.entity";

export interface IUserRepository {
    findByEmail(email: string): Promise<IUser | null>;
    create(email: string): Promise<IUser>;
}