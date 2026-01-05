import { Context } from "hono";
import { ApiResponse } from "./api-response";

interface ErrorHandlerParams {
    c: Context;
    error: any;
    message: string;
}

export const errorHandler = ({c, error, message}: ErrorHandlerParams) => {
    console.log(error)
    return c.json(ApiResponse(message), 500)
}