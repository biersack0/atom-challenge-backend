import "reflect-metadata";
import { container as rootContainer } from "tsyringe";
import { CreateTaskUseCase } from './../../../../src/application/task/createTask.usecase';
import { TOKENS } from './../../../../src/container/tokens';
import { ITaskRepository } from './../../../../src/domain/task/task.repository';
import { TaskMockRepository } from './../../../../src/infrastructure/database/task.mock.repository';
import { IUserRepository } from './../../../../src/domain/user/user.repository';
import { Task } from './../../../../src/domain/task/task.value';
import { UserMockRepository } from './../../../../src/infrastructure/database/user.mock.repository';

let testContainer: typeof rootContainer;

describe("CreateTaskUseCase", () => {
  let createTaskUseCase: CreateTaskUseCase;
  let taskRepository: ITaskRepository;
  let userRepository: IUserRepository;

  const makeTask = (userId: string) => new Task({
    userId,
    title: "Test Task",
    description: "Test Description",
  });

  beforeEach(() => {
    testContainer = rootContainer.createChildContainer();
    testContainer.register(TOKENS.ITaskRepository, { useClass: TaskMockRepository });
    taskRepository = testContainer.resolve(TOKENS.ITaskRepository);

    testContainer.register(TOKENS.IUserRepository, { useClass: UserMockRepository });
    userRepository = testContainer.resolve(TOKENS.IUserRepository);
    createTaskUseCase = new CreateTaskUseCase(taskRepository, userRepository);
  });

  it("debería dar error si el usuario no existe", async () => {
    const newTask = makeTask("1");

    await expect(createTaskUseCase.execute(newTask)).rejects.toThrow("Usuario no encontrado");
  });

  it("debería crear una tarea", async () => {
    const user = await userRepository.create("test@test.com");
    const newTask = makeTask(user.id);

    const task = await createTaskUseCase.execute(newTask);
    expect(task).toMatchObject({
      userId: user.id,
      title: newTask.title,
      description: newTask.description,
      isCompleted: newTask.isCompleted,
      createdAt: newTask.createdAt,
      updatedAt: newTask.updatedAt,
    });
  });
});
