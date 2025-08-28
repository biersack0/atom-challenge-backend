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
    FIREBASE_PROJECT_ID: process.env.APP_FIREBASE_PROJECT_ID!,
    FIREBASE_CLIENT_EMAIL: process.env.APP_FIREBASE_CLIENT_EMAIL!,
    FIREBASE_PRIVATE_KEY: process.env.APP_FIREBASE_PRIVATE_KEY!,
  };
};
