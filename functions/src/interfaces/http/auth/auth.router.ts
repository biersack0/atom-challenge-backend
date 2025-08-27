import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { AuthController } from "./auth.controller";
import { validate } from "@/infrastructure/security/validate.middleware";

export const authRouter = (authController: AuthController) => {
    const router = Router();

    router.post('/login',
        [
            validate([body('email', 'Ingrese un email.').isEmail()]),
            (req: Request, res: Response) => authController.login(req, res)
        ]
    )

    router.post('/register',
        [
            validate([body('email', 'Ingrese un email.').isEmail()]),
            (req: Request, res: Response) => authController.register(req, res)
        ]
    )

    return router;
}