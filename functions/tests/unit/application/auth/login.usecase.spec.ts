import { LoginUseCase } from "@/application/auth/login.usecase";
import { IUserRepository } from "@/domain/user/user.repository";
import { IAuthService } from "@/domain/auth/auth.service";
import { IUser } from "@/domain/user/user.entity";

describe("LoginUseCase", () => {
    let mockUserRepository: jest.Mocked<IUserRepository>;
    let mockAuthService: jest.Mocked<IAuthService>;
    let loginUseCase: LoginUseCase;

    const fakeUser: IUser = {
        id: "123",
        email: "test@example.com",
        createdAt: new Date()
    };

    beforeEach(() => {
        mockUserRepository = {
            findByEmail: jest.fn(),
            create: jest.fn()
        };

        mockAuthService = {
            sign: jest.fn(),
            verify: jest.fn()
        };

        loginUseCase = new LoginUseCase(mockUserRepository, mockAuthService);
    });

    it("debería retornar token y usuario si el usuario existe", async () => {
        mockUserRepository.findByEmail.mockResolvedValue(fakeUser);
        mockAuthService.sign.mockReturnValue("fake-token");

        const result = await loginUseCase.execute(fakeUser.email);

        expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(fakeUser.email);
        expect(mockAuthService.sign).toHaveBeenCalledWith(fakeUser);
        expect(result).toEqual({
            token: "fake-token",
            user: fakeUser
        });
    });

    it("debería lanzar error si el usuario no existe", async () => {
        mockUserRepository.findByEmail.mockResolvedValue(null);

        await expect(loginUseCase.execute("notfound@example.com"))
            .rejects
            .toThrow("Usuario no encontrado");
    });
});
