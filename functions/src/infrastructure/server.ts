// import userRouter from "../ /interfaces/http/user/user.router";
import userRouter from "../interfaces/http/user/user.router";
import express from "express";
// import userRouter from "@/interfaces/http/user/user.router";

const app = express();

app.use(express.json());
app.use("/user", userRouter);

export default app;