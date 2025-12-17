import { clerkMiddleware } from "@hono/clerk-auth";
import { userRoutes } from "@/modules/user/api/user.routes";
import { userProviderRoutes } from "@/modules/user/api/user-provider.routes";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { limiter } from "@/shared/api/middlewares/rate-limiter";
import { compress } from '@hono/bun-compress'
import { requireAuth } from "@/shared/api/middlewares/clerk-require-auth"
import clerkWebhook from "@/modules/user/api/webhooks/users.webhook"
import { cors } from "hono/cors";

const app = new Hono();

app.use(secureHeaders())
app.use(logger())
app.use(compress())

app.route('/api/v1/webhook/clerk', clerkWebhook);

app.use("*",cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}))
app.use("*", clerkMiddleware())
app.use("*", requireAuth())
app.use("*", limiter)

app.route("/api/v1/users", userRoutes);
app.route("/api/v1/users/provider", userProviderRoutes);

app.get("/", (c) => c.json({ message: "API is running..." }))
app.notFound((c) => { return c.json({ message: 'No route found' }, 404) })

export default app;
