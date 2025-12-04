import { Context } from "hono";
import { ApiResponse } from "./api-response";

interface HandelErrorParams {
    c: Context;
    error: Error;
    message: string;
}

export const handelError = ({c, error, message}: HandelErrorParams) => {
    console.log(error)
    return c.json(ApiResponse(message), 500)
}