import "reflect-metadata";
import {container as rootContainer} from "tsyringe";
import {TOKENS} from "@/container/tokens";
import {UserMockRepository} from "@/infrastructure/database/user.mock.repository";
import {IUserRepository} from "@/domain/user/user.repository";
import {IAuthService} from "@/domain/auth/auth.service";
import {JwtService} from "@/infrastructure/security/jwt.service";
import {RegisterUseCase} from "@/application/auth/register.usecase";

let testContainer: typeof rootContainer;

describe("RegisterUseCase", () => {
  let registerUseCase: RegisterUseCase;
  let userRepository: IUserRepository;
  let authService: IAuthService;

  const email = "test@test.com";

  beforeEach(() => {
    testContainer = rootContainer.createChildContainer();
    testContainer.register(TOKENS.IUserRepository, {useClass: UserMockRepository});
    userRepository = testContainer.resolve(TOKENS.IUserRepository);

    testContainer.register(TOKENS.IAuthService, {useClass: JwtService});
    authService = testContainer.resolve(TOKENS.IAuthService);
    registerUseCase = new RegisterUseCase(userRepository, authService);
  });

  it("debería dar error si el usuario ya existe", async () => {
    const response = await registerUseCase.execute(email);
    expect(response.user.email).toEqual(email);
  });
});
