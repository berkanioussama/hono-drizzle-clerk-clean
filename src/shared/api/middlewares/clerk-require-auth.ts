import type { Context, Next } from "hono";
import { getAuth } from "@hono/clerk-auth";
import { CheckAdminAccessUC } from "../../../modules/user/application/usecase/check-admin-access.uc"
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

export const requireAdminAuth = (checkAdminAccessUC: CheckAdminAccessUC) => {
  return async (c: Context, next: Next) => {
    const auth = getAuth(c)
    
    if(!auth || !auth.userId) return errorResponse(c, 401, "Unauthorized");

    const isAdmin = await checkAdminAccessUC.execute(auth.userId);
    if (!isAdmin) {
      return errorResponse(c, 403, "Forbidden: Admin access required");
    }
    
    return next();
  }
}
