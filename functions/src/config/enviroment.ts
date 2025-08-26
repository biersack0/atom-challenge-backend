interface ICredentials {
    JWT_SECRET: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_CLIENT_EMAIL: string;
    FIREBASE_PRIVATE_KEY: string;
}

export const loadCredentials = (): ICredentials => {
    return {
        JWT_SECRET: process.env.JWT_SECRET!,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID!,
        FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL!,
        FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY!,
    }
}