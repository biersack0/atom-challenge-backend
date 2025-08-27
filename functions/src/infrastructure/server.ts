import authRouter from "@/interfaces/http/auth/auth.router";
import userRouter from "@/interfaces/http/user/user.router";
import express from "express";

const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);

export default app;