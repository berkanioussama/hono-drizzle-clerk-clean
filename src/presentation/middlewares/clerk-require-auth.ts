import type { Context, Next } from "hono";

export const requireAuth = () => {
  return async (c: Context, next: Next) => {
    const auth = c.get("auth");

    if (!auth || !auth.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    return next();
  };
};
