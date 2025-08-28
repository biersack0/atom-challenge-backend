export const TOKENS = {
  // Auth
  IAuthService: Symbol.for("IAuthService"),
  ILoginUseCase: Symbol.for("ILoginUseCase"),
  IRegisterUseCase: Symbol.for("IRegisterUseCase"),

  // User
  IUserRepository: Symbol.for("IUserRepository"),
  IFindByEmailUseCase: Symbol.for("IFindByEmailUseCase"),
  ICreateUserUseCase: Symbol.for("ICreateUserUseCase"),

  // Task
  ITaskRepository: Symbol.for("ITaskRepository"),
  IGetTasksByUserUseCase: Symbol.for("IGetTasksByUserUseCase"),
  ICreateTaskUseCase: Symbol.for("ICreateTaskUseCase"),
  IUpdateTaskUseCase: Symbol.for("IUpdateTaskUseCase"),
  IDeleteTaskUseCase: Symbol.for("IDeleteTaskUseCase"),
};
