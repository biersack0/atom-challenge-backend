import {Request, Response, Router} from "express";
import {body, param} from "express-validator";
import {TaskController} from "./task.controller";
import {validate} from "@/infrastructure/security/validate.middleware";
import {authMiddleware} from "@/infrastructure/security/auth.middleware";

export const taskRouter = (taskController: TaskController) => {
  const router = Router();

  router.get("/:userId",
    [
      authMiddleware(),
      validate([
        param("userId", "Ingrese un usuario.").isString().notEmpty(),
      ]),
      (req: Request, res: Response) => taskController.getTasksByUser(req, res),
    ]
  );

  router.post("/",
    [
      authMiddleware(),
      validate([
        body("userId", "Ingrese un usuario.").isString().notEmpty(),
        body("title", "Ingrese un título").isString().notEmpty(),
        body("description", "Ingrese una descripción").isString().optional().default(""),
        body("isCompleted", "Ingrese un estado").isBoolean().optional().default(false),
      ]),
      (req: Request, res: Response) => taskController.create(req, res),
    ]
  );

  router.put("/",
    [
      authMiddleware(),
      validate([
        body("id", "Ingrese un id.").isString().notEmpty(),
        body("userId", "Ingrese un usuario.").isString().notEmpty(),
        body("title", "Ingrese un título").isString().notEmpty(),
        body("description", "Ingrese una descripción").isString().optional().default(""),
        body("isCompleted", "Ingrese un estado").isBoolean().optional().default(false),
      ]),
      (req: Request, res: Response) => taskController.updateTask(req, res),
    ]
  );

  router.delete("/:taskId",
    [
      authMiddleware(),
      validate([
        param("taskId", "Ingrese un id.").isString().notEmpty(),
      ]),
      (req: Request, res: Response) => taskController.deleteTask(req, res),
    ]
  );

  return router;
};
