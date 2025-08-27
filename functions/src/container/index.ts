import "reflect-metadata";
import { container } from "tsyringe";
import { TOKENS } from "./tokens";
import { IAuthService } from "@/domain/auth/auth.service";
import { IUserRepository } from "@/domain/user/user.repository";
import { UserFirebaseRepository } from "@/infrastructure/database/user.firebase.repository";
import { JwtService } from "@/infrastructure/security/jwt.service";
import { LoginUseCase } from "@/application/auth/login.usecase";
import { RegisterUseCase } from "@/application/auth/register.usecase";
import { FirestoreTaskRepository } from "@/infrastructure/database/task.firebase.repository";
import { CreateTaskUseCase } from "@/application/task/createTask.usecase";
import { ITaskRepository } from "@/domain/task/task.repository";
import { UpdateTaskUseCase } from "@/application/task/updateTask.usecase";
import { DeleteTaskUseCase } from "@/application/task/deleteTask.usecase";
import { GetTasksByUserIdUseCase } from "@/application/task/getTasksByUserId.usecase";

// Auth
container.register<IAuthService>(TOKENS.IAuthService, { useClass: JwtService });
container.register(TOKENS.ILoginUseCase, { useClass: LoginUseCase });
container.register(TOKENS.IRegisterUseCase, { useClass: RegisterUseCase });

// User
container.register<IUserRepository>(TOKENS.IUserRepository, { useClass: UserFirebaseRepository });

// Task
container.register<ITaskRepository>(TOKENS.ITaskRepository, { useClass: FirestoreTaskRepository });
container.register(TOKENS.IGetTasksByUserUseCase, { useClass: GetTasksByUserIdUseCase });
container.register(TOKENS.ICreateTaskUseCase, { useClass: CreateTaskUseCase });
container.register(TOKENS.IUpdateTaskUseCase, { useClass: UpdateTaskUseCase });
container.register(TOKENS.IDeleteTaskUseCase, { useClass: DeleteTaskUseCase });

export { container };