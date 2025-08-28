import "reflect-metadata";
import {container as rootContainer} from "tsyringe";
import {TOKENS} from "@/container/tokens";
import {ITaskRepository} from "@/domain/task/task.repository";
import {TaskMockRepository} from "@/infrastructure/database/task.mock.repository";
import {GetTasksByUserIdUseCase} from "@/application/task/getTasksByUserId.usecase";
import {UserMockRepository} from "@/infrastructure/database/user.mock.repository";
import {IUserRepository} from "@/domain/user/user.repository";
import {Task} from "@/domain/task/task.value";

let testContainer: typeof rootContainer;

describe("GetTasksByUserIdUseCase", () => {
  let getTasksByUserIdUseCase: GetTasksByUserIdUseCase;
  let taskRepository: ITaskRepository;
  let userRepository: IUserRepository;

  const makeTask = (userId: string) => new Task({
    userId,
    title: "Test Task",
    description: "Test Description",
  });

  beforeEach(() => {
    testContainer = rootContainer.createChildContainer();
    testContainer.register(TOKENS.ITaskRepository, {useClass: TaskMockRepository});
    taskRepository = testContainer.resolve(TOKENS.ITaskRepository);

    testContainer.register(TOKENS.IUserRepository, {useClass: UserMockRepository});
    userRepository = testContainer.resolve(TOKENS.IUserRepository);

    getTasksByUserIdUseCase = new GetTasksByUserIdUseCase(taskRepository, userRepository);
  });

  it("debería dar error si el usuario no existe", async () => {
    await expect(getTasksByUserIdUseCase.execute("1")).rejects.toThrow("Usuario no encontrado");
  });

  it("debería retornar las tareas del usuario", async () => {
    const user = await userRepository.create("test@test.com");
    const task = makeTask(user.id);
    const taskCreated = await taskRepository.create(task);

    const tasks = await getTasksByUserIdUseCase.execute(user.id);
    expect(tasks).toEqual([taskCreated]);
  });
});
