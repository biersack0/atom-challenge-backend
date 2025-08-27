import { Request, Response, RequestHandler } from "express";
import { errorResponse } from "@/shared/utils/response.util";

export const notFoundMiddleware: RequestHandler = (req: Request, res: Response) => {
    return res.status(404).json(errorResponse("Ruta no encontrada"));
};
