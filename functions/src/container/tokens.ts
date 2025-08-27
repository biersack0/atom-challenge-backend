export const TOKENS = {
    // Auth
    IAuthService: Symbol.for("IAuthService"),
    ILoginUseCase: Symbol.for("ILoginUseCase"),
    IRegisterUseCase: Symbol.for("IRegisterUseCase"),

    // User
    IUserRepository: Symbol.for("IUserRepository"),

    // Task
    ITaskRepository: Symbol.for("ITaskRepository"),
    IGetTasksByUserUseCase: Symbol.for("IGetTasksByUserUseCase"),
    ICreateTaskUseCase: Symbol.for("ICreateTaskUseCase"),
    IUpdateTaskUseCase: Symbol.for("IUpdateTaskUseCase"),
    IDeleteTaskUseCase: Symbol.for("IDeleteTaskUseCase"),
}