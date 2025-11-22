import { clerkMiddleware } from "@hono/clerk-auth";
import { userRoutes } from "./presentation/user/user.routes";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { limiter } from "./presentation/middlewares/rate-limiter";
import { compress } from '@hono/bun-compress'
import { requireAuth } from "./presentation/middlewares/clerk-require-auth"

const app = new Hono();

app.use(secureHeaders())
app.use(logger())
app.use("*", clerkMiddleware())
//app.use("*", requireAuth());
app.use("*", limiter);
app.use(compress())

app.route("/api/users", userRoutes);

app.get("/", (c) => c.json({ message: "API is running..." }))

export default app;
