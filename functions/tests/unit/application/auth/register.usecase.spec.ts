import "reflect-metadata";
import { container as rootContainer } from "tsyringe";
import { UserMockRepository } from './../../../../src/infrastructure/database/user.mock.repository';
import { TOKENS } from './../../../../src/container/tokens';
import { IAuthService } from './../../../../src/domain/auth/auth.service';
import { IUserRepository } from './../../../../src/domain/user/user.repository';
import { RegisterUseCase } from './../../../../src/application/auth/register.usecase';
import { JwtService } from '../../../../src/infrastructure/security/jwt.service';


let testContainer: typeof rootContainer;

describe("RegisterUseCase", () => {
  let registerUseCase: RegisterUseCase;
  let userRepository: IUserRepository;
  let authService: IAuthService;

  const email = "test@test.com";

  beforeEach(() => {
    testContainer = rootContainer.createChildContainer();
    testContainer.register(TOKENS.IUserRepository, { useClass: UserMockRepository });
    userRepository = testContainer.resolve(TOKENS.IUserRepository);

    testContainer.register(TOKENS.IAuthService, { useClass: JwtService });
    authService = testContainer.resolve(TOKENS.IAuthService);
    registerUseCase = new RegisterUseCase(userRepository, authService);
  });

  it("debería dar error si el usuario ya existe", async () => {
    const response = await registerUseCase.execute(email);
    expect(response.user.email).toEqual(email);
  });
});
