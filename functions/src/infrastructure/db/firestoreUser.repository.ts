// import * as admin from "firebase-admin";
import { IUserRepository } from "@/domain/user/user.repository";
import { User } from "@/domain/user/user.entity";
import admin from "@/config/firebase";

const COLLECTION = "users";

export class FirestoreUserRepository implements IUserRepository {
    private db = admin.firestore();

    async findByEmail(email: string): Promise<User | null> {
        const snapshot = await this.db.collection(COLLECTION).where("email", "==", email).limit(1).get();
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        const data = doc.data();
        return new User(doc.id, data.email, data.createdAt.toDate?.() ?? new Date(data.createdAt));
    }

    async create(email: string): Promise<User> {
        const now = new Date();
        const ref = await this.db.collection(COLLECTION).add({
            email,
            createdAt: admin.firestore.Timestamp.fromDate(now),
        });
        return new User(ref.id, email, now);
    }
}
