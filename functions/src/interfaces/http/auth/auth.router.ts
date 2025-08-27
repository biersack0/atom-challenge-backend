import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validate } from "@/infrastructure/security/validation.middleware";
import { FirestoreUserRepository } from "@/infrastructure/db/firestoreUser.repository";
import { AuthController } from "./auth.controller";
import { LoginUseCase } from "@/application/auth/login.usecase";
import { JwtService } from "@/infrastructure/security/jwt.service";
import { RegisterUseCase } from "@/application/auth/register.usecase";

const authRouter = Router();

const userRepository = new FirestoreUserRepository();
const authService = new JwtService(process.env.JWT_SECRET || "");
const loginUseCase = new LoginUseCase(userRepository, authService);
const registerUseCase = new RegisterUseCase(userRepository, authService);
const authController = new AuthController(loginUseCase, registerUseCase);

authRouter.post('/login',
    [
        validate([
            body('email', 'Ingrese un email.').isEmail()
        ]),
        (req: Request, res: Response) => authController.login(req, res)
    ]
)

authRouter.post('/register',
    [
        validate([
            body('email', 'Ingrese un email.').isEmail()
        ]),
        (req: Request, res: Response) => authController.register(req, res)
    ]
)

export default authRouter;