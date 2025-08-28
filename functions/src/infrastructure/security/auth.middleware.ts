import {RequestHandler, Request} from "express";
import {JwtService} from "./jwt.service";

const jwtService = new JwtService();

export const authMiddleware = (): RequestHandler => {
  return (req: Request, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({message: "Usted no está autorizado."});
      }

      const tokenPayload = jwtService.verify(token);
      if (!tokenPayload) {
        return res.status(401).json({message: "Token inválido o expirado."});
      }

      return next();
    } catch (error) {
      return res.status(401).send("Error de autenticación.");
    }
  };
};
