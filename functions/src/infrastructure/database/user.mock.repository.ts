import { injectable } from "tsyringe";
import { IUser } from "@/domain/user/user.entity";
import { IUserRepository } from "@/domain/user/user.repository";

@injectable()
export class UserMockRepository implements IUserRepository {
    private users: IUser[] = [];

    async findById(id: string): Promise<IUser | null> {
        return this.users.find(user => user.id === id) || null;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return this.users.find(u => u.email === email) || null;
    }

    async create(email: string): Promise<IUser> {
        const now = new Date();
        const id = (Object.keys(this.users).length + 1).toString();
        const user: IUser = {
            id,
            email: email.toLowerCase().trim(),
            createdAt: now,
            updatedAt: now
        };
        this.users.push(user);
        return user;
    }

}