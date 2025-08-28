import {IUser} from "./user.entity";

export class User implements IUser {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
