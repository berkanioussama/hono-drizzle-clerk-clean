import type { Context, Next } from "hono";
import { getAuth } from "@hono/clerk-auth";
import { CheckAdminAccessUC } from "@/modules/user/application/query/check-admin-access.uc"
import { ApiResponse } from "@/shared/api/utils/api-response";

export const requireAuth = () => {
  return async (c: Context, next: Next) => {
    const auth = getAuth(c)

    if (!auth || !auth.userId) {
      return c.json(ApiResponse("Unauthorized"), 401);
    }

    return next();
  };
};

export const requireAdminAuth = (checkAdminAccessUC: CheckAdminAccessUC) => {
  return async (c: Context, next: Next) => {
    const auth = getAuth(c)
    
    if(!auth || !auth.userId) return c.json(ApiResponse( "Unauthorized"), 401);

    const isAdmin = await checkAdminAccessUC.execute(auth.userId);
    if (!isAdmin) {
      return c.json(ApiResponse("Forbidden: Admin access required"), 403);
    }
    
    return next();
  }
}
