import admin from "firebase-admin";
import * as dotenv from "dotenv";
// import { loadCredentials } from "./enviroment";

dotenv.config();
// const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = loadCredentials();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.APP_FIREBASE_PROJECT_ID || "",
      clientEmail: process.env.APP_FIREBASE_CLIENT_EMAIL || "",
      privateKey: process.env.APP_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
    }),
  });
}

export default admin;
