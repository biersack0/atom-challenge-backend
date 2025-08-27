import { Request, Response, NextFunction } from "express";
import { AppError } from "@/shared/app-error";
import { errorResponse } from "@/shared/utils/response.util";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json(errorResponse(err.message));
    }

    return res.status(500).json(errorResponse("Error interno del servidor"));
};