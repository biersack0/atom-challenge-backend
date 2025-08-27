import { IUser } from "@/domain/user/user.entity";

export interface AuthResponseDTO {
    token: string;
    user: IUser
}