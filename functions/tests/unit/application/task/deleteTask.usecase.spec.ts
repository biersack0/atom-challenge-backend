import "reflect-metadata";
import { container as rootContainer } from "tsyringe";
import { DeleteTaskUseCase } from './../../../../src/application/task/deleteTask.usecase';
import { TOKENS } from './../../../../src/container/tokens';
import { ITaskRepository } from './../../../../src/domain/task/task.repository';
import { TaskMockRepository } from './../../../../src/infrastructure/database/task.mock.repository';
import { Task } from './../../../../src/domain/task/task.value';


let testContainer: typeof rootContainer;

describe("DeleteTaskUseCase", () => {
  let deleteTaskUseCase: DeleteTaskUseCase;
  let taskRepository: ITaskRepository;

  const makeTask = (userId: string) => new Task({
    userId,
    title: "Test Task",
    description: "Test Description",
  });

  beforeEach(() => {
    testContainer = rootContainer.createChildContainer();
    testContainer.register(TOKENS.ITaskRepository, { useClass: TaskMockRepository });
    taskRepository = testContainer.resolve(TOKENS.ITaskRepository);
    deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
  });

  it("debería dar error si la tarea no existe", async () => {
    await expect(deleteTaskUseCase.execute("1")).rejects.toThrow("Tarea no encontrada");
  });

  it("debería eliminar una tarea existente", async () => {
    const task = makeTask("1");
    const taskCreated = await taskRepository.create(task);

    await deleteTaskUseCase.execute(taskCreated.id);

    const found = await taskRepository.findById(task.id);
    expect(found).toBeNull();
  });
});
