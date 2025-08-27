import { injectable } from "tsyringe";
import { IUser } from "@/domain/user/user.entity";
import { IUserRepository } from "@/domain/user/user.repository";

@injectable()
export class UserMockRepository implements IUserRepository {
    private users: Record<string, IUser> = {};

    findById(id: string): Promise<IUser | null> {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<IUser | null> {
        throw new Error("Method not implemented.");
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
        this.users[id] = user;
        return user;
    }

}