import "reflect-metadata";
import "@/container";
import express from "express";
// import cors from "cors";
import { container } from "tsyringe";
import { authRouter } from "./http/auth/auth.router";
import { AuthController } from "./http/auth/auth.controller";
import { taskRouter } from "./http/task/task.router";
import { TaskController } from "./http/task/task.controller";
import { errorMiddleware } from "@/infrastructure/security/error.middleware";
import { notFoundMiddleware } from "@/infrastructure/security/notFound.middleware";


const authController = container.resolve(AuthController)
const taskController = container.resolve(TaskController)
/* const authController = container.resolve(AuthController);
container.resolve(LoginUseCase); */

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json({ limit: "10mb" }));

/* app.use(cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
}));
app.get("/", (_, res) => res.send("Service Works")); */

app.use("/auth", authRouter(authController));
app.use("/task", taskRouter(taskController));


app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;