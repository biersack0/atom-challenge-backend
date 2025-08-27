import { IUser } from "@/domain/user/user.entity";

export interface IRegisterResponseDTO {
    user: IUser;
    token: string;
}