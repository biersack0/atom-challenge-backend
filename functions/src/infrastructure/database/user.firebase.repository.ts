import {injectable} from "tsyringe";
import admin from "@/config/firebase";
import {IUser} from "@/domain/user/user.entity";
import {IUserRepository} from "@/domain/user/user.repository";

const COLLECTION = "users";

@injectable()
export class UserFirebaseRepository implements IUserRepository {
  private db = admin.firestore();

  async findById(id: string): Promise<IUser | null> {
    const user = await this.db.collection(COLLECTION).where("id", "==", id).get();
    if (user.empty) return null;
    return user.docs[0].data() as IUser;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.db.collection(COLLECTION).where("email", "==", email).get();
    if (user.empty) return null;
    return user.docs[0].data() as IUser;
  }

  async create(email: string): Promise<IUser> {
    const now = new Date();
    const id = this.db.collection(COLLECTION).doc().id;

    const userData: IUser = {
      id,
      email: email.toLowerCase().trim(),
      createdAt: admin.firestore.Timestamp.fromDate(now).toDate(),
      updatedAt: admin.firestore.Timestamp.fromDate(now).toDate(),
    };

    await this.db.collection(COLLECTION).doc(id).set(userData);

    return {
      id,
      email: userData.email,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
  }
}
