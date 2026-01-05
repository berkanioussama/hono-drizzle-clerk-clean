import { Context } from "hono";
import { errorResponse } from "./api-response";

interface ErrorHandlerParams {
    c: Context;
    error: any;
    message: string;
}

export const errorHandler = ({c, error, message}: ErrorHandlerParams) => {
    console.log(error)
    return errorResponse(c, 500, message);
}