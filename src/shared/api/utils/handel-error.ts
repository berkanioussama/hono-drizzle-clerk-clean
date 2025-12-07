import { Context } from "hono";
import { ApiResponse } from "@/shared/api/utils/api-response";

interface HandelErrorParams {
    c: Context;
    error: any;
    message: string;
}

export const handelError = ({c, error, message}: HandelErrorParams) => {
    console.log(error)
    return c.json(ApiResponse(message), 500)
}