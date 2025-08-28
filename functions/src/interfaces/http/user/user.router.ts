import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {validate} from "@/infrastructure/security/validate.middleware";
import {UserController} from "./user.controller";

export const userRouter = (userController: UserController) => {
  const router = Router();

  router.post("/validate",
    [
      validate([
        body("email", "Ingrese un correo electrónico.").isString().isEmail().notEmpty(),
      ]),
      (req: Request, res: Response) => userController.validateUser(req, res),
    ]
  );

  router.post("/",
    [
      validate([
        body("email", "Ingrese un correo electrónico.").isString().isEmail().notEmpty(),
      ]),
      (req: Request, res: Response) => userController.createUser(req, res),
    ]
  );

  return router;
};
