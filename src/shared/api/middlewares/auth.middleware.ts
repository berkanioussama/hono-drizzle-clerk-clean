import type { Context, Next } from "hono";
import { getAuth } from "@hono/clerk-auth";
import { AuthService } from "../../../modules/user/application/service/auth.service";
import { errorResponse } from "../utils/api-response";

export const requireAuth = () => {
  return async (c: Context, next: Next) => {
    const auth = getAuth(c)

    if (!auth || !auth.userId) {
      return errorResponse(c, 401, "Unauthorized");
    }

    return next();
  };
};

export const requireAdminAuth = (authService: AuthService) => {
  return async (c: Context, next: Next) => {
    const auth = getAuth(c)
    if(!auth || !auth.userId) return errorResponse(c, 401, "Unauthorized");

    try {
      await authService.requireAdmin(auth.userId);
      return next();
    } catch (error) {
      return errorResponse(c, 403, "Forbidden: Admin access required");
    }
  }
}
