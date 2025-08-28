import "reflect-metadata";
import { container as rootContainer } from "tsyringe";
import { UserMockRepository } from './../../../../src/infrastructure/database/user.mock.repository';
import { IAuthService } from './../../../../src/domain/auth/auth.service';
import { IUserRepository } from './../../../../src/domain/user/user.repository';
import { LoginUseCase } from './../../../../src/application/auth/login.usecase';
import { TOKENS } from './../../../../src/container/tokens';
import { JwtService } from '../../../../src/infrastructure/security/jwt.service';


let testContainer: typeof rootContainer;

describe("LoginUseCase", () => {
  let loginUseCase: LoginUseCase;
  let userRepository: IUserRepository;
  let authService: IAuthService;

  const email = "test@test.com";

  beforeEach(() => {
    testContainer = rootContainer.createChildContainer();
    testContainer.register(TOKENS.IUserRepository, { useClass: UserMockRepository });
    userRepository = testContainer.resolve(TOKENS.IUserRepository);

    testContainer.register(TOKENS.IAuthService, { useClass: JwtService });
    authService = testContainer.resolve(TOKENS.IAuthService);
    loginUseCase = new LoginUseCase(userRepository, authService);
  });

  it("debería dar error si el usuario no existe", async () => {
    await expect(loginUseCase.execute(email)).rejects.toThrow("Usuario no encontrado");
  });

  it("debería retornar token y usuario si el usuario existe", async () => {
    const user = await userRepository.create(email);
    const token = authService.sign(user);
    const result = await loginUseCase.execute(email);
    expect(result.user).toEqual(user);
    expect(result.token).toEqual(token);
  });
});
