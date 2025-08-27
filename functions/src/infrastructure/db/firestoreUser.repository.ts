// import * as admin from "firebase-admin";
import { IUserRepository } from "@/domain/user/user.repository";
import { IUser } from "@/domain/user/user.entity";
import admin from "@/config/firebase";

const COLLECTION = "users";

export class FirestoreUserRepository implements IUserRepository {
    private db = admin.firestore();

    async findByEmail(email: string): Promise<IUser | null> {
        const snapshot = await this.db.collection(COLLECTION).where("email", "==", email).limit(1).get();
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        const data = doc.data();

        const user: IUser = {
            id: doc.id,
            email: data.email,
            createdAt: data.createdAt.toDate?.() ?? new Date(data.createdAt)
        }

        return user;
        // return new User(doc.id, data.email, data.createdAt.toDate?.() ?? new Date(data.createdAt));
    }

    async create(email: string): Promise<IUser> {
        const now = new Date();
        const ref = await this.db.collection(COLLECTION).add({
            email,
            createdAt: admin.firestore.Timestamp.fromDate(now),
        });

        console.log('ref', ref.id);

        const user: IUser = {
            id: ref.id,
            email,
            createdAt: now
        }
        return user;
        // return new User(ref.id, email, now);
    }
}
