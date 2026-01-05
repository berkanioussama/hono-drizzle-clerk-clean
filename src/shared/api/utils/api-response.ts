import { Context } from "hono";

export function successResponse<T>(c: Context, status: 200 | 201, data?: T)  {
    const response = data === undefined
        ? { status: 'success' as const, data: null, error: null }

        : { status: 'success' as const, data, error: null };
    
    return c.json(response, status);
}

export function errorResponse(c: Context, status: 400 | 401 | 403 | 404 | 500, error: string) {
    return c.json({ status: 'error', data: null, error } , status);
}
