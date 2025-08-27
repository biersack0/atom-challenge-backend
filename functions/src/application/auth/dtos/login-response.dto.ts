import { IUser } from "@/domain/user/user.entity";

export interface ILoginResponseDTO {
    user: IUser;
    token: string;
}