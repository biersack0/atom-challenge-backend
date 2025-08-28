import "reflect-metadata";
import {container as rootContainer} from "tsyringe";
import {CreateUserUseCase} from "@/application/user/createUser.usecase";
import {TOKENS} from "@/container/tokens";
import {IUserRepository} from "@/domain/user/user.repository";
import {UserMockRepository} from "@/infrastructure/database/user.mock.repository";

let testContainer: typeof rootContainer;

describe("CreateUserUseCase", () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: IUserRepository;

  beforeEach(() => {
    testContainer = rootContainer.createChildContainer();
    testContainer.register(TOKENS.IUserRepository, {useClass: UserMockRepository});
    userRepository = testContainer.resolve(TOKENS.IUserRepository);
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it("debería crear un usuario si no existe", async () => {
    const email = "test@test.com";

    const user = await createUserUseCase.execute(email);

    const userFound = await userRepository.findByEmail(email);
    expect(userFound).toEqual(user);
  });

  it("debería lanzar un error si el usuario ya existe", async () => {
    const email = "test@test.com";
    await createUserUseCase.execute(email);
    await expect(createUserUseCase.execute(email)).rejects.toThrow("Usuario ya existe");
  });
});
