import "reflect-metadata";
import { container as rootContainer } from "tsyringe";
import { ValidateUserUseCase } from './../../../../src/application/user/validateUser.usecase';
import { TOKENS } from './../../../../src/container/tokens';
import { IUserRepository } from './../../../../src/domain/user/user.repository';
import { UserMockRepository } from './../../../../src/infrastructure/database/user.mock.repository';

let testContainer: typeof rootContainer;

describe("ValidateUserUseCase", () => {
  let validateUserUseCase: ValidateUserUseCase;
  let userRepository: IUserRepository;

  beforeEach(() => {
    testContainer = rootContainer.createChildContainer();
    testContainer.register(TOKENS.IUserRepository, { useClass: UserMockRepository });
    userRepository = testContainer.resolve(TOKENS.IUserRepository);
    validateUserUseCase = new ValidateUserUseCase(userRepository);
  });

  it("debería lanzar un error si el usuario no existe", async () => {
    const email = "test@test.com";
    await expect(validateUserUseCase.execute(email)).rejects.toThrow("Usuario no encontrado");
  });

  it("debería validar que existe el usuario", async () => {
    const email = "test@test.com";
    await userRepository.create(email);

    const userFound = await validateUserUseCase.execute(email);

    expect(userFound).not.toBeNull();
    expect(userFound).toMatchObject({ email });
  });
});
