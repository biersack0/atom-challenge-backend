import "reflect-metadata"
import { container as rootContainer } from "tsyringe";
import { TOKENS } from "@/container/tokens";
import { ITaskRepository } from "@/domain/task/task.repository";
import { TaskMockRepository } from "@/infrastructure/database/task.mock.repository";
import { UserMockRepository } from "@/infrastructure/database/user.mock.repository";
import { IUserRepository } from "@/domain/user/user.repository";
import { Task } from "@/domain/task/task.value";
import { UpdateTaskUseCase } from "@/application/task/updateTask.usecase";

let testContainer: typeof rootContainer;

describe("UpdateTaskUseCase", () => {
    let updateTaskUseCase: UpdateTaskUseCase;
    let taskRepository: ITaskRepository;
    let userRepository: IUserRepository;

    const makeTask = (userId: string) => new Task({
        userId,
        title: "Test Task",
        description: "Test Description"
    });

    beforeEach(() => {
        testContainer = rootContainer.createChildContainer();
        testContainer.register(TOKENS.ITaskRepository, { useClass: TaskMockRepository });
        taskRepository = testContainer.resolve(TOKENS.ITaskRepository);

        testContainer.register(TOKENS.IUserRepository, { useClass: UserMockRepository });
        userRepository = testContainer.resolve(TOKENS.IUserRepository);

        updateTaskUseCase = new UpdateTaskUseCase(taskRepository, userRepository);
    })

    it("debería dar error si el usuario no existe", async () => {
        const task = makeTask("1");
        await expect(updateTaskUseCase.execute(task)).rejects.toThrow("Usuario no encontrado");
    })

    it("debería actualizar una tarea", async () => {
        const user = await userRepository.create("test@test.com");
        const task = makeTask(user.id);
        const originalTitle = task.title;
        const newTitle = "Updated Task";

        const taskCreated = await taskRepository.create(task);
        taskCreated.title = newTitle;

        const updatedTask = await updateTaskUseCase.execute(taskCreated);
        expect(updatedTask.title).toBe(newTitle);
        expect(updatedTask.title).not.toBe(originalTitle);
    })
})