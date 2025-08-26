import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { authMiddleware } from "@/infrastructure/security/auth.middleware";
import { validate } from "@/infrastructure/security/validation.middleware";
import { CreateUserUseCase } from "@/application/user/createUser.usecase";
import { FirestoreUserRepository } from "@/infrastructure/db/firestoreUser.repository";
import { UserController } from "./user.controller";

const userRouter = Router();

const userRepository = new FirestoreUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);

userRouter.post('/',
    [
        authMiddleware(),
        validate([
            body('email', 'Ingrese un email.').isEmail()
        ]),
        (req: Request, res: Response) => userController.createUser(req, res)
    ]
)

export default userRouter;