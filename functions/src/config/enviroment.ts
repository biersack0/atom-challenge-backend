interface ICredentials {
    NODE_PORT: string;
    JWT_SECRET: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_CLIENT_EMAIL: string;
    FIREBASE_PRIVATE_KEY: string;
}

export const loadCredentials = (): ICredentials => {
    return {
        NODE_PORT: process.env.NODE_PORT!,
        JWT_SECRET: process.env.JWT_SECRET! || "test-secret",
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID!,
        FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL!,
        FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY!,
    }
}