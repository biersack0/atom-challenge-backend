interface ApiResponse<T> {
    status: "success" | "error";
    message: string;
    data?: T;
}

export const successResponse = <T>(data: T, message = "Operación exitosa"): ApiResponse<T> => ({
    status: "success",
    message,
    data
});

export const errorResponse = (message: string): ApiResponse<null> => ({
    status: "error",
    message,
});